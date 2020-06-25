Saudi Terria Map
==========

![Terria logo](terria-logo.png "Terria logo")

[![Greenkeeper badge](https://badges.greenkeeper.io/TerriaJS/TerriaMap.svg)](https://greenkeeper.io/)

This is a catalog-based web geospatial visualisation platform built with [TerriaMap][1] using the [TerriaJS library][2]. 

For more information about this platform, see the [documentation][3].

## Quick Start:
1. Clone this repository.
2. Create an account at [Cesium][4] and create an ion access token to use it to render Cesium map.
3. Copy the access token and navigate inside the project folder to `wwwroot/config.json`. You should find `parameters` object. Add the acess token like that:
```Json
"parameters": {
  ...
  "cesiumIonAccessToken": "Your token",
  ...
}
```
4. Navigate back to project directory and run: ```npm install && npm run gulp && npm start```.
5. You should have the instance running at `http://localhost:3001`.

[1]: https://github.com/TerriaJS/TerriaMap
[2]: https://github.com/TerriaJS/TerriaJS
[3]: https://docs.terria.io/guide/
[4]: https://cesium.com/
