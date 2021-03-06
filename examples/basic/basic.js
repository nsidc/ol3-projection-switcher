import ol from 'openlayers';
import 'ol3-projection-switcher';

(function() {
  /* Configuration for the Projection Switcher control.
   * Order of the projections will reflect the order of the buttons in the control.
   */
  var config = {
    projections: {
      'EPSG:3857': {
        layerId: 'webmercator',
        name: 'WGS 84 Web Mercator',
        label: 'W',
        visible: true,
        proj4def: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
        extent: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
        maxResolution: 156543.0339,
        zoom: 2,
        maxZoom: 8
      },
      'EPSG:4326': {
        layerId: 'geographic',
        name: 'WGS 84',
        label: 'G',
        proj4def: '+proj=longlat +datum=WGS84 +no_defs',
        extent: [-180.0, -90.0, 180.0, 90.0],
        maxResolution: 0.5625,
        zoom: 1,
        maxZoom: 8
      }
    }
  };

  // Initialize each layer for the map
  var layers = [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({
        layer: 'sat'
      }),
      id: config.projections['EPSG:3857'].layerId,
      extent: config.projections['EPSG:3857'].extent,
      visible: config.projections['EPSG:3857'].visible
    }),
    new ol.layer.Tile({
      source: new ol.source.MapQuest({
        layer: 'sat'
      }),
      id: config.projections['EPSG:4326'].layerId,
      extent: config.projections['EPSG:4326'].extent,
      visible: config.projections['EPSG:4326'].visible
    })
  ];

  // Create the OpenLayers map and add the layers
  var map = new ol.Map({
    target: 'map',
    layers: layers,
    view: new ol.View({
      maxResolution: 156543.0339,
      center: [0, 0],
      zoom: 2,
      maxZoom: 8
    })
  });

  // Create the Projection Switcher control and add it to the map
  var projectionSwitcher = new ol.control.ProjectionSwitcher(config);
  map.addControl(projectionSwitcher);
})();
