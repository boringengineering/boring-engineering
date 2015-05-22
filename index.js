var AudioContext = require('audiocontext');
var AudioSource = require('audiosource');
var context = new AudioContext();
var gainNode = context.createGain();
gainNode.gain.value = 0.5;

var urls = ['bump.mp3', '88.wav', 'impact.wav', 'low.mp3', 'harp.ogg'];

var srcs = urls.map(function(url) {
             var src = new AudioSource(context, {
               gainNode: gainNode,
               url: url
             })
             src.loadSilent();
             return src;
           });

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
  el.addEventListener('mouseenter', function(ev) {
    srcs[parseInt(ev.target.getAttribute('idx'), 10) - 1].play();
  });
});