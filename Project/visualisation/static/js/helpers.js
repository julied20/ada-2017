let current_year = 1946;
let current_colonizer = 0;


// Coloniser with ISO, color, and number of conflicts per year and ISO and name of colonies.
class Colonizer {
  constructor(country, ISO3, color){
    this.country = country;
    this.ISO3 = ISO3;
    this.color = color;
  }
  set_data(conflict_years, nb_conflicts) {
    this.conflict_years = conflict_years;
    this.nb_conflicts = nb_conflicts;
  }

  //Take a list of countries
  set_colonies(colonies) {
    this.colonies = colonies;
  }
}


class Country {
  constructor(country, ISO2, latitude, longitude) {
    this.country = country;
    this.ISO2 = ISO2;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  set_dec_year(dec_year) {
    this.dec_year = dec_year;
  }
}

class Conflict {
  constructor(location, ISO2, year, colonizer) {
    this.location = location;
    this.ISO2 = ISO2;
    this.year = year;
    this.colonizer = colonizer;
    //this.year_decolonisation = year_decolonisation;
  }
  set_data(data) {
    this.data = data;
  }
}

class Year {
  constructor(year, number_of_conflict) {
    this.year = year;
    this.number_of_conflict = number_of_conflict;
  }
}

function get_colonizer_conflicts(confl) {
  colonizer_conflicts = confl.filter(x => x.colonizer == colonizers[current_colonizer].country);
  return colonizer_conflicts;
}

function get_current_year_conflicts(current_year, confl) {
  current_year_conflicts = confl.filter(x => x.year == current_year);
  return current_year_conflicts;
}

// Reset the current year to min
function update_current_year(c, colonizers){
  current_year  = d3.min(colonizers[c].conflict_years);
}

// Add the list of colonized countries to the coloniser
function add_country_to_colony(colonized_c) {
  let countries = []
  for(let c of colonized_c) {
    let country = new Country(
      c.colonized_country,
      c.ID,
    )
    country.set_dec_year(c.Year);
    countries.push(country);
  }
  return countries;
}


function loading_finished() {
    d3.select("#loader").attr("class", "invisible");
    d3.select("#content").attr("class", "");
}


// Text animated, not sure it's working
let animateBox = function() {
		if ( $('.animate-box').length > 0 ) {
			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					$(this.element).addClass('fadeIn animated');

				}
			} , { offset: '80%' } );
		}
	};
