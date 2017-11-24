// svg path for target icon
let targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";


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
