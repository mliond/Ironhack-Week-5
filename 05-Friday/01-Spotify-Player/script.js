$('input.search-term').on('input', function(event) {
  event.preventDefault();
  var searchTerm = $('input').val();
  var url = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm;  
  $.get(url, handleTrackSearch);
});

function handleTrackSearch (data) {
  var first_result = data.tracks.items[0];
  changeTrackName(first_result.name);
  changeTrackArtist(first_result.artists[0].name);
  changeTrackPreview(first_result.preview_url);
  searchTrackAlbum(first_result.album.id);
};

function changeTrackName(trackName) {
  $('p.track-name').text(trackName);
};

function changeTrackArtist(trackArtist) {
  $('p.track-artist').text(trackArtist);
};

function changeTrackPreview (trackPreview) {
  $('audio').prop('src', trackPreview);
};

function searchTrackAlbum(trackId) {
  var url = 'https://api.spotify.com/v1/albums/' + trackId;  
  $.get(url, function(data) {
    changeTrackImage(data.images[0].url);
  });
}

function changeTrackImage(trackImage) {
  $('img.cover').prop('src', trackImage)
};

var audio = document.querySelector('audio');

$('.btn-play').on('click', function() {
  if(audio.paused) {
    audio.play();
    $(this).addClass('playing');
  } else {
    audio.pause();
    $(this).removeClass('playing');
  }
});

function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.log('Current time: ' + current);
  $('.seekbar progress').prop('value', current);
}

$('.js-player').on('timeupdate', printTime);
