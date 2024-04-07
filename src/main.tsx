import React from 'react'
import './index.css'

Promise.all([import("react-dom/client"), import("./initMap"), import("./App.tsx"), import("./baselayer.ts")])
  .then(async ([{ default: ReactDOM }, { initMap }, { default: App }, { initBaseLayer }]) => {
    await initMap();
    initBaseLayer();
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
