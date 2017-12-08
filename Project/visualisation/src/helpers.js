export let current_year = 1960;

export class Country {
    constructor(country, ISO3, ISO2, latitude, longitude) {
      this.country = country;
      this.ISO3 = ISO3;
      this.ISO2 = ISO2;
      this.latitude = latitude;
      this.longitude = longitude;
    }
}

export class Conflict {
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

export class Year {
    constructor(year, number_of_conflict) {
      this.year = year;
      this.number_of_conflict = number_of_conflict;
    }
}

export function get_current_year_conflicts(current_year, conflicts) {
  return conflicts.filter(x => x.year == current_year)
}

export function update_year(new_year) {
  current_year = new_year;
  return new_year;
}

// FixMe: the function bellow is broken.
/*
export function get_timeline_graph() {
  let t = [];

  d3.csv("datasets/timeline_colonies.csv", function(years) {
    years.forEach(function(year) {
      t.push(new Year(
        year.year,
        year.number_of_conflict
      ))
    });
    console.log(t);
  });

  return t;

}
*/
