/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return current_year; });
/* harmony export (immutable) */ __webpack_exports__["e"] = get_current_year_conflicts;
/* unused harmony export update_year */
let current_year = 1960;

class Country {
    constructor(country, ISO3, ISO2, latitude, longitude) {
      this.country = country;
      this.ISO3 = ISO3;
      this.ISO2 = ISO2;
      this.latitude = latitude;
      this.longitude = longitude;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Country;


class Conflict {
    constructor(location, ISO2, year, month, colonizer, year_decolonisation) {
        this.location = location;
        this.ISO2 = ISO2;
        this.year = year;
        this.month = month;
        this.colonizer = colonizer;
        this.year_decolonisation = year_decolonisation;
    }

    set_data(data) {
        this.data = data;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Conflict;


class Year {
    constructor(year, number_of_conflict) {
      this.year = year;
      this.number_of_conflict = number_of_conflict;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Year;


function get_current_year_conflicts(current_year, conflicts) {
  return conflicts.filter(x => x.year == current_year)
}

function update_year(new_year) {
  current_year = new_year;
  return new_year;
}

// FixMe: the function bellow is broken.
/*
export function get_timeline_graph() {
  let t = [];

  d3.csv("datasets/timeline_colonies.csv", function(years) {
    years.forEach(function(year) {
      t.push(new Year(
        year.year,
        year.number_of_conflict
      ))
    });
    console.log(t);
  });

  return t;

}
*/


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timeline__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__(0);





d3.csv("datasets/clean_conflict_of_colonized_countries.csv", conflict => {
  const conflicts = conflict.map(conflict_ => new __WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* Conflict */](
      conflict_.location,
      conflict_.ISO2,
      conflict_.year,
      conflict_.start_month,
      conflict_.colonizer,
      conflict_.decolonisation_year
  ));

   console.log(conflicts);

  d3.csv("datasets/countries_codes_and_coordinates.csv", country_coordinates => {

    // console.log(country_coordinates);

    const countries = country_coordinates.map(country_co => new __WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* Country */](
        country_co.Country,
        country_co.ISO3,
        country_co.ISO2,
        country_co.Latitude,
        country_co.Longitude
    ))
    Object(__WEBPACK_IMPORTED_MODULE_0__timeline__["a" /* get_timeline */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__map__["a" /* get_area */])(__WEBPACK_IMPORTED_MODULE_2__helpers__["d" /* current_year */], conflicts);
  });
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);


const get_timeline = () => {

  //let data_provider = [];

  d3.csv("datasets/timeline_colonies.csv", years => {

    const timeline_graph = years.map(year => new __WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* Year */](
        year.year,
        year.number_of_conflict
    ));

    const data_provider = timeline_graph.map(t => ({
        "year" : t.year,
        "value" : t.number_of_conflict
      })
    );
    console.log(data_provider);

    let chart = AmCharts.makeChart("timeline", {
      "type": "serial",
      "theme": "light",
      "marginTop":0,
      "marginRight": 80,
      "dataProvider": data_provider,
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
      }],
      "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#637bb6",
        "type": "smoothedLine",
        "valueField": "value"
      }],
      "chartScrollbar": {
        "graph":"g1",
        "gridAlpha":0,
        "color":"#888888",
        "scrollbarHeight":55,
        "backgroundAlpha":0,
        "selectedBackgroundAlpha":0.1,
        "selectedBackgroundColor":"#888888",
        "graphFillAlpha":0,
        "autoGridCount":true,
        "selectedGraphFillAlpha":0,
        "graphLineAlpha":0.2,
        "graphLineColor":"#c2c2c2",
        "selectedGraphLineColor":"#888888",
        "selectedGraphLineAlpha":1

      },
      "chartCursor": {
        "categoryBalloonDateFormat": "YYYY",
        "cursorAlpha": 0,
        "valueLineEnabled":true,
        "valueLineBalloonEnabled":true,
        "valueLineAlpha":0.5,
        "fullWidth":true
      },
      "dataDateFormat": "YYYY",
      "categoryField": "year",
      "categoryAxis": {
        "minPeriod": "YYYY",
        "parseDates": true,
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      }
    });

    function zoomChart(){
      chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
    }

    chart.addListener("rendered", zoomChart);
    if(chart.zoomChart){
      chart.zoomChart();
    }

    chart.addListener("clickGraphItem", e => {
      let bullet = e.item.bulletGraphics.node;
      console.log(e);
      // Update current year:
      current_year = e.item.serialDataItem.dataContext.year;
      get_area(current_year);

      data_provider.forEach(({year}, i) => {
        if (current_year != year) {
          bullet.setAttribute("stroke","#637bb6");
          bullet.setAttribute("fill","#637bb6");
        } else {
          console.log('True');
          bullet.setAttribute("stroke","#000000");
          bullet.setAttribute("fill","#000000");
        }
      })
    });
  });
}
/* harmony export (immutable) */ __webpack_exports__["a"] = get_timeline;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = get_area;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);


function get_area(current_year, conflicts) {
    let areas = [];
    const current_year_conflicts = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["e" /* get_current_year_conflicts */])(current_year, conflicts)

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


/***/ })
/******/ ]);