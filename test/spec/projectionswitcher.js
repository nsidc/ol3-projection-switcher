/*global $:true*/

import chai from 'chai';
import ol from 'openlayers';
import 'openlayers-projection-switcher';

chai.should();

describe('ol.control.ProjectionSwitcher', function() {
  var map, target, projectionSwitcher;

  beforeEach(function () {
    var config = {
      projections: {
        'EPSG:3857': {
          layerId: 'webmercator',
          name: 'WGS 84 Web Mercator',
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
          proj4def: '+proj=longlat +datum=WGS84 +no_defs',
          extent: [-180.0, -90.0, 180.0, 90.0],
          maxResolution: 0.5625,
          zoom: 1,
          maxZoom: 8
        }
      }
    };

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

    target = document.createElement('div');
    target.setAttribute('id', 'map');
    document.body.appendChild(target);
    projectionSwitcher = new ol.control.ProjectionSwitcher(config);
    map = new ol.Map({
      target: 'map',
      layers: layers,
      controls: [projectionSwitcher]
    });
  });

  afterEach(function () {
    document.body.removeChild(target);
    projectionSwitcher = null;
    map = null;
    target = null;
  });

  describe('Initializing the Map', function () {
    it('Creates a container for the projection buttons', function () {
      $('.projection-switcher').length.should.equal(1);
    });

    it('Creates a button for each of the configured projections', function () {
      $('#projection-webmercator').length.should.equal(1);
      $('#projection-geographic').length.should.equal(1);
    });

    it('Creates a hidden input to track the selected projection', function () {
      $('#current-projection').length.should.equal(1);
    });
  });

  describe('Removing the control', function() {
    it('Can be removed from the map', function() {
      map.removeControl(projectionSwitcher);
    });
  });
});
