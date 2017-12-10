let map_div = d3.select("#map_div");
let network_div = d3.select("#network_div");

const width = map_div.node().getBoundingClientRect().width;
const height = map_div.node().getBoundingClientRect().height;


const svg = map_div.append("svg")
.attr("width", width)
.attr("height", height);

const map_group = svg.append("g");

function loadIsoCoord(CSV) {
  iso_geo_coord = CSV;
}


d3.csv('datasets/countries_codes_and_coordinates.csv', loadIsoCoord);
d3.json("static/world.geo.json", function(json) {
  let iso_geo_coord;

  // D3 Projection
  const projection = d3.geoMercator()
  .rotate([0, 0])
  .translate([width / 2, height / 2]);

  // Path generator to convert JSON to SVG paths
  const path = d3.geoPath()
  .projection(projection);


  // Colormap
  let countries = [];

  map_group.selectAll("path")
  .data(countries)
  .enter()
  .append("path")
  .attr('d', country => { return path(country.geo_feat); })
  .style("fill", country => {

    return d3.color("lightgrey");

  })

  const features = json.features;

  });
