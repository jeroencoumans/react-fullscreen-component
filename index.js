var screenfull = require('screenfull');

var FullScreenMixin = {

  getInitialState: function() {
    return {
      hasFullScreen: false
    };
  },

  componentDidMount: function () {
    var enabled = screenfull.enabled;

    if (enabled) {
      document.addEventListener(screenfull.raw.fullscreenchange, this.onChangeFullScreen);

      this.setState({
        hasFullScreen: enabled
      });
    }
  },

  requestFullScreen: function (ref) {
    if (ref && ref.getDOMNode) {
      var elem = ref.getDOMNode();
      screenfull.request(elem);
    } else {
      screenfull.request();
    }
  },

  exitFullScreen: function () {
    screenfull.exit();
  },

  onChangeFullScreen: function (e) {
    var isFullscreen = screenfull.isFullscreen;
    this.setState({
      isFullscreen: isFullscreen,
      fullScreenElement: screenfull.element
    });

    if (isFullscreen) {
      typeof this.onEnterFullScreen === 'function' && this.onEnterFullScreen(e);
    } else {
      typeof this.onExitFullScreen === 'function' && this.onExitFullScreen(e);
    }
  }
};

module.exports = FullScreenMixin;
