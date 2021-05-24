mapboxgl.accessToken = 'pk.eyJ1IjoieWlmZWl3YW5nIiwiYSI6ImNrb3NoMHBvZDAxOWEydnBhcW5oNHhoMnYifQ.RTlQ7_gAcXxw800J7tE3GQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 12,
    center: [144.96332, -37.814]
});

//Fetch stores from API
async function getVans() {
    const res = await fetch('/customer/chooseVan')
    const data = await res.json()

    const vans = data.data.map(van => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [van.location.coordinates[0], van.location.coordinates[1]]
            },
            properties: {
                vanId: van.vanId,
                description: '<p>' + van.address + '<p><form action="/customer/chooseVan" method="post" ><input type="hidden" name = "van_id" value="' + van.vanId + '" ><button type="submit">Choose this van</button></form>'
            }
        }
    })
    loadMap(vans)
}

// Load map with stores
function loadMap(vans) {

    // Add a data source containing one point feature.
    map.addSource('point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': vans,
        }
    });

    // Add a layer to use the image to represent the data.
    map.addLayer({
        'id': 'point',
        'type': 'symbol',
        'source': 'point', // reference the data source
        'layout': {
            'icon-image': 'cafe-15', // reference the image
            'icon-size': 1.25,
            'text-field': '{vanId}',
            'text-offset': [0, 0.3],
            'text-anchor': 'top'
        }
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'point', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'point', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'point', function() {
        map.getCanvas().style.cursor = '';
    });

}

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);


getVans()