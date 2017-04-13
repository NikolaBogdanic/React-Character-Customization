import React from 'react';
import Catalyst from 'react-catalyst';
import Characters from './Characters';
import Customizer from './Customizer';
import Preview from './Preview';

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

var App = React.createClass({
  mixins : [Catalyst.LinkedStateMixin],
  getInitialState: function() {
    return {
      characters: {},
      preview: {},
      started : false
    }
  },
  componentDidMount: function() {
    var localStorageRef = localStorage.getItem('savedCharacters');

    if (localStorageRef) {
      // update state to reflect what is in localStorage
      this.setState({
        characters: JSON.parse(localStorageRef)
      });
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    localStorage.setItem('savedCharacters', JSON.stringify(nextState.characters));
  },
  startApp: function() {
    this.state.started = true;
    this.setState({ started : this.state.started });
  },

  updatePreview : function(key,value) {
    this.state.preview[key] = value;
    this.setState({ preview : this.state.preview });
  },
  resetPreview : function() {
    if (this.state.started) {
      //reset inputs & textarea
      const inputs = document.querySelectorAll('#character-form input');
      inputs.forEach(input => input.value = '');
      document.querySelector('#character-form textarea').value = '';
      //reset select spans
      const selects = document.querySelectorAll('.select');
      selects.forEach(select => {
          const selectDefault = select.querySelector('span').dataset.default;
          select.querySelector('span').textContent = selectDefault;
        }
      );
      //reset error inputs
      document.getElementById('name').classList.remove('error');
      document.getElementById('name').placeholder = 'Name';
      document.getElementById('message').classList.remove('error');
      document.getElementById('message').placeholder = 'Message';
    }
    this.state.preview = {};
    this.setState({ preview : this.state.preview });
  },
  addCharacter: function(character) {
    var timestamp = (new Date()).getTime();

    this.state.characters['character-' + timestamp] = character;
    this.state.characters['character-' + timestamp].id = timestamp;
    this.state.preview.id = timestamp;

    this.setState({ characters : this.state.characters,  preview : this.state.preview });
  },
  editCharacter: function(key) {
      var preview = this.state.preview;
      var character = this.state.characters[key];

      //populate select spans
      const headSelected = document.getElementById('head-selected');
      const armsAndTorsoSelected = document.getElementById('arms-and-torso-selected');
      const legsSelected = document.getElementById('legs-selected');
      const feetSelected = document.getElementById('feet-selected');

      const headContent = (character.head ? document.querySelector('[data-value="'+ character.head +'"]').textContent : null);
      const armsAndTorsoContent = (character.armsAndTorso ? document.querySelector('[data-value="'+ character.armsAndTorso +'"]').textContent : null);
      const legsContent = (character.legs ? document.querySelector('[data-value="'+ character.legs +'"]').textContent : null);
      const feetContent = (character.feet ? document.querySelector('[data-value="'+ character.feet +'"]').textContent : null);

      headSelected.textContent = headContent || headSelected.dataset.default;
      armsAndTorsoSelected.textContent = armsAndTorsoContent || armsAndTorsoSelected.dataset.default;
      legsSelected.textContent = legsContent || legsSelected.dataset.default;
      feetSelected.textContent = feetContent || feetSelected.dataset.default;

      preview.id = character.id || null;
      preview.name = character.name || null;
      preview.head = character.head || null;
      preview.armsAndTorso = character.armsAndTorso || null;
      preview.legs = character.legs || null;
      preview.feet = character.feet || null;
      preview.message = character.message || null;
      this.setState({ preview : this.state.preview });

      this.state.started = true;
      this.setState({ started : this.state.started });
  },
  deleteCharacter : function(key) {
    if (this.state.characters[key].id === this.state.preview.id) {
      this.resetPreview();
    }
    if (Object.keys(this.state.characters).length === 1) {
      this.resetPreview();
      this.state.started = false;
    }
    delete this.state.characters[key];
    this.setState({ characters : this.state.characters, started : this.state.started });
  },
  playMessage : function(key) {
    speechSynthesis.cancel();
    msg.text = this.state.characters[key].message;
    speechSynthesis.speak(msg);
  },
  render : function() {
    return (
      <div className="app-container">
        {this.state.started &&
          <div>
            <Characters characters={this.state.characters} resetPreview={this.resetPreview} startApp={this.startApp} editCharacter={this.editCharacter} deleteCharacter={this.deleteCharacter} playMessage={this.playMessage}/>
            <Customizer linkState={this.linkState} updatePreview={this.updatePreview}/>
            <Preview characters={this.state.characters} preview={this.state.preview} resetPreview={this.resetPreview} addCharacter={this.addCharacter}/>
          </div>
        }
        {!this.state.started &&
          <div className="start-screen">
            <div className="start-app-button-container">
              <button type="button" className="start-app-button" onClick={this.startApp}>Start</button>
            </div>
          </div>
        }
      </div>
    )
  }
});

export default App;