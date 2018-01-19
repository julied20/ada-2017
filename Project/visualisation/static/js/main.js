let countries = [];
let current_year_conflicts = [];
let gen_conflicts = [];
//let post_conflicts = [];
let colonized_countries = [];


let colonizers = [
    new Colonizer(
        "United Kingdom",
        "GB",
        "rgba(147, 159, 92, 1)"
    ),
    new Colonizer(
        "France",
        "FR",
        "rgba(255, 206, 86, 1)"
    ),
    new Colonizer(
        "Spain",
        "ES",
        "rgba(0, 191, 255, 1)"
    ),
    new Colonizer(
        "Russia",
        "RU",
        "rgba(112, 74, 44, 1)"
    ),
    new Colonizer(
        "Portugal",
        "PT",
        "rgba(249, 105, 14, 1)"
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
    new Colonizer(
        "Netherlands",
        "NL",
        "rgba(203, 56, 85, 1)"
    ),
    new Colonizer(
        "Denmark",
        "DK",
        "rgba(14, 119, 225, 1)"
    ),
];

d3.queue()
.defer(d3.csv, "Project/datasets/colonies_wikipedia.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_pre.csv" )
.defer(d3.csv, "Project/datasets/colonization_conflict_post.csv" )
.defer(d3.csv, "Project/datasets/countries_codes_and_coordinates.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_regions.csv")
.defer(d3.csv, "Project/datasets/timeline_decolonisation.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_colon_countries_gen.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_intensity.csv")
.await(load_data);

function load_data(error, colonies, conflicts_pre, conflicts_post, country_coordinates, conflicts_year_region, dec_years, timeline_gen, c_intensity) {//first param is error and not data
    for(let c of colonies) {
        colonized_countries.push(new Colonized_Country(
            c.colonized_country,
            c.ID,
            c.Year,
        ))
    }

    for(let c of colonized_countries) {
        if(Number(c.year) < 1850) {
            c.set_color("#E9D460");
        } else if (Number(c.year) < 1930 ){
            c.set_color("#D4A94F");
        } else if (Number(c.year) < 1955 ){
            c.set_color("#C07E3E");
        } else if (Number(c.year) < 1980 ){
            c.set_color("#AB532C");
        } else if (Number(c.year) <  2016 ){
            c.set_color("#96281B");
        }
    }

    //For Number of decolonisation per graph
    let nb_dec = [];
    let years_dec = []
    for (let d of dec_years) {
        years_dec.push(d.year)
        nb_dec.push(d.number_of_decolonization);
    }

    let intensity1 = []
    let intensity2 = []
    for (let c of c_intensity) {
        intensity1.push(c.Intensity1);
        intensity2.push(c.Intensity2);
    }

    // For Number of conflicts per region
    let years = [];
    let middle_east = [];
    let africa = [];
    let europe = [];
    let asia = [];
    let america = [];
    for(let c_y_r of conflicts_year_region) {
        years.push(c_y_r.Year);
        middle_east.push(c_y_r.Middle_East);
        africa.push(c_y_r.Africa);
        europe.push(c_y_r.Europe);
        asia.push(c_y_r.Asia);
        america.push(c_y_r.America);

    }

    conflicts_pre.forEach(function(conflict_) {
        gen_conflicts.push(new Conflict(
            conflict_.location,
            conflict_.ID,
            conflict_.year,
            conflict_.colonizer_country
        ))
    });
    conflicts_post.forEach(function(conflict_) {
        gen_conflicts.push(new Conflict(
            conflict_.location,
            conflict_.ID,
            conflict_.year,
            conflict_.colonizer_country
        ))
    });


    country_coordinates.forEach(function(country_co) {
        countries.push(new Country(
            country_co.Country,
            country_co.ISO2,
            country_co.Latitude,
            country_co.Longitude
        ))
    });


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

        if($('body').is('.dec')){
            update_current_year(current_colonizer, colonizers);
            update_timeline(current_colonizer, colonizers);
            get_area(current_year, colonizers, gen_conflicts);
        } else if ($('body').is('.post_dec')){
            update_current_year(current_colonizer, colonizers);
            update_timeline(current_colonizer, colonizers);
            get_area(current_year, colonizers, gen_conflicts);
        } else if ($('body').is('.dashboard')){
            update_current_year(current_colonizer, colonizers);
            update_timeline(current_colonizer, colonizers);
            get_area(current_year, colonizers, gen_conflicts);
        }

    })
    .text(colonizer.country);
});

