import React from 'react';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import { areaColor, defaultColor } from "./areaColor";
import Stroke from "ol/style/Stroke";
import { getMap } from "./getMap";
import { loadGeojson } from './loadGeojson';
import { lerp } from './lerp';

export default React.memo(function LineLayer() {
  React.useEffect(() => {
    const url = "/mainroomslinesarea.geojson";
    const source = loadGeojson(url);
    const vectorLayer = new VectorLayer({
      source,
      updateWhileAnimating: true,
      style: (feature, res) => {
        const a = lerp(res, [2, 3, 20, 25], [0.0, 1.0, 1.0, 0.0]);
        const areaName = (feature.getProperties()["area"] ?? "") + "";
        return [
          new Style({
            stroke: new Stroke({
              color: `rgba(${areaColor[areaName] || defaultColor},${a})`
            })
          })
        ];
      },
    });
    const map_ = getMap();
    map_.addLayer(vectorLayer);
    return () => void map_.removeLayer(vectorLayer);
  }, []);
  return null;
})
