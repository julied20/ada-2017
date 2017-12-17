/*************************************/
// Number of conflicts per years
function get_conflicts_per_region(years, middle_east, africa, europe, asia, america) {

  let labels = [];
  let data = [];

  new Chart(document.getElementById("conflicts_eur"), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: "Number of conflicts",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: europe
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Conflicts in Europe'
        },
        legend: {
          onClick: null
        },
        maintainAspectRatio: false
      }
  });

  new Chart(document.getElementById("conflicts_afr"), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: "Number of conflicts",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: africa
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

  new Chart(document.getElementById("conflicts_asia"), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: "Number of conflicts",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: asia
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Conflicts in Asia'
        },
        legend: {
          onClick: null
        },
        maintainAspectRatio: false
      }
  });

  new Chart(document.getElementById("conflicts_midl"), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: "Number of conflicts",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: middle_east
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Conflicts in Middle East'
        },
        legend: {
          onClick: null
        },
        maintainAspectRatio: false
      }
  });

  new Chart(document.getElementById("conflicts_am"), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: "Number of conflicts",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: america
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Conflicts in Americas'
        },
        legend: {
          onClick: null
        },
        maintainAspectRatio: false
      }
  });
}
