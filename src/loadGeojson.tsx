import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON.js';
import { createTransformFromCoordinateTransform } from "ol/proj";
import { getMap } from "./getMap";

export function loadGeojson(url: string) {
  const map = getMap();
  const pr = map.getView().getProjection();
  const source = new VectorSource({
    url,
    format: new GeoJSON({
      dataProjection: pr,
      featureProjection: pr,
    }),
  });
  source.once("featuresloadend", () => {
    for (const f of source.getFeatures()) {
      f.getGeometry()!.applyTransform(createTransformFromCoordinateTransform(([x, y]) => [x, y + 48128]));
    }
  });
  return source;
}
