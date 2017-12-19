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
            // LEGEND ON CLICK REMOVE ALL DATA
            legend: {
                onHover: function(event, legendItem) {
          document.getElementById("conflicts_region").style.cursor = 'pointer';
        },
        onClick: function(e, legendItem) {
          const index = legendItem.datasetIndex;
          const ci = this.chart;
          const alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

          ci.data.datasets.forEach(function(e, i) {
            var meta = ci.getDatasetMeta(i);

            if (i !== index) {
              if (!alreadyHidden) {
                meta.hidden = meta.hidden === null ? !meta.hidden : null;
              } else if (meta.hidden === null) {
                meta.hidden = true;
              }
            } else if (i === index) {
              meta.hidden = null;
            }
          });

          ci.update();
        },
      },
      tooltips: {
        custom: function(tooltip) {
          if (!tooltip.opacity) {
            document.getElementById("conflicts_region").style.cursor = 'default';
            return;
          }
        }
      },

        maintainAspectRatio: false
    }
});

}
