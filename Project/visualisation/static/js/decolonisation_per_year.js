/*************************************/
// Number of decolonisation per years
function get_graph() {
d3.csv("Project/datasets/colonization_conflict_year_regions.csv", function(decolonisation) {
  let labels = [];
  let data = [];
  for (let d of decolonisation) {
    labels.push(d.year);
    data.push(d.number_of_decolonization);
  }

  new Chart(document.getElementById("decolonisation"), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of decolonisation",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: data
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
