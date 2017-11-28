    // Créer un point:
    // let dataPoints = [{
    //   latitude: 10,
    //   longitude: 18,
    //   type: 'bubble',
    //   color: '#CC0000',
    //
    //   fixedSize: false,
    //   alpha: 0.5,
    //   height: 5,
    //   width: 5,
    //   centered: true
    // },
    // {
    //   latitude: -6,
    //   longitude: 90,
    //   type: 'rectangle',
    //   color: '#CC0034',
    //
    //   fixedSize: false,
    //   alpha: 0.5,
    //   height: 5,
    //   width: 5,
    //   centered: true
    // }];
    //
    // //Créer une ligne
    // let line = [ {
    //   "id": "line1",
    //   "arc": -0.85,
    //   "alpha": 0.3,
    //   "latitudes": [ 10, -6 ],
    //   "longitudes": [ 18, 90 ]
    // }]
function get_area(current_year) {
    let areas = [];
    current_year_conflicts = get_current_year_conflicts(current_year)

    current_year_conflicts.forEach(function(area) {
      areas.push({
        "title" : area.location,
        "id" : area.ISO2,
        "color": "#67b7dc"
      })
    });

    let map = AmCharts.makeChart( "map_div", {
      "type": "map",
      "dataProvider": {
        "map": "worldLow",
        "zoomLevel": 1,
        "zoomLongitude": 46,
        "zoomLatitude": 2,
        "areas": areas,
        //"lines": line,
        //"images": dataPoints

      },

      "areasSettings": {
        "rollOverOutlineColor": "#FFFFFF"
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

  }
