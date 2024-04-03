import React from 'react';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import { areaColor, defaultColor } from "./areaColor";
import { getMap } from "./getMap";
import { loadGeojson } from "./loadGeojson";
import { lerp } from './lerp';

export default React.memo(function PolygonLayer() {
  React.useEffect(() => {
    const map = getMap();
    const source = loadGeojson("/mainroomsbyarea.geojson");
    const vectorLayer = new VectorLayer({
      source,
      updateWhileAnimating: true,
      style: (feature, res) => {
        const a = lerp(res, [2, 3, 20, 25], [0.0, 0.1, 0.3, 0.0]);
        const areaName = (feature.getProperties()["area"] ?? "") + "";
        return [
          new Style({
            fill: new Fill({
              color: `rgba(${areaColor[areaName] || defaultColor},${a})`
            })
          })
        ];
      },
      visible: true,
    });
    map.addLayer(vectorLayer);
    return () => void map.removeLayer(vectorLayer);
  }, []);
  return null;
})
