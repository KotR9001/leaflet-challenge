//Create the Basic Map
var myMap = L.map("map", {
    center: [36.1699, -115.1398],
    zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//Store the URL for the GeoJSON Data
var earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
console.log(earthquakes);

//Read the GeoJSON Data into the Map
d3.json(earthquakes, function(data) {
    console.log(data);
    //Call Function to Create Markers
    createFeatures(data);
});

//Create the Function to Create the Markers
function createFeatures (data) {
    console.log(data);
    //Create a Function to Add Popups
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<strong>Location: ${feature.properties.place}</strong>
            <hr><p>Date: ${new Date(feature.properties.time)}</p>
            <p>Magnitude: ${feature.properties.mag}</p>
            <p>Location: ${feature.geometry.coordinates.slice(0,2)}</p>
            <p>Alert: ${feature.geometry.alert}</p>
            <p>Felt: ${feature.geometry.felt}</p>
            <p>Gap: ${feature.geometry.gap}</p>`)
    };
    

    console.log(data)
    color = "";
    colorList = [];
     

    //Create Function to Store the Colors & Magnitude Values in Lists
    //Specify the Circle Color
    for (i=0; i<data.features.length; i++) {
        //Create an Empty Variable for Color
        color = "";
    
        if (data.features[i].properties.mag>0 && data.features[i].properties.mag<1) {
            color="purple";
        }
        else if (data.features[i].properties.mag>1 && data.features[i].properties.mag<2) {
            color="blue";
        }
        else if (data.features[i].properties.mag>2 && data.features[i].properties.mag<3) {
            color="green";
        }
        else if (data.features[i].properties.mag>3 && data.features[i].properties.mag<4) {
            color="yellow";
        }
        else if (data.features[i].properties.mag>4 && data.features[i].properties.mag<5) {
            color="orange";
        }
        else {
            color="red";
        };
        colorList.push(color);
    };
    console.log(colorList);
    //Method for Converting Basic Markers to Circles Found at https://leafletjs.com/examples/geojson/
    //Method for Handling L.circleMarker with Conditionals found at https://medium.com/geoman-blog/how-to-handle-circles-in-geojson-d04dcd6cb2e6
    L.geoJSON(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {
            if (feature.properties.mag<0) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "gray",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=0 && feature.properties.mag<1) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "purple",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=1 && feature.properties.mag<2) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "blue",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=2 && feature.properties.mag<3) {
               return  L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "green",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=3 && feature.properties.mag<4) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "yellow",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=4 && feature.properties.mag<5) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "orange",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "red",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            };
        console.log(feature.properties.mag)}
    }).addTo(myMap);
};
