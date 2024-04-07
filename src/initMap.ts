import { Map } from "ol";
import { defaults } from "ol/interaction/defaults";

export async function initMap() {
  (window as any).map = new Map({
    interactions: defaults({ pinchRotate: false }),
    target: "map",
    controls: [],
  });
}