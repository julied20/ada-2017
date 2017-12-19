let current_year = 1946;
let current_colonizer = 0;


// Coloniser with ISO, color, and number of conflicts per year and ISO and name of colonies.
class Colonizer {
  constructor(country, ISO3, color){
    this.country = country;
    this.ISO3 = ISO3;
    this.color = color;
  }
  set_conflicts_pre(conflict_years, nb_conflicts) {
    this.conflict_pre_years = conflict_years;
    this.nb_pre_conflicts = nb_conflicts;
  }
  set_conflicts_post(conflict_years, nb_conflicts) {
    this.conflict_post_years = conflict_years;
    this.nb_post_conflicts = nb_conflicts;
  }


  //Take a list of countries
  set_colonies(colonies) {
    this.colonies = colonies;
  }
}


class Colonized_Country {
    constructor(country, ISO2, year) {
        this.country = country;
        this.ISO2 = ISO2;
        this.year = year;
    }
    set_color(color) {
        this.color = color;
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
  current_year  = d3.min(colonizers[c].conflict_pre_years);
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

function roll_years(duration=300, first_year=null, last_year=null, last_year_callback=null) {

    clearInterval(year_interval);
    year_interval = setInterval(next_year_callback, duration);
    let year_i = 0;

    function next_year_callback() {
        if (first_year == null) {
            first_year = parseInt(years[0]);
        }

        if (last_year == null) {
            last_year = parseInt(years[years.length - 1]);
        }

        year_i += 1;
        change_year(first_year + year_i);

        if (first_year + year_i == last_year) {
            clearInterval(year_interval);

            // Run callback if provided
            if (last_year_callback != null) {
                last_year_callback();
            }

            // Show control buttons if they were hidden
            if (hide_control_buttons) {
                console.log('yea');
                d3.select('#control_buttons_div').attr('class', '');
            }
        }
    }

}
