import React from 'react';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import { getMap } from "./getMap";
import { loadGeojson } from './loadGeojson';
import url from "./vectordata/mainroomslinesarea.geojson";
import { getLineLayerStroke } from './mapstyle';

export default React.memo(function LineLayer() {
  React.useEffect(() => {
    const source = loadGeojson(url);
    const vectorLayer = new VectorLayer({
      source,
      updateWhileAnimating: true,
      style: (feature, res) => {
        const areaName = feature.getProperties()["area"];
        const stroke = getLineLayerStroke(res, areaName);
        if (stroke == null) return [];
        return [new Style({ stroke: new Stroke({ color: stroke }) })];
      },
    });
    const map_ = getMap();
    map_.addLayer(vectorLayer);
    return () => void map_.removeLayer(vectorLayer);
  }, []);
  return null;
})
