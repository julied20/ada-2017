let countries = [];
let current_year_conflicts = [];
let pre_conflicts = [];
let post_conflicts = [];
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
        "Netherlands",
        "NL",
        "rgba(203, 56, 85, 1)"
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
        "Denmark",
        "DK",
        "rgba(14, 119, 225, 1)"
    ),
];

d3.queue()
.defer(d3.csv, "Project/datasets/colonies_wikipedia.csv")
//.defer(d3.csv, "Project/datasets/timeline_colonies.csv" )
.defer(d3.csv, "Project/datasets/colonization_conflict_pre.csv" )
.defer(d3.csv, "Project/datasets/colonization_conflict_post.csv" )
.defer(d3.csv, "Project/datasets/countries_codes_and_coordinates.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_regions.csv")
.defer(d3.csv, "Project/datasets/timeline_decolonisation.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_colon_countries_pre.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_colon_countries_post.csv")
.defer(d3.csv, "Project/datasets/colonization_conflict_year_intensity.csv")
//.defer(d3.csv, "Project/datasets/timeline_deco.csv")
.await(load_data);

function load_data(error, colonies, conflict_pre, conflict_post, country_coordinates, conflicts_year_region, dec_years, timeline_pre, timeline_post, c_intensity) {//first param is error and not data

    //Get colonized_country:
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
        } else if (Number(c.year) < 1930 ){//|| Number(c.year) < 1930) {
            c.set_color("#D4A94F");
        } else if (Number(c.year) < 1955 ){//|| Number(c.year) < 1955) {
            c.set_color("#C07E3E");
        } else if (Number(c.year) < 1980 ){//|| Number(c.year) < 1980) {
            c.set_color("#AB532C");
        } else if (Number(c.year) <  2016 ){//|| Number(c.year) < 2016) {
            c.set_color("#96281B");
        }
    }
    console.log(colonized_countries);



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
    let years = [];//conflicts_year_region.Year;
    let middle_east = [];//conflicts_year_region.Middle_East;
    let africa = [];//conflicts_year_region.Africa;
    let europe = [];//conflicts_year_region.Europe;
    let asia = [];//conflicts_year_region.Asia;
    let america = [];//conflicts_year_region.America;
    for(let c_y_r of conflicts_year_region) {
        years.push(c_y_r.Year);
        middle_east.push(c_y_r.Middle_East);
        africa.push(c_y_r.Africa);
        europe.push(c_y_r.Europe);
        asia.push(c_y_r.Asia);
        america.push(c_y_r.America);

    }

    conflict_pre.forEach(function(conflict_) {
        pre_conflicts.push(new Conflict(
            conflict_.location,
            conflict_.ID,
            conflict_.year,
            conflict_.colonizer_country
        ))
    });
    conflict_post.forEach(function(conflict_) {
        post_conflicts.push(new Conflict(
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
            update_timeline(current_colonizer, colonizers, true);
            get_area(current_year, colonizers, pre_conflicts);
        } else if ($('body').is('.post_dec')){
            update_current_year(current_colonizer, colonizers);
            update_timeline(current_colonizer, colonizers, false);
            get_area(current_year, colonizers, post_conflicts);
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
colonizers[5].set_colonies(add_country_to_colony(ne_col));
const pr_col = colonies.filter(c => c.colonizer_country == "Portugal");
colonizers[4].set_colonies(add_country_to_colony(pr_col));
const ru_col = colonies.filter(c => c.colonizer_country == "Russia");
colonizers[3].set_colonies(add_country_to_colony(ru_col));
const es_col = colonies.filter(c => c.colonizer_country == "Spain");
colonizers[2].set_colonies(add_country_to_colony(es_col));
const it_col = colonies.filter(c => c.colonizer_country == "Italy");
colonizers[6].set_colonies(add_country_to_colony(it_col));
const be_col = colonies.filter(c => c.colonizer_country == "Belgium");
colonizers[7].set_colonies(add_country_to_colony(be_col));

// To have the diff timelines
let years_pre_post_conflicts = []
let nb_confl_pre_uk = []
let nb_confl_post_uk = []
let nb_confl_pre_fr = []
let nb_confl_post_fr = []
let nb_confl_pre_ne = []
let nb_confl_post_ne = []
let nb_confl_pre_esp = []
let nb_confl_post_esp = []
let nb_confl_pre_it = []
let nb_confl_post_it = []
let nb_confl_pre_rus = []
let nb_confl_post_rus = []
let nb_confl_pre_da = []
let nb_confl_post_da = []
let nb_confl_pre_bel = []
let nb_confl_post_bel = []
let nb_confl_pre_po = []
let nb_confl_post_po = []


for(let i = 0; i< timeline_pre.length; ++i) {
    years_pre_post_conflicts.push(timeline_pre[i].Year);
    nb_confl_pre_uk.push(timeline_pre[i].United_Kingdom);
    nb_confl_post_uk.push(timeline_post[i].United_Kingdom);
    nb_confl_pre_fr.push(timeline_pre[i].France);
    nb_confl_post_fr.push(timeline_post[i].France);
    nb_confl_pre_da.push(timeline_pre[i].Denmark);
    nb_confl_post_da.push(timeline_post[i].Denmark);
    nb_confl_pre_esp.push(timeline_pre[i].Spain);
    nb_confl_post_esp.push(timeline_post[i].Spain);
    nb_confl_pre_it.push(timeline_pre[i].Italy);
    nb_confl_post_it.push(timeline_post[i].Italy);
    nb_confl_pre_rus.push(timeline_pre[i].Russia);
    nb_confl_post_rus.push(timeline_post[i].Russia);
    nb_confl_pre_bel.push(timeline_pre[i].Belgium);
    nb_confl_post_bel.push(timeline_post[i].Belgium);
    nb_confl_pre_ne.push(timeline_pre[i].Netherlands);
    nb_confl_post_ne.push(timeline_post[i].Netherlands);
    nb_confl_pre_po.push(timeline_pre[i].Portugal);
    nb_confl_post_po.push(timeline_post[i].Portugal);
}
colonizers[1].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_fr);
colonizers[1].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_fr);
colonizers[0].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_uk);
colonizers[0].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_uk);
colonizers[8].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_da);
colonizers[8].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_da);
colonizers[5].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_ne);
colonizers[5].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_ne);
colonizers[4].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_po);
colonizers[4].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_po);
colonizers[3].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_rus);
colonizers[3].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_rus);
colonizers[2].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_esp);
colonizers[2].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_esp);
colonizers[6].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_it);
colonizers[6].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_it);
colonizers[7].set_conflicts_pre(years_pre_post_conflicts, nb_confl_pre_bel);
colonizers[7].set_conflicts_post(years_pre_post_conflicts, nb_confl_post_bel);



$(function(){
  if($('body').is('.dec')){
      get_graph(years_dec, nb_dec);
      update_timeline(current_colonizer, colonizers, true);
      get_area(current_year, current_colonizer, pre_conflicts);
  } else if($('body').is('.pre_dec')) {
      get_map_colonies(colonizers);
      get_graph_colonies(colonizers);
  } else if($('body').is('.post_dec')) {
      //update_timeline(current_colonizer, colonizers, false);
      //get_area(current_year, current_colonizer, post_conflicts);
      get_conflicts_per_region(years, america, europe, africa, middle_east, asia);
      get_conflicts_per_intensity(years, intensity1, intensity2);
      get_map_deco(colonized_countries);
  }
});


};
