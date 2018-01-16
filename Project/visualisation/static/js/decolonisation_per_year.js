/*************************************/
// Number of decolonisation per years
function get_graph(years_dec, nb_dec) {

    // sort both array
    let zipped = [];

    for(let i = 0; i < years_dec.length; ++i) {
      zipped.push({
          year: years_dec[i],
          nb_dec: nb_dec[i]
      });
    }

    zipped.sort(function(left, right) {
      return left.year === right.year ? 0 : (left.year < right.year ? -1 : 1);
    });

    years_dec = zipped.map(function(d) { return d.year });
    nb_dec = zipped.map(function(d) { return d.nb_dec });
    // Finish sorting
    /************************************/
    //Create number with years from 1776 to 2016
    const years = Array.apply(null, {length: 241}).map(function(value, index){
      return index + 1776;
    });

    let decolonisation = [];
    for(let i = 0; i < years.length; ++i) {
        years_dec[i] = Number(years_dec[i]);
        const if_cond = $.inArray( years[i], years_dec) ;
        if (if_cond == -1){
            decolonisation.push(0)
        } else {
            decolonisation.push(nb_dec[if_cond]);
        }
    }


  new Chart(document.getElementById("decolonisation"), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: "Number of decolonisation",
            backgroundColor: "rgba(255, 206, 86, 1)",
            data: decolonisation
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
        maintainAspectRatio: false,
        onClick: function(e){
        let element = this.getElementAtEvent(e);
        if (element[0] != undefined) {
            const year = element[0]._view.label;
            get_map_deco(colonized_countries, year);
            //const index = element[0]._index;
            //const colonizer_name = colonizers[index].country;
            //const color = colonizers[index].color;
            //get_map_colonies(colonizers, colonizers[index])
      }
    },
    onHover: function(e){
        let element = this.getElementAtEvent(e);
        if (element[0] != undefined) {
            d3.select('#nb_colonizers')
                .style('cursor', 'pointer')
        } else {
            d3.select('#nb_colonizers')
                .style('cursor', 'default')
        }
    },
      }
  });
}
