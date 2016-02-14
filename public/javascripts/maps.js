/**
 * Google Map API configuration
 */
var map_style = [{
  "featureType": "administrative.locality",
  "elementType": "all",
  "stylers": [{
    "hue": "#2c2e33"
  }, {
    "saturation": 7
  }, {
    "lightness": 19
  }, {
    "visibility": "on"
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "hue": "#ffffff"
  }, {
    "saturation": -100
  }, {
    "lightness": 100
  }, {
    "visibility": "simplified"
  }]
}, {
  "featureType": "poi",
  "elementType": "all",
  "stylers": [{
    "hue": "#ffffff"
  }, {
    "saturation": -100
  }, {
    "lightness": 100
  }, {
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "hue": "#bbc0c4"
  }, {
    "saturation": -93
  }, {
    "lightness": 31
  }, {
    "visibility": "simplified"
  }]
}, {
  "featureType": "road",
  "elementType": "labels",
  "stylers": [{
    "hue": "#bbc0c4"
  }, {
    "saturation": -93
  }, {
    "lightness": 31
  }, {
    "visibility": "on"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels",
  "stylers": [{
    "hue": "#bbc0c4"
  }, {
    "saturation": -93
  }, {
    "lightness": -2
  }, {
    "visibility": "simplified"
  }]
}, {
  "featureType": "road.local",
  "elementType": "geometry",
  "stylers": [{
    "hue": "#e9ebed"
  }, {
    "saturation": -90
  }, {
    "lightness": -8
  }, {
    "visibility": "simplified"
  }]
}, {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "hue": "#e9ebed"
  }, {
    "saturation": 10
  }, {
    "lightness": 69
  }, {
    "visibility": "on"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "hue": "#e9ebed"
  }, {
    "saturation": -78
  }, {
    "lightness": 67
  }, {
    "visibility": "simplified"
  }]
}];

function initialize() {

  var mapOptions = {
    center: {
      lat: 35.7748760,
      lng: -78.9514510
    },
    styles: map_style,
    zoom: 3
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  setTimeout(function() {
    $.getJSON('/api/edges', function(data) {
      for (var i in data) {
        addMarker(data[i], i);
      }
    });

    markers = [];
  }, 1000);
}
google.maps.event.addDomListener(window, 'load', initialize);

function addMarker(item, timeout) {
  var latlng = new google.maps.LatLng(item.lat, item.lon);
  setTimeout(function() {
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 2,
        strokeColor: '#F75850',
        strokeWeight: 2
      },
      animation: google.maps.Animation.DROP
    });
    lastOpen = null;
    google.maps.event.addListener(marker, 'click', function(eve) {

    });
    markers.push(marker);
  }, timeout);

}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}
