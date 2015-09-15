$('form').on('submit', spotRequest);

function spotRequest(event) {
  event.preventDefault();
  var Searchterm = $('input.artist').val();
  console.log(Searchterm);
  $.get('https://api.spotify.com/v1/search?q=' + Searchterm + '&type=Artist', handleRequest)
}

function handleRequest(data) {
<<<<<<< HEAD
  $('table').empty();
  data.artists.items.forEach(function (i) {
    var artistPicture = '<tr><td><img src=' + i.images[0].url + ' height="200px"></td>';
    var artistName = '<td><a class="album-search btn btn-primary btn-lg" data-toggle="modal" data-target=".bs-example-modal-sm" data_hook=' + i.id + ' >' + i.name + '</a></td></tr>';
    var tableRow = artistPicture + artistName;
    $('table').append(tableRow);
  });
}

$('body').on('click', 'a.album-search', albumRequest);

function albumRequest(event) {
  event.preventDefault();
  var Searchterm = $(this).attr('data_hook');
  $.get('https://api.spotify.com/v1/artists/' + Searchterm + '/albums', handleRequestAlbum)
}

function handleRequestAlbum(data) {
  // $('table').empty();
  // data.items.forEach(function (i) {
  //   var albumPicture = '<tr><td><img src=' + i.images[0].url + ' height="200px"></td>';
  //   var albumName = '<td><button data_hook=' + i.id + ' class="track-search">' + i.name + '</button></td></tr>';
  //   var tableRow = albumPicture + albumName;
  //   $('table').append(tableRow);
  // });
  data.items.forEach(function (i) {
    var albumPicture = '<tr><td><img src=' + i.images[0].url + ' height="200px"></td>';
    var albumName = '<td><button data_hook=' + i.id + ' class="track-search">' + i.name + '</button></td></tr>';
    var tableRow = albumPicture + albumName;
    $('modal-content.table').append(tableRow);
  });
}

$('body').on('click', 'button.track-search', trackRequest);

function trackRequest(event) {
  event.preventDefault();
  var Searchterm = $(this).attr('data_hook');
  console.log(Searchterm);
  $.get('https://api.spotify.com/v1/albums/' + Searchterm + '/tracks', handleRequestTracks)
}

function handleRequestTracks(data) {
  $('table').empty();
  data.items.forEach(function (i) {
    var trackName = '<tr><td><a href=' + i.preview_url + ' target=”_blank”>' + i.name + '</a></td></tr>';
    var tableRow = trackName;
    $('table').append(tableRow);
=======
  console.log(data);
  $('table').text('');

  data.artists.items.forEach(function (i) {
    var artistItem = '<tr><td>' + '<img src=' + i.images[0].url + ' height="200px"></td><td>' + i.name + '</td></tr>';
    $('table').append(artistItem);
>>>>>>> parent of 5aa5147... iteration 3 stable. now attempting bootstrap
  });
}