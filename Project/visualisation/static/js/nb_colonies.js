// Number of colonies per countries
function get_graph_colonies(colonizers) {

    let countries = []
    let background_colors = []
    let border_colors = []

    colonizers.forEach(function(area) {
        let country_color = d3.color(area.color);
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
                    data: [46, 28, 20, 13, 6, 5, 3, 1, 1]
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
            maintainAspectRatio: false
        }
    });
}
