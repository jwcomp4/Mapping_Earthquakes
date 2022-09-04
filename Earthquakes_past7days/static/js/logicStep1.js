console.log("working");


// Create the amp object with a center and zoom level
// cf the Leaflet Quickstart Guide: https://leafletjs.com/examples/quick-start/

// The following assigns the variable map to the object L.map() and instantiate the object with the given string.
// The mapid will reference the id tag in the <div> element in the index.html file.
// The setView method sets the view of the map with a geographical center, where the first coord is lat, 2nd is long
// Zoom is set to 4 on a scale of 01-18
// The following will produce the same map, but is a better syntax when adding multiple tile layers:





//Creating map object with center as the San Francisco airport
// let map = L.map('mapid').setView([30, 30], 2);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  "Streets": streets,
  "Satellite" : satelliteStreets
};

let map = L.map("mapid", {
  center: [
    39.5, -98.5
  ],
  zoom: 3,
  layers: [streets]
});

// Pass map layers int our layers conrol and add the layers control to the map

L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL
// This would be much like an API request for data.

let earthquake7 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// using the d3.json() method followed by a promise w/ then() and anonymous function()
// d3.json() is like your get request for the data.

var myStyle = {
  "color": "blue",
  "fillColor": "yellow",
  "weight": 2,
  "opacity": 0.9
};

d3.json(earthquake7).then(function(data){
  console.log(data);
  L.geoJSON(data).addTo(map);
});
// L.geoJSON(sanFranAirport, {
//   //turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h3>" +feature.properties.faa + "<h3>" +"<hr>" + "<h4>" + "Airport name: " + feature.properties.name + "<h4>");
//   }
// }).addTo(map);

// Add GeoJSON data.
// Note that the coordinates are in reverse order from the setView().
// this is because GeoJSON data coordinates are set with the 1st param as x(long) and 2nd as y(lat)
// Note the GeoJSON doc here: https://www.rfc-editor.org/rfc/rfc7946
// using the Leaflet L.geoJSON() reverses that order.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data and adding it to the map.
// Note the Leaflet documentation here: https://leafletjs.com/examples/geojson/
// L.geoJSON(sanFranAirport, {
//   //turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng){
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h3>" +feature.properties.name + "<h3>" +"<hr>" + "<h4>" + feature.properties.city + "," + feature.properties.country + "<h4>");
//   }
// }).addTo(map);

// the onEachFeature function allows for adding a popup marker for each fature and add data from the prop of JS object

// L.geoJSON(sanFranAirport, {
//   //turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h3>" +feature.properties.faa + "<h3>" +"<hr>" + "<h4>" + "Airport name: " + feature.properties.name + "<h4>");
//   }
// }).addTo(map);


