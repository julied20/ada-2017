/*************************************/
// Number of conflicts per years
function get_conflicts_per_region(years, region) {

  let labels = [];
  let data = [];


    new Chart(document.getElementById("conflicts_region"), {
        type: 'bar',
        data: {
          labels: years,
          datasets: [
            {
              label: "Number of conflicts",
              backgroundColor: "rgba(255, 206, 86, 1)",
              data: region
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Conflicts in Africa'
          },
          legend: {
            onClick: null
          },
          maintainAspectRatio: false
        }
    });

}
