function get_map_deco(colonized_country, year) {
    let areas = [];


    colonized_country.forEach(function(area) {
        let color = area.color
        if (area.year == year) {
            color = "#FE5000"
        }

        areas.push({
            "title" : area.country + " - " + area.year,
            "id" : area.ISO2,
            "color": color
        })

    });

    let colonies_map = AmCharts.makeChart( "decolonies_map_div", {
        "type": "map",
        "dataProvider": {
            "map": "worldLow",
            "zoomLevel": 1,
            "zoomLongitude": 0,
            "zoomLatitude": 40,
            "areas": areas,
            "zoomControl": {
                "zoomControlEnabled": false,
                "panControleEnable": false,
            }
        },

        "areasSettings": {
            "rollOverOutlineColor": "#FFFFFF"
        },
        "legend": {
        "backgroundColor": "#fff",
        "backgroundAlpha": 0.7,
        "align": "center",
        "data": [{
          "title": "Before 1850",
          "color": "#E9D460"
        }, {
          "title": "Before 1930",
          "color": "#D4A94F"
        },{
        "title": "Before 1955",
        "color": "#C07E3E"
      }, {
        "title": "Before 1980",
        "color": "#AB532C"
      }, {
        "title": "Before 2016",
        "color": "#96281B"
      }]
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
                let colonies_map = e.chart;
            }
        }],
        "export": {
            "enabled": true
        }
    });
}
