import React from 'react';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import { getMap } from "./getMap";
import { loadGeojson } from "./loadGeojson";
import url from "./vectordata/mainroomsbyarea.geojson";
import { getMainRoomFill } from './mapstyle';

export default React.memo(function PolygonLayer() {
  React.useEffect(() => {
    const map = getMap();
    const source = loadGeojson(url);
    const vectorLayer = new VectorLayer({
      source,
      updateWhileAnimating: true,
      style: (feature, res) => {
        const areaName = feature.getProperties()["area"];
        const fill = getMainRoomFill(res, areaName);
        if (fill == null) return [];
        return [new Style({ fill: new Fill({ color: fill }) })];
      },
      visible: true,
    });
    map.addLayer(vectorLayer);
    return () => void map.removeLayer(vectorLayer);
  }, []);
  return null;
})
