import React from 'react';
import Header from './Header';

// SpeechSynthesis
const msg = new SpeechSynthesisUtterance();
msg.rate = 0.6;
msg.pitch = 0.8;
let voices = [];
function populateVoices() {
  voices = this.getVoices();
  msg.voice = voices.find(voice => voice.name === 'Google UK English Male');
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);

var Preview = React.createClass({
  onSaveClick: function() {
    var preview = this.props.preview;
    if ((!(preview.name)) || (!(preview.message))) {
      if (!(preview.name)) {
      document.getElementById('name').classList.add('error');
      document.getElementById('name').placeholder = 'Name is required';
      }
      if (!(preview.message)) {
      document.getElementById('message').classList.add('error');
      document.getElementById('message').placeholder = 'Message is required';
      }
    } else {
      document.getElementById('name').classList.remove('error');
      document.getElementById('name').placeholder = 'Name';
      document.getElementById('message').classList.remove('error');
      document.getElementById('message').placeholder = 'Message';
      var newCharacter = {
        name: preview.name,
        head: preview.head || null,
        armsAndTorso: preview.armsAndTorso || null,
        legs: preview.legs || null,
        feet: preview.feet || null,
        message: preview.message
      }
      if (!preview.id) {
        this.props.addCharacter(newCharacter);
      } else {
        var character = this.props.characters['character-' + preview.id];
        character.name = preview.name;
        character.head = preview.head || null;
        character.armsAndTorso = preview.armsAndTorso || null;
        character.legs = preview.legs || null;
        character.feet = preview.feet || null;
        character.message = preview.message;
      }
      this.props.resetPreview();
    }
  },
  onBubbleClick: function() {
    var message = this.props.preview.message;
    if (message) {
      speechSynthesis.cancel();
      msg.text = message;
      speechSynthesis.speak(msg);
    }
  },
  render: function() {
    var w = 200;
    var h = 219; 

    var name = this.props.preview.name;
    var head = this.props.preview.head;
    var armsAndTorso = this.props.preview.armsAndTorso;
    var legs = this.props.preview.legs;
    var feet = this.props.preview.feet;
    var message = this.props.preview.message;

    var headMultiplyY = head ? head.slice(-1) : 0;
    var armsAndTorsoMultiplyY = armsAndTorso ? armsAndTorso.slice(-1) : 0;
    var legsMultiplyY = legs ? legs.slice(-1) : 0;
    var feetMultiplyY = feet ? feet.slice(-1) : 0;

    var headStyle = {
        backgroundPosition: -1 * w + 'px ' + -headMultiplyY * h + 'px'
    }
    var armsAndTorsoStyle = {
        backgroundPosition: -2 * w + 'px ' + -armsAndTorsoMultiplyY * h + 'px'
    }
    var legsStyle = {
        backgroundPosition: -3 * w + 'px ' + -legsMultiplyY * h + 'px'
    }
    var feetStyle = {
        backgroundPosition: -4 * w + 'px ' + -feetMultiplyY * h + 'px'
    }
    return (
      <div className="app-block purple-block">
        <Header tagline="Preview"/>
        <div className="block-body">
          <div>
            <div className="speach-bubble-container">
              <div className="speach-bubble" onClick={this.onBubbleClick}>
                {message}
              </div>
            </div>
            <div className="character-preview-container">
              <div className="character-preview">
                <div className="default-body"></div>
                <div className="head" style={headStyle}></div>
                <div className="arms-and-torso" style={armsAndTorsoStyle}></div>
                <div className="legs" style={legsStyle}></div>
                <div className="feet" style={feetStyle}></div>
              </div>
              <div className="character-name">
                {name}
              </div>
            </div>
            <div className="save-button-container">
              <button type="button" className="save-button" onClick={this.onSaveClick}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  propTypes: {
    characters: React.PropTypes.object.isRequired,
    preview: React.PropTypes.object.isRequired,
    resetPreview: React.PropTypes.func.isRequired,
    addCharacter: React.PropTypes.func.isRequired
  }
});

export default Preview;