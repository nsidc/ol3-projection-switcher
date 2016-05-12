# OpenLayers 3 Projection Switcher

An OpenLayers 3 Control to switch between projections.

## Installation

```
npm install ol3-projection-switcher
```

## Usage

Create a Projection Switcher control and add it to the map.
```
var config = {
  projections: {
    'EPSG:4326': {
      layerId: 'arctic',
      proj4def: '+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
      extent: [-4194304, -4194304, 4194304, 4194304],
      maxResolution: 8192.0
    }
  }
}
var projectionSwitcher = new ol.control.ProjectionSwitcher(config);
map.addControl(projectionSwitcher);
```

### Configuration

The Projection Switcher configuration contains an object with a 'projections' property. Projections are
configured with an EPSG code. Each projection is configured using the following properties.

- `layerId` (Required) Unique identifier for this projection
- `name` (Optional) Hover text used for the projection button
- `label` (Optional) Text used for the projection button
- `visible` (Required) Set the default layer visibility
- `proj4def` (Required) Proj4 Definition from http://epsg.io/
- `extent` (Required) Extent of the layer
- `maxResolution` (Required) Max Resolution of the layer
- `zoom` (Required) Initial zoom level
- `maxZoom` (Required) Maximum zoom level

## Examples

Examples are found in the examples directory. Run them with Webpack from the project root directory.

First run `npm install`.

This module uses peer dependencies that are not explicitly installed.
```npm install openlayers proj4```

Basic Example:
```npm run examples:basic```

Hemisphere Example:
```npm run examples:hemispheres```

## Tests

Start a dev server to run Mocha tests in a browser:
`npm run test`

The tests can be run at `http://localhost:3001/test/`

## Linting

To run linting on the project use `npm run lint`

## Release

To distribute the module:
`npm run dist` to build and `npm run dist-dev` to build a minified version.

The release process follows [SemVer](http://semver.org/).
Update the version number with <update_type> being a choice of patch, minor, major:
`npm version <update_type>`

Publish the module:
`npm publish`

## License

The OpenLayers 3 Projection Switcher is licensed under the MIT license. See
[LICENSE.txt][license].

[license]: https://raw.github.com/nsidc/ol3-projection-switcher/master/LICENSE.txt
