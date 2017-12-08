import { get_current_year_conflicts, Year } from "./helpers"

export function get_area(current_year, conflicts) {
    let areas = [];
    const current_year_conflicts = get_current_year_conflicts(current_year, conflicts)

    current_year_conflicts.forEach(function(area) {
      let country_color;
      if (area.year_decolonisation < current_year){
        country_color =  "#67b7dc";
        console.log(area);

      }else {
        console.log(current_year);
        console.log(area.year_decolonisation);
        console.log(area.location);
        console.log(area);
        country_color =  "#000000";
      }
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
