/*************************************/
// Number of conflicts per years
function get_graph_per_region() {
d3.csv('Project/datasets/colonization_conflict_general.csv', function(conflicts) {
  let labels = [];
  let data = [];
  europe_conflict = conflicts.filter(c => c.region == '1');
  middle_east_conflict = conflicts.filter(c => c.region == '2');
  asia_conflict = conflicts.filter(c => c.region == '3');
  africa_conflict = conflicts.filter(c => c.region == '4');
  americas_conflict = conflicts.filter(c => c.region == '5');

  for (let d of conflicts) {
    labels.push(d.year);
    data.push(d.number_of_decolonization);
  }

  new Chart(document.getElementById("conflicts"), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of conflicts",
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
