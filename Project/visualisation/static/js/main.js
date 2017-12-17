let countries = [];
let current_year_conflicts = [];
let pre_conflicts = [];


let colonizers = [
    new Colonizer(
        "France",
        "FR",
        "rgba(255, 206, 86, 1)"
    ),
    new Colonizer(
        "United Kingdom",
        "GB",
        "rgba(147, 159, 92, 1)"
    ),
    new Colonizer(
        "Denmark",
        "DK",
        "rgba(14, 119, 225, 1)"
    ),
    new Colonizer(
        "Netherland",
        "NL",
        "rgba(203, 56, 85, 1)"
    ),
    new Colonizer(
        "Portugal",
        "PT",
        "rgba(147, 159, 92, 1)"
    ),
    new Colonizer(
        "Russia",
        "RU",
        "rgba(112, 74, 44, 1)"
    ),
    new Colonizer(
        "Spain",
        "ES",
        "rgba(0, 191, 255, 1)"
    ),
    new Colonizer(
        "Italy",
        "IT",
        "rgba(63, 191, 12, 1)"
    ),
    new Colonizer(
        "Belgium",
        "BE",
        "rgba(249, 5, 40, 1)"
    ),
];

d3.queue()
.defer(d3.csv, "Project/datasets/colonies_wikipedia.csv")
.defer(d3.csv, "Project/datasets/timeline_colonies.csv" )
.defer(d3.csv, "Project/datasets/colonization_conflict_pre.csv" )
.defer(d3.csv, "Project/datasets/countries_codes_and_coordinates.csv")
.await(load_data);

function load_data(error, colonies, timeline_colonies, conflict, country_coordinates) {//first param is error and not data
    //colonies_data = colonies;

    //A reprendre c'est pas très beau ça
    //d3.csv("Project/datasets/timeline_colonies.csv", function(a) {

    for(let c of colonizers) {
        let years = [];
        let nb_conflicts = [];

        timeline_colonies.forEach(function(y) {
            if(y.colonizer == c.country) {
                years.push(y.year)
                nb_conflicts.push(y.number_of_conflict)
            }
        });
        c.set_data(years, nb_conflicts);
    }


    //d3.csv("Project/datasets/clean_conflict_of_colonized_countries.csv", function(conflict) {

    conflict.forEach(function(conflict_) {
        pre_conflicts.push(new Conflict(
            conflict_.location,
            conflict_.ID,
            conflict_.year,
            conflict_.colonizer
            //conflict_.indep_date
        ))
    });

    //d3.csv("Project/datasets/countries_codes_and_coordinates.csv", function(country_coordinates) {
    country_coordinates.forEach(function(country_co) {
        countries.push(new Country(
            country_co.Country,
            country_co.ISO2,
            country_co.Latitude,
            country_co.Longitude
        ))
    });
    loading_finished();



// Create navbar with colonizers
nav_ul = d3.select('#navbarUL');

colonizers.forEach((colonizer, index) => {
    nav_ul
    .append('li')
    .attr('class', 'nav-item')
    .append('a')
    .attr('class', 'nav-link')
    .attr('id', index)
    .on('click', function() {
        // Remove active for all stories
        nav_ul.selectAll('li').attr('class', 'nav-item');

        // Add active for new story
        this.parentElement.setAttribute('class', 'nav-item active')
        current_colonizer = this.id;
        update_current_year(current_colonizer, colonizers);
        update_timeline(current_colonizer, colonizers);
        get_area(current_year, colonizers, pre_conflicts);

    })
    .text(colonizer.country);
});

// Set first list elem as active
nav_ul.select('li')
.attr('class', 'nav-item active')

const fr_col = colonies.filter(c => c.colonizer_country == "France");
colonizers[0].set_colonies(add_country_to_colony(fr_col));
const uk_col = colonies.filter(c => c.colonizer_country == "United Kingdom");
colonizers[1].set_colonies(add_country_to_colony(uk_col));
const de_col = colonies.filter(c => c.colonizer_country == "Denmark");
colonizers[2].set_colonies(add_country_to_colony(de_col));
const ne_col = colonies.filter(c => c.colonizer_country == "Netherlands");
colonizers[3].set_colonies(add_country_to_colony(ne_col));
const pr_col = colonies.filter(c => c.colonizer_country == "Portugal");
colonizers[4].set_colonies(add_country_to_colony(pr_col));
const ru_col = colonies.filter(c => c.colonizer_country == "Russia");
colonizers[5].set_colonies(add_country_to_colony(ru_col));
const es_col = colonies.filter(c => c.colonizer_country == "Spain");
colonizers[6].set_colonies(add_country_to_colony(es_col));
const it_col = colonies.filter(c => c.colonizer_country == "Italy");
colonizers[7].set_colonies(add_country_to_colony(it_col));
const be_col = colonies.filter(c => c.colonizer_country == "Belgium");
colonizers[8].set_colonies(add_country_to_colony(be_col));


$(function(){
  if($('body').is('.dec')){
      update_timeline(current_colonizer, colonizers);
      get_area(current_year, current_colonizer, pre_conflicts);

  } else if($('body').is('.pre_dec')) {
      get_map_colonies(colonizers);
  }
});


};
