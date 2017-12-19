let post_empire = AmCharts.makeChart( "post_empire", {
  "type": "map",
  "theme": "light",
  "dataProvider": {
    "map": "worldHigh",
    "zoomLevel": 3.5,
    "zoomLongitude": 10,
    "zoomLatitude": 52,
    "areas": [ {
        "title": "Armenia",
        "id": "AM",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Azerbaijan",
        "id": "AZ",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Belarus",
        "id": "BY",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Kazakhstan",
        "id": "KZ",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Kyrgyzstan",
        "id": "KG",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Moldova",
        "id": "MD",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Russia",
        "id": "RU",
        "color": "#67b7dc",
        "customData": "1957",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Tajikistan",
        "id": "TJ",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      }, {
        "title": "Uzbekistan",
        "id": "UZ",
        "color": "#67b7dc",
        "groupId": "commonwealth_indep"
      },
    ]
  },

  "areasSettings": {
    "rollOverOutlineColor": "#FFFFFF",
    "rollOverColor": "#CC0000",
    "alpha": 0.8,
    "unlistedAreasAlpha": 0.1,
    "balloonText": "[[title]] joined EU at [[customData]]"
  },


  "legend": {
    "width": "100%",
    "marginRight": 27,
    "marginLeft": 27,
    "equalWidths": false,
    "backgroundAlpha": 0.5,
    "backgroundColor": "#FFFFFF",
    "borderColor": "#ffffff",
    "borderAlpha": 1,
    "top": 450,
    "left": 0,
    "horizontalGap": 10,
    "data": [ {
      "title": "EU member before 2004",
      "color": "#67b7dc"
    }, {
      "title": "Joined at 2004",
      "color": "#ebdb8b"
    }, {
      "title": "Joined at 2007",
      "color": "#83c2ba"
    }, {
      "title": "Joined at 2013",
      "color": "#db8383"
    } ]
  },
  "export": {
    "enabled": true
  }

} );
