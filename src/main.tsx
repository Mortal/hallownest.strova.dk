import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Map } from "ol";
import WebGLTileLayer from "ol/layer/WebGLTile";
import GeoTIFF from "ol/source/GeoTIFF";
import { defaults } from "ol/interaction/defaults";
import Projection from 'ol/proj/Projection';
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import GeoJSON from 'ol/format/GeoJSON.js';

const extent = [0, 0, 72622, 48128];

const projection = new Projection({
  code: 'custom',
  units: 'pixels',
  extent: extent,
});

const source = new GeoTIFF({
  sources: [{ url: "/hallownest.tif" }],
  convertToRGB: true,
  projection,
});

(window as any).map = new Map({
  interactions: defaults({ pinchRotate: false }),
  target: "map",
  layers: [
    new WebGLTileLayer({ source }),
    // new VectorLayer({
    //   source: new VectorSource({
    //     url: "/mainroomslinesarea.geojson",
    //     format: new GeoJSON(),
    //   })
    // })
  ],
  view: source.getView(),
  controls: [],
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
