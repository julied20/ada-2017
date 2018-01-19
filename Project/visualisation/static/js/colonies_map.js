function get_map_colonies(colonizers, col) {
    let areas = [];


    colonizers.forEach(function(area) {

        let country_color = d3.color(area.color);

        if(area != col) {
            country_color.opacity = 0.4
        }
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
            "zoomLevel": 1.2,
            "zoomLongitude": 8,
            "zoomLatitude": 6,
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
        }],
        "export": {
            "enabled": true
        }
    });
}
