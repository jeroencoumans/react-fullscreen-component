/** @jsx React.DOM */
var React = require('react');
var FullscreenMixin = require('./index');

if (typeof window !== undefined) {
  window.React = React;
}

var MyComponent = React.createClass({
  mixins: [FullscreenMixin],
  getInitialState: function () {
    return {
      hasIframe: false
    }
  },
  toggleFullscreen: function (e, ref) {
    e.preventDefault();

    this.state.isFullscreen ? this.exitFullscreen() : this.requestFullscreen(ref ? ref : this.refs.container);
  },
  onEnterFullscreen: function (e) {
    console.log('Entered fullscreen', e);
  },
  onExitFullscreen: function (e) {
    console.log('Exited fullscreen', e);
    if (this.state.hasIframe) {
      this.setState({ hasIframe: false });
      document.body.style.overflow = 'auto';
    }
  },
  handleRequest: function () {
    this.requestFullscreen(this.refs.container);
  },
  handleImg: function (e) {
    this.toggleFullscreen(e, this.refs.demoImg);
  },
  handleVideo: function (e) {
    this.toggleFullscreen(e, this.refs.demoVideo);
  },
  handleIframe: function (e) {
    if (this.state.isFullscreen) {
      this.setState({ hasIframe: true });
      document.body.style.overflow = 'hidden';
    }
  },
  renderIframe: function () {
    var style = {
      'position': 'absolute',
      'top:': 0,
      'left': 0,
      'bottom': 0,
      'right': 0,
      'width': '100%',
      'height': '100%',
      'display': this.state.hasIframe ? 'block' : 'none'
    }

    return this.state.hasIframe ? (
      <iframe frameBorder='no' id='external-iframe' style={style} src='http://bbc.com' />
    ) : null
  },
  render: function () {
    var hasFullscreen = this.state.hasFullscreen;
    var fullScreenElement = this.state.fullScreenElement;

    return (
      <section id='container' className='container' ref='container'>
        <header>
          <h1>React mixin for screenfull<span>.js</span></h1>
          <p>Simple wrapper for cross-browser usage of the JavaScript <a href='https://developer.mozilla.org/en/DOM/Using_full-screen_mode'>Fullscreen API</a>, which lets you bring the page or any element into fullscreen. Smoothens out the browser implementation differences, so you don't have too.</p>
          <p>This page is shamelessly stolen from <a href='http://sindresorhus.com/screenfull.js/'>screenfull.js</a>, modified to use the React mixin.</p>
        </header>
        <hr />
        <section>
          <p>Try out the Fullscreen API</p>
          <button id='request' onClick={this.handleRequest}>Request</button>
          <button id='exit' onClick={this.exitFullscreen}>Exit</button>
          <button id='toggle' onClick={this.toggleFullscreen}>Toggle</button>
          <button id='request2' onClick={this.requestFullscreen}>Request document</button>
        </section>
        <section>
          <ul>
            <li id='supported'>Supported/allowed: {this.state.hasFullscreen ? 'true' : 'false'}</li>
            <li id='status'>Is fullscreen: {this.state.isFullscreen ? 'true' : 'false'}</li>
            <li id='element'>Element: {fullScreenElement ? fullScreenElement.localName + (fullScreenElement.id ? '#' + fullScreenElement.id : '') : ''}</li>
          </ul>
        </section>
        <input autofocus placeholder='Keyboard test' />
        <hr />
        <section>
          <p>How to open external pages while in fullscreen</p>
          <button id='iframe' onClick={this.handleIframe}>Click when in fullscreen</button>
        </section>
        <hr />
        <section>
          <p>Click the image to make it fullscreen</p>
          <img width='500' height='206' id='demo-img' ref='demoImg' onClick={this.handleImg} src='http://sindresorhus.com/img/slideshow/4.jpg' />
        </section>
        <hr />
        <section>
          <p>Click the video to make it fullscreen</p>
          <video id='demo-video' ref='demoVideo' onClick={this.handleVideo} width='500' height='281' poster='http://wroug.com/stuff/host/demo-video/poster-500px.jpg' controls>
            <source src='http://wroug.com/stuff/host/demo-video/midnight_sun_sv1_720p.mp4' />
            <source src='http://wroug.com/stuff/host/demo-video/midnight_sun_sv1_720p.webm' />
          </video>
          <small>Press Esc to exit</small>
          <p><small>Video by <a href='http://scientifantastic.com'>Joe Capra</a></small></p>
        </section>
        {this.renderIframe()}
      </section>
    )
  }
});

React.renderComponent(
  <MyComponent />,
  document.getElementById('content')
);