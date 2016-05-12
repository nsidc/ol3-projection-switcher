import ol from 'openlayers';
import proj4 from 'proj4';

ol.control.ProjectionSwitcher = function(options) {
  ol.proj.setProj4(proj4);

  options = options || {};

  var projections = options.projections || {};

  this.mapListeners = [];

  this.className = 'ol-unselectable ol-control projection-switcher';

  var projectionSwitcherContainer = document.createElement('div');
  projectionSwitcherContainer.className = this.className;

  var projectionCode;
  for (projectionCode in projections) {
    this._createProjectionButton(projectionCode, projections[projectionCode], projectionSwitcherContainer);
  }

  ol.control.Control.call(this, {
    element: projectionSwitcherContainer,
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

ol.control.ProjectionSwitcher.prototype._createProjectionButton = function(projectionCode, projectionConfig, parentElement) {
  let label = projectionConfig.label ? projectionConfig.label : '';
  proj4.defs(projectionCode, projectionConfig.proj4def);

  if(projectionConfig.visible) {
    // Create element to track the selected projection
    var input = document.createElement('input');
    input.setAttribute('id', 'current-projection');
    input.setAttribute('hidden', 'hidden');
    input.setAttribute('value', projectionCode);
    parentElement.appendChild(input);
  }

  var button = document.createElement('button');
  button.setAttribute('id', 'projection-' + projectionConfig.layerId);
  button.setAttribute('title', 'Show ' + projectionConfig.name);
  button.setAttribute('data-layer', projectionConfig.layerId);
  button.setAttribute('data-projection', projectionCode);
  button.setAttribute('data-extent', projectionConfig.extent);
  button.setAttribute('data-maxResolution', projectionConfig.maxResolution);
  button.setAttribute('data-zoom', projectionConfig.zoom);
  button.setAttribute('data-maxZoom', projectionConfig.maxZoom);
  button.innerHTML = label;
  parentElement.appendChild(button);

  this._addClickEvent(button);
}

ol.control.ProjectionSwitcher.prototype._addClickEvent = function (button) {
  var this_ = this;

  button.onclick = function (e) {
    e = e || window.event;

    var startProjection = document.getElementById('current-projection').value;
    var input = document.getElementById('current-projection');
    input.setAttribute('value', e.toElement.getAttribute('data-projection'));
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
