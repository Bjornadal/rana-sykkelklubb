import fs from 'fs';
import path from 'path';

const gpxDir = path.resolve('public/gpx');
const files = fs.readdirSync(gpxDir).filter(f => f.endsWith('.gpx'));

function haversine(p1, p2) {
  const R = 6371; // km
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lon - p1.lon) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function parseElevationProfile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*(?:<ele>([^<]+)<\/ele>)?/g;
  const rawPoints = [];
  let match;
  while ((match = ptRegex.exec(content)) !== null) {
    rawPoints.push({
      lat: parseFloat(match[1]),
      lon: parseFloat(match[2]),
      ele: match[3] ? parseFloat(match[3]) : 0
    });
  }

  if (rawPoints.length === 0) return null;

  let cumDist = 0;
  const profile = [{ distKm: 0, ele: Math.round(rawPoints[0].ele) }];
  let minEle = rawPoints[0].ele;
  let maxEle = rawPoints[0].ele;
  let gain = 0;
  let loss = 0;

  for (let i = 1; i < rawPoints.length; i++) {
    const d = haversine(rawPoints[i - 1], rawPoints[i]);
    cumDist += d;
    const ele = rawPoints[i].ele;
    const diff = ele - rawPoints[i - 1].ele;
    if (diff > 0) gain += diff;
    if (diff < 0) loss += Math.abs(diff);
    if (ele < minEle) minEle = ele;
    if (ele > maxEle) maxEle = ele;

    profile.push({
      distKm: parseFloat(cumDist.toFixed(3)),
      ele: Math.round(ele)
    });
  }

  // Downsample to at most 60-100 points for crisp SVG rendering
  const step = Math.max(1, Math.floor(profile.length / 80));
  const sampled = [];
  for (let i = 0; i < profile.length; i += step) {
    sampled.push(profile[i]);
  }
  if (sampled[sampled.length - 1] !== profile[profile.length - 1]) {
    sampled.push(profile[profile.length - 1]);
  }

  // Find peak point
  let peakIndex = 0;
  for (let i = 0; i < sampled.length; i++) {
    if (sampled[i].ele > sampled[peakIndex].ele) {
      peakIndex = i;
    }
  }

  // Generate SVG Path (viewBox: 0 0 600 160)
  const W = 600;
  const H = 160;
  const padTop = 25;
  const padBottom = 25;
  const padLeft = 10;
  const padRight = 10;

  const innerW = W - padLeft - padRight;
  const innerH = H - padTop - padBottom;
  const totalDist = cumDist || 1;
  const eleRange = (maxEle - minEle) || 1;

  const pointsSvg = sampled.map(pt => {
    const x = padLeft + (pt.distKm / totalDist) * innerW;
    const y = H - padBottom - ((pt.ele - minEle) / eleRange) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePath = `M ${pointsSvg.join(' L ')}`;
  const firstX = (padLeft).toFixed(1);
  const lastX = (padLeft + innerW).toFixed(1);
  const bottomY = (H - padBottom).toFixed(1);
  const areaPath = `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;

  const peakPt = sampled[peakIndex];
  const peakSvgX = padLeft + (peakPt.distKm / totalDist) * innerW;
  const peakSvgY = H - padBottom - ((peakPt.ele - minEle) / eleRange) * innerH;

  return {
    totalDistKm: parseFloat(cumDist.toFixed(2)),
    minEle: Math.round(minEle),
    maxEle: Math.round(maxEle),
    startEle: Math.round(rawPoints[0].ele),
    endEle: Math.round(rawPoints[rawPoints.length - 1].ele),
    gainM: Math.round(gain),
    lossM: Math.round(loss),
    linePath,
    areaPath,
    peak: {
      distKm: peakPt.distKm,
      ele: peakPt.ele,
      svgX: parseFloat(peakSvgX.toFixed(1)),
      svgY: parseFloat(peakSvgY.toFixed(1))
    },
    sampledPoints: sampled
  };
}

const allProfiles = {};
for (const file of files) {
  const slug = file.replace('.gpx', '');
  const prof = parseElevationProfile(path.join(gpxDir, file));
  if (prof) {
    allProfiles[slug] = prof;
    console.log(`Computed real profile for ${slug}: ${prof.totalDistKm} km, ${prof.minEle} - ${prof.maxEle} moh`);
  }
}

const tsContent = `export interface ElevationPoint {
  distKm: number;
  ele: number;
}

export interface ElevationProfileData {
  totalDistKm: number;
  minEle: number;
  maxEle: number;
  startEle: number;
  endEle: number;
  gainM: number;
  lossM: number;
  linePath: string;
  areaPath: string;
  peak: {
    distKm: number;
    ele: number;
    svgX: number;
    svgY: number;
  };
  sampledPoints: ElevationPoint[];
}

export const elevationProfiles: Record<string, ElevationProfileData> = ${JSON.stringify(allProfiles, null, 2)};
`;

fs.writeFileSync('src/lib/elevationProfiles.ts', tsContent, 'utf-8');
console.log('\nSuccessfully generated src/lib/elevationProfiles.ts with genuine GPX elevation data!');
