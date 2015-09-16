$(document).on('ready', function() {
  if ("geolocation" in navigator) {
    console.log('geo is available!');
    navigator.geolocation.getCurrentPosition(onLocation, onError, options);
  } else {
    console.log('geo is NOT available');
  };
})

var options = {
  enableHighAccuracy: true
};

function onLocation(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  buildURL(lon, lat)
}

function onError(error) {
  console.error(error);
}

function buildURL(lon, lat) {
  var access_token = 'pk.eyJ1IjoibWxpb25kIiwiYSI6ImNpZW1zc2h4cjAwMXpzdW01MjR1MzRsbmwifQ.9-JxBBJzfVwxUOsEGfPaGw';
  var map_id = 'mapbox.streets-satellite'
  var zoom = '20';
  var format = 'jpg90';
  var width = '640';
  var height = '640';
  var url = 'https://api.mapbox.com/v4/' + map_id + '/' + lon + ',' + lat + ',' + zoom + '/' + width + 'x' + height + '.' + format + '?access_token=' + access_token;
  appendImage(url);
}

function appendImage(url) {
  $('#map-placement').append('<img src=' + url + '>');
}

$('button#i-was-here').on('click', function(event) {
  navigator.geolocation.getCurrentPosition(saveLocation, onError, options);
})

function saveLocation(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  window.localStorage.setItem('a', lon + ',' + lat);
}

$('button#where-was-i').on('click', function(event) {
  var locations = window.localStorage.getItem('a');
  // locations.forEach(function (i) {
    // $('.locations ul').append('<li>' + i + '</li>');
  // })
    $('.locations ul').append('<li>' + locations + '</li>');
})