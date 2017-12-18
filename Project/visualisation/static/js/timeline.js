const background_color = "rgba(255, 206, 86, 0.2)";
const  border_color = "rgba(255, 206, 86, 1)";

let ctx = document.getElementById("timeline").getContext('2d');
let my_chart = new Chart(ctx, {
  type: 'bar',
  data: {},
  options:{
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Conflicts'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Year'
        }
      }]
    },
    legend: {
      onClick: null
    },
    maintainAspectRatio: false,
    onClick: function(e){
        const element = this.getElementAtEvent(e);
        if (element[0] != undefined) {
            const new_year = element[0]._model.label;
            get_area(new_year, current_colonizer, pre_conflicts);
            year_changed(new_year);
        }
    },
    onHover: function(e){
        const element = this.getElementAtEvent(e);
        if (element[0] != undefined) {
            d3.select('#timeline')
                .style('cursor', 'pointer')
        } else {
            d3.select('#timeline')
                .style('cursor', 'default')
        }
    },

  }
});


function update_timeline(current_colonizer, colonizers, pre) {

    let years = [];
    let nb_conflicts = [];

    if(pre) {
        console.log('On est avant');
        years = colonizers[current_colonizer].conflict_pre_years;
        nb_conflicts = colonizers[current_colonizer].nb_pre_conflicts;
        console.log(nb_conflicts);
    } else if (!pre) {
        console.log('On est en post_dec');
        years = colonizers[current_colonizer].conflict_post_years;
        nb_conflicts = colonizers[current_colonizer].nb_post_conflicts;
        console.log(nb_conflicts);
    }
    //console.log(colonizers[current_colonizer].conflict_years);
    let colors = [];
    colors.push(border_color);
    for(let i = 1; i <years.length; ++i){
      colors.push(background_color);
    }
    my_chart.data = {
      labels: years,
      datasets: [{
        label: 'Number of Conflicts',
        data: nb_conflicts,
        backgroundColor: colors,
        borderColor: border_color,
        borderWidth: 1,
        hoverBackgroundColor: border_color,
      }],
    };
    my_chart.update();

}

function year_changed(year_index) {
    backgrounds = my_chart.data.datasets[0].backgroundColor;
    for (let y of my_chart.data.labels) {
        if (y == year_index) {
            backgrounds[my_chart.data.labels.indexOf(y)] = border_color;
        } else {
            backgrounds[my_chart.data.labels.indexOf(y)] = background_color;
        }
    }
    my_chart.update();
}
