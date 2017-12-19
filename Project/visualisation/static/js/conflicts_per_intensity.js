/*************************************/
// Number of conflicts per years
function get_conflicts_per_intensity(years, intensity1, intensity2) {
    let index_before = 15;
    new Chart(document.getElementById("conflicts_intensity"), {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: "Number of conflicts of intensity 1",
                    data: intensity1,
                    backgroundColor: 'rgb(191, 63, 63)',
                },
                {
                    label: "Number of intensity 2",
                    data: intensity2,
                    backgroundColor: 'rgb(63, 191, 63)',
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
              console.log('Yep');
              document.getElementById('none_selected_2').style.display = "block";
              document.getElementById('intensity1').style.display = "none";
              document.getElementById('intensity2').style.display = "none";
              index_before = 15;
          } else if (index != index_before) {
              index_before = index;
              if (index == 0 ) {
                  document.getElementById('intensity1').style.display = "block";
                  document.getElementById('intensity2').style.display = "none";
                  document.getElementById('none_selected_2').style.display = "none";
              } else if (index == 1 ){
                  document.getElementById('intensity1').style.display = "none";
                  document.getElementById('intensity2').style.display = "block";
                  document.getElementById('none_selected_2').style.display = "none";
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
            document.getElementById("conflicts_intensity").style.cursor = 'default';
            return;
          }
        }
      },

        maintainAspectRatio: false
    }
});

}
