function get_area(current_year, current_colonizer, confl) {
    let areas = [];
    const current_year_conflicts = get_current_year_conflicts(current_year, confl);
    const conflicts = get_colonizer_conflicts(current_year_conflicts);
    console.log();
    conflicts.forEach(function(area) {
      let country_color;
        country_color =  "rgba(255, 206, 86, 1)";

      areas.push({
        "title" : area.location,
        "id" : area.ISO2,
        "color": country_color
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
        "zoomControl": {
      		"zoomControlEnabled": false,
          "panControleEnable": false,
      	}
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
      }]
    });
  }
