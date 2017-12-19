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
      },{


        "title": "Australia",
        "id": "AU",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Bahamas",
        "id": "BS",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Bangladesh",
        "id": "BD",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Belize",
        "id": "BZ",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Botswana",
        "id": "BW",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Brunei",
        "id": "BN",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Cameroon",
        "id": "CM",
        "color": "#67b7dc",
        "customData": "1957",
        "groupId": "commonwealth"
      }, {
        "title": "Canada",
        "id": "CA",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      }, {
        "title": "Cyprus",
        "id": "CY",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Fiji",
        "id": "FJ",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Ghana",
        "id": "GH",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Guyana",
        "id": "GY",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "India",
        "id": "IN",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Jamaica",
        "id": "JM",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Kenya",
        "id": "KE",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Malawi",
        "id": "MW",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Malaysia",
        "id": "MY",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Malta",
        "id": "MT",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Mauritius",
        "id": "MU",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Mozambique",
        "id": "MZ",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Namibia",
        "id": "NA",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "New Zealand",
        "id": "NZ",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Nigeria",
        "id": "NG",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Pakistan",
        "id": "PK",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Rwanda",
        "id": "RW",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Samoa",
        "id": "WS",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Seychelles",
        "id": "SC",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Sierra Leone",
        "id": "SL",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Singapore",
        "id": "SG",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "South Africa",
        "id": "ZA",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Sri Lanka",
        "id": "LK",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Swaziland",
        "id": "SZ",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Tanzania",
        "id": "TZ",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Uganda",
        "id": "UG",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },
      {
        "title": "United Kingdom",
        "id": "GB",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Vanuatu",
        "id": "VU",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },{
        "title": "Zambia",
        "id": "ZM",
        "color": "#67b7dc",
        "groupId": "commonwealth"
      },

      {
        "title": "Albania",
        "id": "AL",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },
      {
        "title": "Andorra",
        "id": "AD",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Armenia",
        "id": "AM",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Belgium",
        "id": "BE",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Benin",
        "id": "BJ",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Bulgaria",
        "id": "BG",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Burkina Faso",
        "id": "BF",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Burundi",
        "id": "BI",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Cambodia",
        "id": "KH",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Cameroon",
        "id": "CM",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Canada",
        "id": "CA",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Chad",
        "id": "TD",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },
      {
        "title": "Congo",
        "id": "CG",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Côte d'Ivoire",
        "id": "CI",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Djibouti",
        "id": "DJ",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Egypt",
        "id": "EG",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "France",
        "id": "FR",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Gabon",
        "id": "GA",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Greece",
        "id": "GR",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Guinea",
        "id": "GN",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Guinea-Bissau",
        "id": "GW",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Haiti",
        "id": "HT",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Laos",
        "id": "LA",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Lebanon",
        "id": "LB",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Luxembourg",
        "id": "LU",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Madagascar",
        "id": "MG",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Mali",
        "id": "ML",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Mauritania",
        "id": "MR",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Moldova",
        "id": "MD",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Monaco",
        "id": "MC",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Morocco",
        "id": "MA",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Niger",
        "id": "NE",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Romania",
        "id": "RO",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Rwanda",
        "id": "RW",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Senegal",
        "id": "SN",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Seychelles",
        "id": "SC",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Switzerland",
        "id": "CH",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Togo",
        "id": "TG",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Tunisia",
        "id": "TN",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Vanuatu",
        "id": "VU",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },{
        "title": "Vietnam",
        "id": "VN",
        "color": "#67b7dc",
        "groupId": "francophonie"
      },

      {
        "title": "Argentina",
        "id": "AR",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Bolivia",
        "id": "BO",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Brazil",
        "id": "BR",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Chile",
        "id": "CL",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Colombia",
        "id": "CO",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Costa Rica",
        "id": "CR",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Cuba",
        "id": "CU",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Dominican Republic",
        "id": "DO",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Ecuador",
        "id": "EC",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "El Salvador",
        "id": "SV",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Equatorial Guinea",
        "id": "GQ",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Guatemala",
        "id": "GT",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Honduras",
        "id": "HN",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Mexico",
        "id": "MX",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Nicaragua",
        "id": "NI",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Panama",
        "id": "PA",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Paraguay",
        "id": "PY",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Peru",
        "id": "PE",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Portugal",
        "id": "PT",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Spain",
        "id": "ES",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Uruguay",
        "id": "UY",
        "color": "#67b7dc",
        "groupId": "ibero"
      },{
        "title": "Venezuela",
        "id": "VE",
        "color": "#67b7dc",
        "groupId": "ibero"
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
