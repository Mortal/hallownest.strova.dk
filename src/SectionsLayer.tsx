import React from 'react';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import { getMap } from "./getMap";
import { loadGeojson } from "./loadGeojson";
import Stroke from 'ol/style/Stroke';
import url from "./vectordata/sections.geojson";
import { getSectionsLayerStyle } from './mapstyle';

export default React.memo(function SectionsLayer() {
  React.useEffect(() => {
    const map = getMap();
    const source = loadGeojson(url);
    const vectorLayer = new VectorLayer({
      source,
      updateWhileAnimating: true,
      style: (feature, res) => {
        const areaName = feature.getProperties()["area"];
        const { text, fill, stroke } = getSectionsLayerStyle(res, areaName) ?? {};
        return [
          new Style({
            text: text == null ? undefined : new Text({
              text: areaName + "",
              fill: new Fill({ color: text }),
              declutterMode: "none",
              overflow: true,
            }),
            fill: fill == null ? undefined : new Fill({ color: fill }),
            stroke: stroke == null ? undefined : new Stroke({ color: stroke }),
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
