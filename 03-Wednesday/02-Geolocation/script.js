$(document).on('ready', function() {
  if ("geolocation" in navigator) {
    console.log('geo is available!')
  } else {
    console.log('geo is NOT available')
  };
})

function onLocation(position) {
  var access_token = 'pk.eyJ1IjoibWxpb25kIiwiYSI6ImNpZW1zc2h4cjAwMXpzdW01MjR1MzRsbmwifQ.9-JxBBJzfVwxUOsEGfPaGw';
  var map_id = 'mapbox.streets-satellite'
  var zoom = '20';
  var format = 'jpg90';
  var width = '640';
  var height = '640';
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  var url = 'https://api.mapbox.com/v4/' + map_id + '/' + lon + ',' + lat + ',' + zoom + '/' + width + 'x' + height + '.' + format + '?access_token=' + access_token;
  appendImage(url);
}

function appendImage(url) {
  $('#map-placement').append('<img src=' + url + '>');
}

function buildURL() {

}

function onError(error) {
  console.error(error);
}

var options = {
  enableHighAccuracy: true
};

navigator.geolocation.getCurrentPosition(onLocation, onError, options);