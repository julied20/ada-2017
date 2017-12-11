/*************************************/
// Number of decolonisation per years
function get_graph() {
d3.csv("Project/datasets/timeline_decolonisation.csv", function(decolonisation) {
  console.log(decolonisation);
  new Chart(document.getElementById("nb_colonizers"), {
      type: 'bar',
      data: {
        labels: decolonisation.year,
        datasets: [
          {
            label: "Number of decolonisation",
            backgroundColor: "3e95cd",
            data: decolonisation.number_of_decolonization
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
});
}

get_graph();
