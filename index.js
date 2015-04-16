var AudioContext = require('audiocontext');
var AudioSource = require('audiosource');
var context = new AudioContext();
var gainNode = context.createGain();
gainNode.gain.value = 0.5;

var src = new AudioSource(context, {
  gainNode: gainNode,
  url: 'bump.mp3'
});

src.loadSilent();

document.querySelector('.shutup').addEventListener('click', function(ev) {
  if (gainNode.gain.value) {
    gainNode.gain.value = 0;
    ev.target.innerText = 'speak up'
  } else {
    gainNode.gain.value = 0.5;
    ev.target.innerText = 'shut up'
  }
});

[].slice.call(document.querySelectorAll('.demo')).forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    src.play();
  });
});