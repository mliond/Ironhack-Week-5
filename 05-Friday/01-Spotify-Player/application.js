$('input.search-term').on('input', function(event) {
  event.preventDefault();
  var searchTerm = $('input').val();
  var my_player = new Player(searchTerm);
  my_player.searchTrack();
});

var Player = function (searchTerm) {
  this.searchTerm = searchTerm;
  this.url = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm;
};

_changeTrackName = function (trackName) {
  $('p.track-name').text(trackName);
}

_changeTrackArtist = function(trackArtist) {
  var html = '<a href="#" class="artist-modal" data_hook=' + trackArtist.id + ' >' + trackArtist.name + '</a>'
  $('p.track-artist').html(html);
  $('.media-body h4').text(trackArtist.name);
};

_changeTrackPreview = function (trackPreview) {
  $('audio').prop('src', trackPreview);
};

_searchTrackAlbum = function(trackId) {
  var url = 'https://api.spotify.com/v1/albums/' + trackId;  
  $.get(url, function(album) {
    _changeTrackImage(album);
  });
}

_changeTrackImage = function(album) {
  var cover = album.images[0].url
  $('img.cover').prop('src', cover);
  $('.media-left img').prop('src', cover);
};

_handleTrackSearch = function (data) {
  var first_result = data.tracks.items[0];
  _changeTrackName(first_result.name);
  _changeTrackArtist(first_result.artists[0]);
  _changeTrackPreview(first_result.preview_url);
  _searchTrackAlbum(first_result.album.id);
};

Player.prototype.searchTrack = function () {
  $.get(this.url, _handleTrackSearch);
}

$('.btn-play').on('click', function() {
  var audio = document.querySelector('audio');
  if(audio.paused) {
    audio.play();
    $(this).addClass('playing');
  } else {
    audio.pause();
    $(this).removeClass('playing');
  }
});

$('.js-player').on('timeupdate', function() {
  var current = $('.js-player').prop('currentTime');
  $('.seekbar progress').prop('value', current);
});

$('p.track-artist').on('click', 'a.artist-modal', function() {
  $('.js-modal').modal();
});