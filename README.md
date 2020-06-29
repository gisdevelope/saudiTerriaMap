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
4. Navigate to the directory `wwwroot/generateData` and create [virutal environment][5] by running:
```bash
virtualenv -p python3 env_name
source env_name/bin/activate
pip install -r requirements.txt
```

5. Fetch the latest layers from the API endpoint by running:
```bash
python generate.py
```

6. Navigate back to project main directory and run:
```bash
npm install && npm run gulp && npm start
```
7. You should have the instance running at `http://localhost:3001`.

[1]: https://github.com/TerriaJS/TerriaMap
[2]: https://github.com/TerriaJS/TerriaJS
[3]: https://docs.terria.io/guide/
[4]: https://cesium.com/
[5]: https://docs.python.org/3.6/tutorial/venv.html
