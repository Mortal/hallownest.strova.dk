import React from 'react';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import { areaColor, defaultColor } from "./areaColor";
import { getMap } from "./getMap";
import { loadGeojson } from "./loadGeojson";
import { lerp } from './lerp';
import Stroke from 'ol/style/Stroke';

export default React.memo(function SectionsLayer() {
  React.useEffect(() => {
    const map = getMap();
    const source = loadGeojson("/sections.geojson");
    const vectorLayer = new VectorLayer({
      source,
      updateWhileAnimating: true,
      style: (feature, res) => {
        const text = lerp(res, [2, 3], [0.0, 1.0]);
        const fill = lerp(res, [20, 25], [0.0, 0.3]);
        const stroke = lerp(res, [20, 25], [0.0, 1.0]);
        const areaName = (feature.getProperties()["area"] ?? "") + "";
        return [
          new Style({
            text: text === 0.0 ? undefined : new Text({
              text: areaName + "",
              fill: new Fill({ color: `rgba(255,255,255,${text})` }),
              declutterMode: "none",
              overflow: true,
            }),
            fill: new Fill({
              color: `rgba(${areaColor[areaName] || defaultColor},${fill})`
            }),
            stroke: new Stroke({
              color: `rgba(${areaColor[areaName] || defaultColor},${stroke})`
            }),
          })
        ];
      },
      visible: true,
    });
    map.addLayer(vectorLayer);
    return () => void map.removeLayer(vectorLayer);
  }, []);
  return null;
});
