/*************************************/
// Number of conflicts per years
function get_conflicts_per_region(years, america, europe, africa, middle_east, asia) {
    let index_before = 15;
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
          if(index == index_before) {
              document.getElementById('none_selected').style.display = "block";
              document.getElementById('america').style.display = "none";
              document.getElementById('europe').style.display = "none";
              document.getElementById('africa').style.display = "none";
              document.getElementById('middle_east').style.display = "none";
              document.getElementById('asia').style.display = "none";
              index_before = 15;
          } else if (index != index_before) {
              index_before = index;
              if (index == 0 ) {
                  document.getElementById('america').style.display = "block";
                  document.getElementById('europe').style.display = "none";
                  document.getElementById('africa').style.display = "none";
                  document.getElementById('middle_east').style.display = "none";
                  document.getElementById('asia').style.display = "none";
                  document.getElementById('none_selected').style.display = "none";
              } else if (index == 1 ){
                  document.getElementById('america').style.display = "none";
                  document.getElementById('europe').style.display = "block";
                  document.getElementById('africa').style.display = "none";
                  document.getElementById('middle_east').style.display = "none";
                  document.getElementById('asia').style.display = "none";
                  document.getElementById('none_selected').style.display = "none";
              } else if (index == 2 ){
                  document.getElementById('america').style.display = "none";
                  document.getElementById('europe').style.display = "none";
                  document.getElementById('africa').style.display = "block";
                  document.getElementById('middle_east').style.display = "none";
                  document.getElementById('asia').style.display = "none";
                  document.getElementById('none_selected').style.display = "none";
              } else if (index == 3 ){
                  document.getElementById('america').style.display = "none";
                  document.getElementById('europe').style.display = "none";
                  document.getElementById('africa').style.display = "none";
                  document.getElementById('middle_east').style.display = "block";
                  document.getElementById('asia').style.display = "none";
                  document.getElementById('none_selected').style.display = "none";
              } else if (index == 4 ){
                  document.getElementById('america').style.display = "none";
                  document.getElementById('europe').style.display = "none";
                  document.getElementById('africa').style.display = "none";
                  document.getElementById('middle_east').style.display = "none";
                  document.getElementById('asia').style.display = "block";
                  document.getElementById('none_selected').style.display = "none";
              }
          }

          ci.data.datasets.forEach(function(e, i) {
            var meta = ci.getDatasetMeta(i);
            // If time do this dynamically
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
