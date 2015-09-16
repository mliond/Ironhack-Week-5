var vid = document.querySelector('video');

$('button#play').on('click', function() {
  vid.play();
})

$('button#pause').on('click', function() {
  vid.pause();
})

$('button#beginning').on('click', function() {
  vid.currentTime = 0;
})

$('button#loop').on('click', function() {
  $('video').prop('loop', !$('video').prop('loop')) // this toggles the 'loop' property
})

$('button#excerpt').on('click', function() {
  $('video').prop('src', 'Military_Boat.mp4#t=6,12');
  vid.play();
})