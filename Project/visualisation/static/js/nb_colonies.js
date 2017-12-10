// Number of colonies per countries
new Chart(document.getElementById("nb_colonizers"), {
    type: 'bar',
    data: {
      labels: ["United Kingdom", "France", "Spain", "Russia", "Portugal", "Netherland", "Belgium", "Denmark", "Italy"],
      datasets: [
        {
          label: "Number of colonies",
          backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd","#3e95cd", "3e95cd", "3e95cd", "3e95cd", "3e95cd"],
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
