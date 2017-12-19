/*************************************/
// Number of conflicts per years
function get_conflicts_per_region(years, america, europe, africa, middle_east, asia) {

    new Chart(document.getElementById("conflicts_region"), {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: "Number of conflicts in Americas",
                    data: america,
                    backgroundColor: 'rgb(191, 63, 63)',
                },
                {
                    label: "Number of conflicts in Europe",
                    data: europe,
                    backgroundColor: 'rgb(63, 191, 63)',
                },
                {
                    label: "Number of conflicts in Africa",
                    data: africa,
                    backgroundColor: 'rgb(63, 63, 191)',
                },
                {
                    label: "Number of conflicts in Middle East",
                    data: middle_east,
                    backgroundColor: 'rgb(191, 191, 63)',
                },
                {
                    label: "Number of conflicts in Asia",
                    data: asia,
                    backgroundColor: 'rgb(191, 127, 63)',
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
            },
            legend: {
                onClick: function(e, legendItem) {
                const index = legendItem.datasetIndex;
                const ci = this.chart;
                const meta = ci.getDatasetMeta(index);

                // See controller.isDatasetVisible comment
                meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;

                // We hid a dataset ... rerender the chart
                ci.update();
            },
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

    new Chart(document.getElementById("conflicts_midle"), {
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

}
