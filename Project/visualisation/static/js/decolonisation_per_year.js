/*************************************/
// Number of decolonisation per years
function get_graph(years_dec, nb_dec) {

  new Chart(document.getElementById("decolonisation"), {
      type: 'bar',
      data: {
        labels: years_dec,
        datasets: [
          {
            label: "Number of decolonisation",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: nb_dec
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
