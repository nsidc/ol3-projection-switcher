import ol from 'openlayers';
import 'ol3-projection-switcher';

(function() {
  var config = {
    projections: {
      'EPSG:3413': {
        layerId: 'arctic',
        name: 'WGS 84 / NSIDC Sea Ice Polar Stereographic North',
        label: 'N',
        proj4def: '+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
        extent: [-4194304, -4194304, 4194304, 4194304],
        maxResolution: 8192.0,
        zoom: 0,
        maxZoom: 5
      },
      'EPSG:4326': {
        layerId: 'geographic',
        name: 'WGS 84',
        label: 'G',
        visible: true,
        proj4def: '+proj=longlat +datum=WGS84 +no_defs',
        extent: [-180.0, -90.0, 180.0, 90.0],
        maxResolution: 0.5625,
        zoom: 2,
        maxZoom: 8
      },
      'EPSG:3031': {
        layerId: 'antarctic',
        name: 'WGS 84 / Antarctic Polar Stereographic',
        label: 'S',
        proj4def: '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
        extent: [-4194304, -4194304, 4194304, 4194304],
        maxResolution: 8192.0,
        zoom: 0,
        maxZoom: 5
      }
    }
  };

  var geoLayer, northLayer, southLayer;
  geoLayer = new ol.layer.Tile({
    source: new ol.source.WMTS({
      url: "//map1{a-c}.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi",
      layer: "BlueMarble_NextGeneration",
      format: "image/jpeg",
      matrixSet: "EPSG4326_500m",
      tileGrid: new ol.tilegrid.WMTS({
          origin: [-180, 90],
          resolutions: [
              0.5625,
              0.28125,
              0.140625,
              0.0703125,
              0.03515625,
              0.017578125,
              0.0087890625,
              0.00439453125
          ],
          matrixIds: [0, 1, 2, 3, 4, 5, 6, 7],
          tileSize: 512
      })
    }),
    visible: config.projections["EPSG:4326"].visible,
    id: config.projections["EPSG:4326"].layerId
  });
  northLayer = new ol.layer.Tile({
    source: new ol.source.WMTS({
      url: "//map1{a-c}.vis.earthdata.nasa.gov/wmts-arctic/wmts.cgi",
      layer: "BlueMarble_NextGeneration",
      extent: [-4194304, -4194304, 4194304, 4194304],
      format: "image/jpeg",
      matrixSet: "EPSG3413_500m",
      tileGrid: new ol.tilegrid.WMTS({
          origin: [-4194304, 4194304],
          resolutions: [
              8192.0,
              4096.0,
              2048.0,
              1024.0,
              512.0
          ],
          matrixIds: [0, 1, 2, 3, 4],
          tileSize: 512
      })
    }),
    visible: config.projections["EPSG:3413"].visible,
    id: config.projections["EPSG:3413"].layerId
  });
  southLayer = new ol.layer.Tile({
    source: new ol.source.WMTS({
      url: "//map1{a-c}.vis.earthdata.nasa.gov/wmts-antarctic/wmts.cgi",
      layer: "BlueMarble_NextGeneration",
      extent: [-4194304, -4194304, 4194304, 4194304],
      format: "image/jpeg",
      matrixSet: "EPSG3031_500m",

      tileGrid: new ol.tilegrid.WMTS({
          origin: [-4194304, 4194304],
          resolutions: [
              8192.0,
              4096.0,
              2048.0,
              1024.0,
              512.0
          ],
          matrixIds: [0, 1, 2, 3, 4],
          tileSize: 512
      })
    }),
    visible: config.projections["EPSG:3031"].visible,
    id: config.projections["EPSG:3031"].layerId
  });

  var map = new ol.Map({
    target: 'map',
    view: new ol.View({
      maxResolution: 0.5625,
      projection: ol.proj.get("EPSG:4326"),
      center: [0, 0],
      zoom: 2,
      maxZoom: 8
    }),
    layers: [geoLayer, northLayer, southLayer],
    renderer: ["canvas", "dom"]
  });

  var projectionSwitcher = new ol.control.ProjectionSwitcher(config);
  map.addControl(projectionSwitcher);
})();
