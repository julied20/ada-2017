import { get_timeline } from "./timeline"
import { get_area } from "./map"
import { Conflict, Country, current_year } from "./helpers"


d3.csv("datasets/clean_conflict_of_colonized_countries.csv", conflict => {
  const conflicts = conflict.map(conflict_ => new Conflict(
      conflict_.location,
      conflict_.ISO2,
      conflict_.year,
      conflict_.start_month,
      conflict_.colonizer,
      conflict_.decolonisation_year
  ));

   console.log(conflicts);

  d3.csv("datasets/countries_codes_and_coordinates.csv", country_coordinates => {

    // console.log(country_coordinates);

    const countries = country_coordinates.map(country_co => new Country(
        country_co.Country,
        country_co.ISO3,
        country_co.ISO2,
        country_co.Latitude,
        country_co.Longitude
    ))
    get_timeline();
    get_area(current_year, conflicts);
  });
});
