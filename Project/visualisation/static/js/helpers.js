let current_year = 1946;
let current_colonizer = 0;

class Colonizer {
  constructor(country, ISO3, color){
    this.country = country;
    this.IS03 = ISO3;
    this.color = color;
  }
  set_data(conflict_years, nb_conflicts) {
    this.conflict_years = conflict_years;
    this.nb_conflicts = nb_conflicts;
  }
}

class Country {
  constructor(country, ISO3, ISO2, latitude, longitude) {
    this.country = country;
    this.ISO3 = ISO3;
    this.ISO2 = ISO2;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

class Conflict {
  constructor(location, ISO2, year, month, colonizer, year_decolonisation) {
    this.location = location;
    this.ISO2 = ISO2;
    this.year = year;
    this.month = month;
    this.colonizer = colonizer;
    this.year_decolonisation = year_decolonisation;
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

function get_colonizer_conflicts(conflicts) {
  colonizer_conflicts = conflicts.filter(x => x.colonizer == colonizers[current_colonizer].country);
  return colonizer_conflicts;
}

function get_current_year_conflicts(current_year) {
  current_year_conflicts = conflicts.filter(x => x.year == current_year)
  return current_year_conflicts;
}

function update_current_year(c, colonizers){
  current_year  = d3.min(colonizers[c].conflict_years);

}

function loading_finished() {
    d3.select("#loader").attr("class", "invisible");
    d3.select("#content").attr("class", "");
}
