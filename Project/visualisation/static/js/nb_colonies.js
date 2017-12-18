// Number of colonies per countries
function get_graph_colonies(colonizers) {

    let countries = []
    let background_colors = []
    let border_colors = []
    let nb_of_col = []
    colonizers.forEach(function(area) {
        let country_color = d3.color(area.color);
        nb_of_col.push(area.colonies.length);
        countries.push(area.country);
        background_colors.push(country_color);
        country_color.opacity = 0.5;
        border_colors.push(country_color);

    });

    new Chart(document.getElementById("nb_colonizers"), {

        type: 'bar',
        data: {
            labels: countries,
            datasets: [
                {
                    label: "Number of colonies",
                    backgroundColor: background_colors,
                    borderColor: border_colors,
                    data: nb_of_col
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Number of colonies per colonizaters'
            },
            legend: {
                onClick: null
            },
            maintainAspectRatio: false,
            onClick: function(e){
            let element = this.getElementAtEvent(e);
            if (element[0] != undefined) {
                const index = element[0]._index;
                const colonizer_name = colonizers[index].country;
                const color = colonizers[index].color;
                get_map_colonies(colonizers, colonizers[index])
          }
        },
        onHover: function(e){
            let element = this.getElementAtEvent(e);
            if (element[0] != undefined) {
                d3.select('#nb_colonizers')
                    .style('cursor', 'pointer')
            } else {
                d3.select('#nb_colonizers')
                    .style('cursor', 'default')
            }
        },
        }

    });
}
