let conflicts = [];
let stories_data = [];
let countries = [];
let current_year_conflicts = [];
let timeline_graph = [];

let colonizers = [
  new Colonizer(
    "France",
    "FRA",
    "rgba(255, 206, 86, 1)"
  ),
  new Colonizer(
    "United Kingdom",
    "Quinoa",
    "rgba(147, 159, 92, 1)"
  ),
  /*new Colonizer(
    "Denmark",
    "DEN",
    "rgba(14, 119, 225, 1)"
  ),
  new Colonizer(
    "Netherland",
    "NLD",
    "rgba(203, 56, 85, 1)"
  ),*/
  new Colonizer(
    "Portugal",
    "POR",
    "rgba(147, 159, 92, 1)"
  ),
  new Colonizer(
    "Russia",
    "RUS",
    "rgba(112, 74, 44, 1)"
  ),
  new Colonizer(
    "Spain",
    "ESP",
    "rgba(63, 191, 63, 1)"
  ),
  /*new Colonizer(
    "Italy",
    "ITA",
    "rgba(63, 191, 63, 1)"
  ),
  new Colonizer(
    "Belgium",
    "BEL",
    "rgba(63, 191, 63, 1)"
  ),*/
];

//A reprendre c'est pas très beau ça
d3.csv("Project/datasets/timeline_colonies.csv", function(a) {

  for(let c of colonizers) {
    let years = [];
    let nb_conflicts = [];

    a.forEach(function(y) {
      if(y.colonizer == c.country) {
        years.push(y.year)
        nb_conflicts.push(y.number_of_conflict)
      }
    });
    c.set_data(years, nb_conflicts);
  }
});

d3.csv("Project/datasets/clean_conflict_of_colonized_countries.csv", function(conflict) {

  conflict.forEach(function(conflict_) {

    conflicts.push(new Conflict(
      conflict_.terr,
      conflict_.ISO2,
      conflict_.year,
      conflict_.start_month,
      conflict_.colonizer,
      conflict_.decolonisation_year
    ))
  });

  d3.csv("Project/datasets/countries_codes_and_coordinates.csv", function(country_coordinates) {
    country_coordinates.forEach(function(country_co) {
      countries.push(new Country(
        country_co.Country,
        country_co.ISO3,
        country_co.ISO2,
        country_co.Latitude,
        country_co.Longitude
      ))
    });
  });

  // Create navbar with colonizers
  nav_ul = d3.select('#navbarUL');

  colonizers.forEach((colonizer, index) => {
    nav_ul
    .append('li')
    .attr('class', 'nav-item')
    .append('a')
    .attr('class', 'nav-link')
    .attr('href', '#')
    .attr('id', index)
    .on('click', function() {
      // Remove active for all stories
      nav_ul.selectAll('li').attr('class', 'nav-item');

      // Add active for new story
      this.parentElement.setAttribute('class', 'nav-item active')
      current_colonizer = this.id;
      update_current_year(current_colonizer, colonizers);
      update_timeline(current_colonizer, colonizers);
      get_area(current_year, colonizers);
    })
    .text(colonizer.country);
  });


  // Set first list elem as active
  nav_ul.select('li')
  .attr('class', 'nav-item active')


  update_timeline(current_colonizer, colonizers);
  get_area(current_year, current_colonizer);

  /*const change_year = new_year => {
    const year_conflicts = conflicts.filter(x => x.Year == new_year);
    paths = map_group.selectAll("path")
    .data(countries);

    update_paths(paths);
    update_paths(paths.enter().append("path"));

    update_graph();
  }*/

});
