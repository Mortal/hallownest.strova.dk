const areaColorRaw: Record<string, number> = {
  "Crystal Peak": 0x363039,
  "Royal Waterways": 0x273c3c,
  "Isma's Grove": 0x1d3d30,
  "Resting Grounds": 0x392e29,
  "City of Tears": 0x2b2e3b,
  "Soul Sanctum": 0x202030,
  "Watcher's Spire": 0x202137,
  "Tower of Love": 0x202137,
  // Not sure what the elevator shaft below City is officially called.
  "Abandoned Elevator": 0x232232,
  "Fog Canyon": 0x3d333b,
  "Fungal Wastes": 0x393b31,
  "Mantis Village": 0x2f3124,
  "Howling Cliffs": 0x1e201f,
  "Dirtmouth": 0x2f2f2f,
  "Forgotten Crossroads": 0x2c3239,
  "Queen's Gardens": 0x252d26,
  "Queen's Station": 0x393939,
  "Kingdom's Edge": 0x35322c,
  "Greenpath": 0x333c30,
  "Abyss": 0x1f1f1f,
  "Ancient Basin": 0x2f2f2e,
  "Deepnest": 0x292d32,
  "The Hive": 0x3b3426,
}

function rgba(areaName: string | null, alpha: number) {
  const color = areaColorRaw[((areaName ?? "") + "")];
  if (color == null) return `rgba(255,0,255,${alpha})`;
  const r = (color >> 16) & 0xFF;
  const g = (color >> 8) & 0xFF;
  const b = color & 0xFF;
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
