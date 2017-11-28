let conflicts = [];
let stories_data = [];
let countries = [];
let current_year_conflicts = [];
let timeline_graph = [];





d3.csv("datasets/clean_conflict.csv", function(conflict) {



  conflict.forEach(function(conflict_) {

    conflicts.push(new Conflict(
      conflict_.location,
      conflict_.ISO2,
      conflict_.year,
      conflict_.start_month
    ))
  });

  console.log(conflicts);



d3.csv("datasets/countries_codes_and_coordinates.csv", function(country_coordinates) {

  console.log(country_coordinates);

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
get_timeline();
get_area(current_year);

});
