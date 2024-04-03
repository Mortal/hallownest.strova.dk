export function lerp(x: number, xs: number[], ys: number[]) {
  if (x <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; ++i) {
    if (x < xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * Math.max(0, Math.min(1, (x - xs[i - 1]) / (xs[i] - xs[i - 1])));
  }
  return ys[xs.length - 1];
}
