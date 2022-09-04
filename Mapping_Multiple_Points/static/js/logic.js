console.log("working");


// Create the amp object with a center and zoom level
// cf the Leaflet Quickstart Guide: https://leafletjs.com/examples/quick-start/

// The following assigns the variable map to the object L.map() and instantiate the object with the given string.
// The mapid will reference the id tag in the <div> element in the index.html file.
// The setView method sets the view of the map with a geographical center, where the first coord is lat, 2nd is long
// Zoom is set to 4 on a scale of 01-18
// The following will produce the same map, but is a better syntax when adding multiple tile layers:
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

let map = L.map('mapid').setView([40.7, -94.5], 4);

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });

// Adding a marker (cf Leaflet doc: https://leafletjs.com/examples/quick-start/)

// An array containing each city's location, state, and population.
// This is referencing the cities.js file with the city data. 
// for it to work, you also need to add a <scipt> in the index.html w/ the appropriate file path the reference the data.

let cityData = cities;
  // Looping through the cities array and creating one marker for each city.
  // Using forEach with an anonymous function that first prints each city object to console.
  // Then adds a marker for each city at the location to the map.
  // Notse that best practice for large datasets is to have the data in its own file
  // Then refer to that file in the logic.js file.

  cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        color: "orange",
        weight: 4,
        radius: city.population/200000
    })
    .bindPopup("<h2>" + city.city + " " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map)
  });

// Adding a circle to the map at Los Angeles, CA

// L.circleMarker([34.0522, -118.2437], {
//     color: "black",
//     fillColor: "yellow",
//     fillOpacity: 0.07,
//     radius: 300
// }).addTo(map);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);