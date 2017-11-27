let country_coordinates;

AmCharts.loadFile( "countries_codes_and_coordinates.csv", {}, function( response ) {

  country_coordinates = AmCharts.parseCSV( response, {
    "useColumnNames": true
  } );

  console.log(country_coordinates);


  AmCharts.loadFile( "clean_conflict.csv", {}, function( response ) {

    conflict = AmCharts.parseCSV( response, {
      "useColumnNames": true
    } );

    console.log(conflict);




    // Créer un point:
    let dataPoints = [{
      latitude: country_coordinates[0].Latitude,
      longitude: country_coordinates[0].Longitude,
      type: 'bubble',
      color: '#CC0000',

      fixedSize: false,
      alpha: 0.5,
      height: 5,
      width: 5,
      centered: true
    },

    {
      latitude: country_coordinates[45].Latitude,
      longitude: country_coordinates[45].Latitude,
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
      "latitudes": [ country_coordinates[45].Latitude, country_coordinates[0].Latitude ],
      "longitudes": [ country_coordinates[45].Longitude, country_coordinates[0].Longitude ]
    }]



    let map = AmCharts.makeChart( "chartdiv", {
      "type": "map",
      "dataProvider": {
        "map": "worldLow",
        "zoomLevel": 1,
        "zoomLongitude": 46,
        "zoomLatitude": 2,

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

  });
});
