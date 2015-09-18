function changeTrackName(trackName) {
  $('p.track-name').text(trackName);
};

function changeTrackArtist(trackArtist) {
  var html = '<a href="#" class="artist-modal" data_hook=' + trackArtist.id + ' >' + trackArtist.name + '</a>'
  $('p.track-artist').html(html);
  $('.media-body h4').text(trackArtist.name);
};

function changeTrackPreview (trackPreview) {
  $('audio').prop('src', trackPreview);
};

function searchTrackAlbum(trackId) {
  var url = 'https://api.spotify.com/v1/albums/' + trackId;  
  $.get(url, function(album) {
    changeTrackImage(album);
  });
}

function changeTrackImage(album) {
  var cover = album.images[0].url
  $('img.cover').prop('src', cover);
  $('.media-left img').prop('src', cover);
};

function handleTrackSearch (data) {
  var first_result = data.tracks.items[0];
  changeTrackName(first_result.name);
  changeTrackArtist(first_result.artists[0]);
  changeTrackPreview(first_result.preview_url);
  searchTrackAlbum(first_result.album.id);
};

$('input.search-term').on('input', function(event) {
  event.preventDefault();
  var searchTerm = $('input').val();
  var url = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm;  
  $.get(url, handleTrackSearch);
});

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