// Set first list elem as active
nav_ul.select('li')
.attr('class', 'nav-item active')

const fr_col = colonies.filter(c => c.colonizer_country == "United Kingdom");
colonizers[0].set_colonies(add_country_to_colony(fr_col));
const uk_col = colonies.filter(c => c.colonizer_country == "France");
colonizers[1].set_colonies(add_country_to_colony(uk_col));
const de_col = colonies.filter(c => c.colonizer_country == "Denmark");
colonizers[8].set_colonies(add_country_to_colony(de_col));
const ne_col = colonies.filter(c => c.colonizer_country == "Netherlands");
colonizers[7].set_colonies(add_country_to_colony(ne_col));
const pr_col = colonies.filter(c => c.colonizer_country == "Portugal");
colonizers[4].set_colonies(add_country_to_colony(pr_col));
const ru_col = colonies.filter(c => c.colonizer_country == "Russia");
colonizers[3].set_colonies(add_country_to_colony(ru_col));
const es_col = colonies.filter(c => c.colonizer_country == "Spain");
colonizers[2].set_colonies(add_country_to_colony(es_col));
const it_col = colonies.filter(c => c.colonizer_country == "Italy");
colonizers[5].set_colonies(add_country_to_colony(it_col));
const be_col = colonies.filter(c => c.colonizer_country == "Belgium");
colonizers[6].set_colonies(add_country_to_colony(be_col));

// To have the diff timelines
let years_conflicts = []
let nb_confl_uk = []
let nb_confl_fr = []
let nb_confl_ne = []
let nb_confl_esp = []
let nb_confl_it = []
let nb_confl_rus = []
let nb_confl_da = []
let nb_confl_bel = []
let nb_confl_po = []


for(let i = 0; i< timeline_gen.length; ++i) {
    years_conflicts.push(timeline_gen[i].Year);
    nb_confl_uk.push(timeline_gen[i].United_Kingdom);    nb_confl_fr.push(timeline_gen[i].France);    nb_confl_da.push(timeline_gen[i].Denmark);    nb_confl_esp.push(timeline_gen[i].Spain);    nb_confl_it.push(timeline_gen[i].Italy);    nb_confl_rus.push(timeline_gen[i].Russia);    nb_confl_bel.push(timeline_gen[i].Belgium);    nb_confl_ne.push(timeline_gen[i].Netherlands);    nb_confl_po.push(timeline_gen[i].Portugal);}
colonizers[1].set_conflicts(years_conflicts, nb_confl_fr);
colonizers[0].set_conflicts(years_conflicts, nb_confl_uk);
colonizers[8].set_conflicts(years_conflicts, nb_confl_da);
colonizers[7].set_conflicts(years_conflicts, nb_confl_ne);
colonizers[4].set_conflicts(years_conflicts, nb_confl_po);
colonizers[3].set_conflicts(years_conflicts, nb_confl_rus);
colonizers[2].set_conflicts(years_conflicts, nb_confl_esp);
colonizers[5].set_conflicts(years_conflicts, nb_confl_it);
colonizers[6].set_conflicts(years_conflicts, nb_confl_bel);



$(function(){
  if($('body').is('.dec')){
      get_graph(years_dec, nb_dec);
      get_map_deco(colonized_countries, 0);
  } else if($('body').is('.pre_dec')) {
      get_map_colonies(colonizers);
      get_graph_colonies(colonizers);
  } else if($('body').is('.post_dec')) {
      update_timeline(current_colonizer, colonizers);
      get_area(current_year, current_colonizer, gen_conflicts);
      get_conflicts_per_region(years, america, europe, africa, middle_east, asia);
      get_conflicts_per_intensity(years, intensity1, intensity2);
  } else if($('body').is('.dashboard')) {
      get_conflicts_per_region(years, america, europe, africa, middle_east, asia);
      get_conflicts_per_intensity(years, intensity1, intensity2);
      get_graph(years_dec, nb_dec);
      get_map_deco(colonized_countries, 0);
      get_map_colonies(colonizers);
      get_graph_colonies(colonizers);

  } else if($('body').is('.presentation')) {
      get_conflicts_per_region(years, america, europe, africa, middle_east, asia);
      get_conflicts_per_intensity(years, intensity1, intensity2);
      get_graph(years_dec, nb_dec);
      get_map_deco(colonized_countries, 0);
      get_map_colonies(colonizers);
      get_graph_colonies(colonizers);

  }
});


};
