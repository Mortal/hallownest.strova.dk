import { getMap } from "./getMap";
import GeoTIFF from 'ol/source/GeoTIFF';
import Projection from 'ol/proj/Projection';
import WebGLTileLayer from 'ol/layer/WebGLTile';

export function initBaseLayer() {
    const map = getMap();
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
    const layer = new WebGLTileLayer({ source });
    map.addLayer(layer);
    map.setView(source.getView());
}

