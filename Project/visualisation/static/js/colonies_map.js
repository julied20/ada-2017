function get_map_colonies(colonizers) {
    let areas = [];


    colonizers.forEach(function(area) {

        country_color = d3.color(area.color);
        areas.push({
            'title': area.country,
            'id': area.ISO3,
            'color': area.color
        })

        country_color.opacity = 0.5
        for (let i = 0; i < area.colonies.length; i++) {

            areas.push({
                "title" : area.colonies[i].country,
                "id" : area.colonies[i].ISO2,
                "color": country_color
            })
        }

    });

    let colonies_map = AmCharts.makeChart( "colonies_map_div", {
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
                let colonies_map = e.chart;
            }
        }]
    });
}
