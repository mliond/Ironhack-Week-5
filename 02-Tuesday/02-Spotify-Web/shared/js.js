$('form').on('submit', artistRequest);
$('body').on('click', 'a.album-search', albumRequest);
$('body').on('click', 'button.track-search', trackRequest);

function artistRequest(event) {
  event.preventDefault();
  var Searchterm = $('input.artist').val();
  $.get('https://api.spotify.com/v1/search?q=' + Searchterm + '&type=Artist', handleArtistRequest)
}
function albumRequest(event) {
  event.preventDefault();
  var Searchterm = $(this).attr('data_hook');
  $.get('https://api.spotify.com/v1/artists/' + Searchterm + '/albums', handleAlbumRequest)
}
function trackRequest(event) {
  event.preventDefault();
  var Searchterm = $(this).attr('data_hook');
  console.log(Searchterm);
  $.get('https://api.spotify.com/v1/albums/' + Searchterm + '/tracks', handleTrackRequest)
}

function handleArtistRequest(data) {
  $('table').empty();
  data.artists.items.forEach(function (i) {
    var artistPicture = '<tr><td><img src=' + i.images[0].url + ' class="cover img-thumbnail"></td>';
    var artistName = '<td><a data_hook=' + i.id + ' class="btn btn-success album-search">' + i.name + '</a></td></tr>';
    var tableRow = artistPicture + artistName;
    $('table').append(tableRow);
  });
}
function handleAlbumRequest(data) {
  $('table').empty();
  data.items.forEach(function (i) {
    var albumPicture = '<tr><td><img src=' + i.images[0].url + ' class="cover img-thumbnail"></td>';
    var albumName = '<td><a data_hook=' + i.id + ' class="btn btn-success track-search">' + i.name + '</a></td></tr>';
    var tableRow = albumPicture + albumName;
    $('table').append(tableRow);
  });
}
function handleTrackRequest(data) {
  $('table').empty();
  data.items.forEach(function (i) {
    var trackName = '<tr><td><a href=' + i.preview_url + ' target=”_blank”>' + i.name + '</a></td></tr>';
    var tableRow = trackName;
    $('table').append(tableRow);
  });
}