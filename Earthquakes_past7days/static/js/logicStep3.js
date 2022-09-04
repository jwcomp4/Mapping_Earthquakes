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
  "color": "#ffffa1",
  "weight": 2,
};

d3.json(earthquake7).then(function(data){
  console.log(data);
  function styleInfo(feature) {
    return {
      opacity: 1, 
      fillOpacity: 1, 
      fillColor: getColor(feature.properties.mag), 
      color: "#000000",
      radius: getRadius(feature.properties.mag), 
      stroke: true,
      weight: 0.5
    };
    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }
  }
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }
  L.geoJSON(data, {
    // Turn each feature into circlerMarker on the map:
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng);
    }, 
    style: styleInfo,
    // Create a popup for each circle marker to display magnitude & location of the eq after the marker has been created
    // and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);
});

