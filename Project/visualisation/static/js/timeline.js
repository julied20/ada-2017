function get_timeline() {

  let data_provider = [];
  let timeline_graph = [];

  d3.csv("datasets/timeline.csv", function(years) {



    years.forEach(function(year) {

      timeline_graph.push(new Year(
        year.year,
        year.number_of_conflict
      ))
    });

    timeline_graph.forEach(function(t) {

      data_provider.push({
        "year" : t.year,
        "value" : t.number_of_conflict
      })
    });
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

    chart.addListener("rendered", zoomChart);
    if(chart.zoomChart){
      chart.zoomChart();
    }

    chart.addListener("clickGraphItem",function(e) {
      let bullet = e.item.bulletGraphics.node;
      console.log(e);
      // Update current year:
      current_year = e.item.serialDataItem.dataContext.year;
      get_area(current_year);

      for (let i = 0; i < data_provider.length; i++) {
        if (current_year != data_provider[i].year) {
          bullet.setAttribute("stroke","#637bb6");
          bullet.setAttribute("fill","#637bb6");
        } else {
          console.log('True');
          bullet.setAttribute("stroke","#000000");
          bullet.setAttribute("fill","#000000");
        }
      }
    });


      function zoomChart(){
        chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
      }
    });
  }
