// Create a map object
let eqMap = L.map("map", {
    center: [37.09, -95.71], //coordinates for US
    zoom: 5,
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(eqMap);

// Load the USGS data for earthquakes in the past 7 days
let usgsData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get data with D3 and pass response to createFeatures function.
d3.json(usgsData).then(function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Use onEachFeature function for each feature in an array.
    // Popup into for each feature includes earthquake magnitude, location and depth
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
        <p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature:onEachFeature
    }).addTo(eqMap);
}

// function createMap(earthquakes) {}