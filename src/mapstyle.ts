const areaColorRaw: Record<string, number[]> = {
  "Crystal Peak": [0x36, 0x30, 0x39],
  "Royal Waterways": [0x27, 0x3c, 0x3c],
  "Resting Grounds": [0x39, 0x2e, 0x29],
  "City of Tears": [0x2b, 0x2e, 0x3b],
  "Fog Canyon": [0x3d, 0x33, 0x3b],
  "Fungal Wastes": [0x39, 0x3b, 0x31],
  "Mantis Village": [0x2f, 0x31, 0x24],
  "Howling Cliffs": [0x1e, 0x20, 0x1f],
  "Dirtmouth": [0x2f, 0x2f, 0x2f],
  "Forgotten Crossroads": [0x2c, 0x32, 0x39],
  "Queen's Gardens": [0x25, 0x2d, 0x26],
  "Queen's Station": [0x39, 0x39, 0x39],
  "Kingdom's Edge": [0x35, 0x32, 0x2c],
  "Greenpath": [0x33, 0x3c, 0x30],
  "Abyss": [0x1f, 0x1f, 0x1f],
  "Ancient Basin": [0x2f, 0x2f, 0x2e],
  "Deepnest": [0x29, 0x2d, 0x32],
  "The Hive": [0x3b, 0x34, 0x26],
}

const defaultColor = [0, 0, 255];

function rgba(areaName: string | null, alpha: number) {
  const color = areaColorRaw[((areaName ?? "") + "")];
  if (color == null) return `rgba(${defaultColor},${alpha})`;
  const [r, g, b] = color;
  const x = 5;
  const y = x * 22;
  return `rgba(${[x * r - y, x * g - y, x * b - y, alpha]})`;
}

export function getMainRoomFill(res: number, areaName: any) {
  if (areaName === "Outside") return null;
  const a = lerp(res, [2, 3, 20, 25], [0, 0.1, 0.3, 0]);
  const fill = rgba(areaName, a);
  return a === 0.0 ? null : fill;
}

export function getSectionsLayerStyle(res: number, areaName: any) {
  if (areaName === "Outside") return null;
  const textalpha = lerp(res, [2, 3], [0, 1]);
  const fillalpha = lerp(res, [20, 25], [0, 0.3]);
  const strokealpha = lerp(res, [20, 25], [0, 1]);
  const fill = fillalpha == 0 ? null : rgba(areaName, fillalpha);
  const stroke = strokealpha == 0 ? null : rgba(areaName, strokealpha);
  const text = textalpha === 0 ? null : `rgba(255,255,255,${textalpha})`;
  return { text, fill, stroke };
}

export function getLineLayerStroke(res: number, areaName: any) {
  if (areaName === "Outside") return null;
  const a = lerp(res, [2, 3, 20, 25], [0, 1, 1, 0]);
  const stroke = a === 0 ? null : rgba(areaName, a);
  return stroke;
}

function lerp(x: number, xs: number[], ys: number[]) {
  if (x <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; ++i) {
    if (x < xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * Math.max(0, Math.min(1, (x - xs[i - 1]) / (xs[i] - xs[i - 1])));
  }
  return ys[xs.length - 1];
}
