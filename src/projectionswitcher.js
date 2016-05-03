import ol from 'openlayers';
import proj4 from 'proj4';

ol.control.ProjectionSwitcher = function(options) {
  ol.proj.setProj4(proj4);

  options = options || {};

  var projections = options.projections || {};

  this.mapListeners = [];

  this.className = 'ol-unselectable ol-control projection-switcher';

  var element = document.createElement('div');
  element.className = this.className;

  var input = document.createElement('input');
  input.setAttribute('id', 'current-projection');
  input.setAttribute('hidden', 'hidden');
  input.setAttribute('value', 'EPSG:3857');
  element.appendChild(input);

  var code, button;
  for (code in projections) {
    let label = projections[code].label ? projections[code].label : '';
    proj4.defs(code, projections[code].proj4def);

    button = document.createElement('button');
    button.setAttribute('id', 'projection-' + projections[code].layerId);
    button.setAttribute('title', 'Show ' + projections[code].name);
    button.setAttribute('data-layer', projections[code].layerId);
    button.setAttribute('data-projection', code);
    button.setAttribute('data-extent', projections[code].extent);
    button.setAttribute('data-maxResolution', projections[code].maxResolution);
    button.setAttribute('data-zoom', projections[code].zoom);
    button.setAttribute('data-maxZoom', projections[code].maxZoom);
    button.innerHTML = label;
    element.appendChild(button);

    var this_ = this;

    button.onclick = function (e) {
      e = e || window.event;

      var startProjection = document.getElementById('current-projection').value;
      document.getElementById('current-projection').value = e.toElement.getAttribute('data-projection');
      var layerId = e.toElement.getAttribute('data-layer');
      var endProjection = e.toElement.getAttribute('data-projection');
      var extent = e.toElement.getAttribute('data-extent').split(',');
      var maxResolution = e.toElement.getAttribute('data-maxResolution');
      var zoom = e.toElement.getAttribute('data-zoom');
      var maxZoom = e.toElement.getAttribute('data-maxZoom');

      this_.switchProjection(layerId, startProjection, endProjection, extent, maxResolution, zoom, maxZoom);
      e.preventDefault();
    }
  }

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });
}

ol.inherits(ol.control.ProjectionSwitcher, ol.control.Control);

ol.control.ProjectionSwitcher.prototype.switchProjection = function(layerId, startProjection, endProjection, extent, maxResolution, zoom, maxZoom) {
  if (startProjection !== endProjection) {
    var projection = ol.proj.get(endProjection);

    // Set the visible layer
    var layers = this.getMap().getLayers();
    layers.forEach(layer => {
      if(layer.get('id') === layerId) {
        layer.setVisible(true);
        layer.setExtent(extent);
      } else {
        layer.setVisible(false);
      }
    });

    // Set the view
    var newView = new ol.View({
      maxResolution: maxResolution,
      projection: projection,
      center: [0, 0],
      zoom: parseInt(zoom),
      maxZoom: parseInt(maxZoom)
    });
    this.getMap().setView(newView);
  }
}
