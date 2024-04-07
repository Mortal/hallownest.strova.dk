/// <reference types="vite/client" />

declare module "*.geojson" {
    const url: string;
    export default url;
}
