import {Year} from "./helpers";

export const get_timeline = () => {

  //let data_provider = [];

  d3.csv("datasets/timeline_colonies.csv", years => {

    const timeline_graph = years.map(year => new Year(
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
