import "./style.css";
import { Map } from "ol";
import WebGLTileLayer from "ol/layer/WebGLTile";
import GeoTIFF from "ol/source/GeoTIFF";
import { defaults } from "ol/interaction/defaults";

const source = new GeoTIFF({
  sources: [{ url: "/hallownest.tif" }],
  convertToRGB: true,
});

(window as any).map = new Map({
  interactions: defaults({ pinchRotate: false }),
  target: "map",
  layers: [new WebGLTileLayer({ source })],
  view: source.getView(),
  controls: [],
});
