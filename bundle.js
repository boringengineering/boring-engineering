(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/meandave/Code/boring-engineering/index.js":[function(require,module,exports){
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
},{"audiocontext":"/home/meandave/Code/boring-engineering/node_modules/audiocontext/src/audiocontext.js","audiosource":"/home/meandave/Code/boring-engineering/node_modules/audiosource/index.js"}],"/home/meandave/Code/boring-engineering/node_modules/audiocontext/src/audiocontext.js":[function(require,module,exports){
/*
 * Web Audio API AudioContext shim
 */
(function (definition) {
    if (typeof exports === "object") {
        module.exports = definition();
    }
})(function () {
  return window.AudioContext || window.webkitAudioContext;
});

},{}],"/home/meandave/Code/boring-engineering/node_modules/audiosource/index.js":[function(require,module,exports){
/*
 * AudioSource
 *
 * * MUST pass an audio context
 *
 */
function AudioSource (context, opts) {
  if (!context) {
    throw new Error('You must pass an audio context to use this module');
  }
  if (opts === undefined) opts = {};

  this.context = context;
  this.buffer = undefined;
  this.url = opts.url ? opts.url : undefined;
  this.ffts = opts.ffts ? opts.ffts : [];
  this.gainNode = opts.gainNode ? opts.gainNode : undefined;
}

AudioSource.prototype = {
  needBuffer: function() {
    return this.buffer === undefined;
  },
  loadSound: function(url, cb) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    var self = this;
    req.onloadend = function() {
      self.decode.call(self, req.response, cb);
    };
    req.send();
  },
  getBuffer: function(cb) {
    if (!this.needBuffer()) return;
    var self = this;
    this.loadSound(this.url, function(data) {
      self.onLoaded.call(self, data, true);
    });
  },
  getSource: function(cb) {
    if (this.source) {
      cb(this.source);
    } else {
      var self = this;
      this.disconnect();
      this.loadSound(this.url, function(data) {
        this.source = self.createSource.call(self, data, true);
        cb(this.source);
      });
    }
  },

  onLoaded: function(source, silent) {
    this.buffer = source;
    this.disconnect();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.ffts.forEach(function(fft) {
      this.gainNode.connect(fft.input);
    }, this);
    this.gainNode.connect(this.context.destination);
    this.ffts.forEach(function(fft) {
      fft.connect(this.context.destination);
    }, this);
    if (!silent) this.playSound();
  },
  disconnect: function() {
    if (this.source) {
      this.source.disconnect(this.context.destination);
    }
  },
  playSound: function() {
    if (this.playTime) {
      this.source.start(0, this.offset);
    }

    this.playTime = this.context.currentTime;
  },
  loadSilent: function() {
    if (!this.needBuffer()) return;
    var self = this;
    this.loadSound(this.url, function(data) {
      self.onLoaded.call(self, data, true);
    });
  },
  play: function(starttime, offset) {
    this.playTime = starttime ? starttime : this.context.currentTime;
    this.offset = offset ? offset : 0;

    if (this.needBuffer()) {
      var self = this;
      this.loadSound(this.url, function(data) {
        self.onLoaded.call(self, data);
      });
    } else {
      this.onLoaded(this.buffer);
    }
  },
  stop: function() {
    this.source.stop(this.context.currentTime);
  },
  decode: function(data, success, error) {
    this.context.decodeAudioData(data, success, error);
  }
};

module.exports = AudioSource;

},{}]},{},["/home/meandave/Code/boring-engineering/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvbWVhbmRhdmUvQ29kZS9ib3JpbmctZW5naW5lZXJpbmcvaW5kZXguanMiLCIvaG9tZS9tZWFuZGF2ZS9Db2RlL2JvcmluZy1lbmdpbmVlcmluZy9ub2RlX21vZHVsZXMvYXVkaW9jb250ZXh0L3NyYy9hdWRpb2NvbnRleHQuanMiLCIvaG9tZS9tZWFuZGF2ZS9Db2RlL2JvcmluZy1lbmdpbmVlcmluZy9ub2RlX21vZHVsZXMvYXVkaW9zb3VyY2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEF1ZGlvQ29udGV4dCA9IHJlcXVpcmUoJ2F1ZGlvY29udGV4dCcpO1xudmFyIEF1ZGlvU291cmNlID0gcmVxdWlyZSgnYXVkaW9zb3VyY2UnKTtcbnZhciBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xudmFyIGdhaW5Ob2RlID0gY29udGV4dC5jcmVhdGVHYWluKCk7XG5nYWluTm9kZS5nYWluLnZhbHVlID0gMC41O1xuXG52YXIgdXJscyA9IFsnYnVtcC5tcDMnLCAnODgud2F2JywgJ2ltcGFjdC53YXYnLCAnbG93Lm1wMycsICdoYXJwLm9nZyddO1xuXG52YXIgc3JjcyA9IHVybHMubWFwKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgIHZhciBzcmMgPSBuZXcgQXVkaW9Tb3VyY2UoY29udGV4dCwge1xuICAgICAgICAgICAgICAgZ2Fpbk5vZGU6IGdhaW5Ob2RlLFxuICAgICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIHNyYy5sb2FkU2lsZW50KCk7XG4gICAgICAgICAgICAgcmV0dXJuIHNyYztcbiAgICAgICAgICAgfSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaHV0dXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gIGlmIChnYWluTm9kZS5nYWluLnZhbHVlKSB7XG4gICAgZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgZXYudGFyZ2V0LmlubmVyVGV4dCA9ICdzcGVhayB1cCdcbiAgfSBlbHNlIHtcbiAgICBnYWluTm9kZS5nYWluLnZhbHVlID0gMC41O1xuICAgIGV2LnRhcmdldC5pbm5lclRleHQgPSAnc2h1dCB1cCdcbiAgfVxufSk7XG5cbltdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbW8nKSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXYpIHtcbiAgICBzcmNzW3BhcnNlSW50KGV2LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkeCcpLCAxMCkgLSAxXS5wbGF5KCk7XG4gIH0pO1xufSk7IiwiLypcbiAqIFdlYiBBdWRpbyBBUEkgQXVkaW9Db250ZXh0IHNoaW1cbiAqL1xuKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICAgIH1cbn0pKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbn0pO1xuIiwiLypcbiAqIEF1ZGlvU291cmNlXG4gKlxuICogKiBNVVNUIHBhc3MgYW4gYXVkaW8gY29udGV4dFxuICpcbiAqL1xuZnVuY3Rpb24gQXVkaW9Tb3VyY2UgKGNvbnRleHQsIG9wdHMpIHtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGF1ZGlvIGNvbnRleHQgdG8gdXNlIHRoaXMgbW9kdWxlJyk7XG4gIH1cbiAgaWYgKG9wdHMgPT09IHVuZGVmaW5lZCkgb3B0cyA9IHt9O1xuXG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuYnVmZmVyID0gdW5kZWZpbmVkO1xuICB0aGlzLnVybCA9IG9wdHMudXJsID8gb3B0cy51cmwgOiB1bmRlZmluZWQ7XG4gIHRoaXMuZmZ0cyA9IG9wdHMuZmZ0cyA/IG9wdHMuZmZ0cyA6IFtdO1xuICB0aGlzLmdhaW5Ob2RlID0gb3B0cy5nYWluTm9kZSA/IG9wdHMuZ2Fpbk5vZGUgOiB1bmRlZmluZWQ7XG59XG5cbkF1ZGlvU291cmNlLnByb3RvdHlwZSA9IHtcbiAgbmVlZEJ1ZmZlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyID09PSB1bmRlZmluZWQ7XG4gIH0sXG4gIGxvYWRTb3VuZDogZnVuY3Rpb24odXJsLCBjYikge1xuICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICByZXEucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmVxLm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5kZWNvZGUuY2FsbChzZWxmLCByZXEucmVzcG9uc2UsIGNiKTtcbiAgICB9O1xuICAgIHJlcS5zZW5kKCk7XG4gIH0sXG4gIGdldEJ1ZmZlcjogZnVuY3Rpb24oY2IpIHtcbiAgICBpZiAoIXRoaXMubmVlZEJ1ZmZlcigpKSByZXR1cm47XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubG9hZFNvdW5kKHRoaXMudXJsLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBzZWxmLm9uTG9hZGVkLmNhbGwoc2VsZiwgZGF0YSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFNvdXJjZTogZnVuY3Rpb24oY2IpIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIGNiKHRoaXMuc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLmxvYWRTb3VuZCh0aGlzLnVybCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNlbGYuY3JlYXRlU291cmNlLmNhbGwoc2VsZiwgZGF0YSwgdHJ1ZSk7XG4gICAgICAgIGNiKHRoaXMuc291cmNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBvbkxvYWRlZDogZnVuY3Rpb24oc291cmNlLCBzaWxlbnQpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IHNvdXJjZTtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICB0aGlzLnNvdXJjZS5idWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIHRoaXMuZmZ0cy5mb3JFYWNoKGZ1bmN0aW9uKGZmdCkge1xuICAgICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KGZmdC5pbnB1dCk7XG4gICAgfSwgdGhpcyk7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgdGhpcy5mZnRzLmZvckVhY2goZnVuY3Rpb24oZmZ0KSB7XG4gICAgICBmZnQuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIH0sIHRoaXMpO1xuICAgIGlmICghc2lsZW50KSB0aGlzLnBsYXlTb3VuZCgpO1xuICB9LFxuICBkaXNjb25uZWN0OiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuc291cmNlLmRpc2Nvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB9XG4gIH0sXG4gIHBsYXlTb3VuZDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucGxheVRpbWUpIHtcbiAgICAgIHRoaXMuc291cmNlLnN0YXJ0KDAsIHRoaXMub2Zmc2V0KTtcbiAgICB9XG5cbiAgICB0aGlzLnBsYXlUaW1lID0gdGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lO1xuICB9LFxuICBsb2FkU2lsZW50OiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMubmVlZEJ1ZmZlcigpKSByZXR1cm47XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubG9hZFNvdW5kKHRoaXMudXJsLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBzZWxmLm9uTG9hZGVkLmNhbGwoc2VsZiwgZGF0YSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH0sXG4gIHBsYXk6IGZ1bmN0aW9uKHN0YXJ0dGltZSwgb2Zmc2V0KSB7XG4gICAgdGhpcy5wbGF5VGltZSA9IHN0YXJ0dGltZSA/IHN0YXJ0dGltZSA6IHRoaXMuY29udGV4dC5jdXJyZW50VGltZTtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldCA/IG9mZnNldCA6IDA7XG5cbiAgICBpZiAodGhpcy5uZWVkQnVmZmVyKCkpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMubG9hZFNvdW5kKHRoaXMudXJsLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHNlbGYub25Mb2FkZWQuY2FsbChzZWxmLCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uTG9hZGVkKHRoaXMuYnVmZmVyKTtcbiAgICB9XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc291cmNlLnN0b3AodGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lKTtcbiAgfSxcbiAgZGVjb2RlOiBmdW5jdGlvbihkYXRhLCBzdWNjZXNzLCBlcnJvcikge1xuICAgIHRoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoZGF0YSwgc3VjY2VzcywgZXJyb3IpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvU291cmNlO1xuIl19
