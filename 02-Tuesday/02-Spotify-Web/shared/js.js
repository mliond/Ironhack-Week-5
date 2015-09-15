$('form').on('submit', spotRequest);

function spotRequest(event) {
  event.preventDefault();
  var Searchterm = $('input.artist').val();
  console.log(Searchterm);
  $.get('https://api.spotify.com/v1/search?q=' + Searchterm + '&type=Artist', handleRequest)
}

function handleRequest(data) {
  console.log(data);
  $('table').text('');

  data.artists.items.forEach(function (i) {
    var artistItem = '<tr><td>' + '<img src=' + i.images[0].url + ' height="200px"></td><td>' + i.name + '</td></tr>';
    $('table').append(artistItem);
  });
}