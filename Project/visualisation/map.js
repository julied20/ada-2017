// Créer un point:
let dataPoints = [{
        latitude: 52.523407,
        longitude: 13.4114,
        type: 'bubble',
        color: '#CC0000',

        fixedSize: false,
        alpha: 0.5,
        height: 5,
        width: 5,
        centered: true
},

{
        latitude: 43.8163,
        longitude: -79.4287,
        type: 'rectangle',
        color: '#CC0034',

        fixedSize: false,
        alpha: 0.5,
        height: 5,
        width: 5,
        centered: true
}];

//Créer une ligne
let line = [ {
  "id": "line1",
  "arc": -0.85,
  "alpha": 0.3,
  "latitudes": [ 43.8163, 52.523407 ],
  "longitudes": [ -79.4287, 13.4114 ]
}]



let map = AmCharts.makeChart( "chartdiv", {
  "type": "map",
  "dataProvider": {
    "map": "worldLow",
    "zoomLevel": 3.5,
    "zoomLongitude": -55,
    "zoomLatitude": 42,

    "lines": line,
    "images": dataPoints
  },

  "areasSettings": {
    "unlistedAreasColor": "#8dd9ef"
  },

  "imagesSettings": {
    "color": "#585869",
    "rollOverColor": "#585869",
    "selectedColor": "#585869",
    "pauseDuration": 0.2,
    "animationDuration": 2.5,
    "adjustAnimationSpeed": true
  },

  "linesSettings": {
    "color": "#585869",
    "alpha": 0.4
  },

  "listeners": [ {
    "event": "init",
    "method": function( e ) {

      // get map object
      let map = e.chart;

    }
  } ]

} );
