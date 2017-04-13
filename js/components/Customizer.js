import React from 'react';
import Header from './Header';

// Close select box
document.onclick = myClickHandler;
function myClickHandler(e) {
  if (!(e.target.dataset.protected)) {
    const selectBoxes = document.querySelectorAll('.drop-menu');
    for (let index=0; index < selectBoxes.length; index++) {
      selectBoxes[index].classList.remove('active');
    }
  }
}

var Customizer = React.createClass({
  componentDidMount: function() {
    const selectBoxesAndChildren = document.querySelectorAll('.drop-menu, .drop-menu *');
    for (let index=0; index < selectBoxesAndChildren.length; index++) {
      selectBoxesAndChildren[index].setAttribute('data-protected', 1);
    }
  },
  handleCharacter: function(e) {
    const el = e.currentTarget;
    var key = el.dataset.key;
    var value = el.dataset.value;
    this.props.updatePreview(key, value);
  },
  handleItemHover: function(e) {
    const el = e.currentTarget;
    const activeSelectBox = document.querySelector('.drop-menu.active');
    activeSelectBox.querySelector('span').textContent = el.textContent;
    activeSelectBox.querySelector('input').setAttribute('value', el.dataset.value);
  },
  handleSelectBox: function(e) {
    const el = e.currentTarget;
    const activeSelectBox = document.querySelector('.drop-menu.active');
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    } else {
      if (activeSelectBox) {
        activeSelectBox.classList.remove('active');
      }
      el.classList.add('active');
    }
    if (el.classList.contains('active')) {
      const menuItems = el.querySelectorAll('.drop-down li');
      menuItems.forEach(menuItem => menuItem.addEventListener('mouseover', this.handleItemHover));
    }
  },
  render: function() {
    var linkState = this.props.linkState;
    return (
      <div className="app-block blue-block">
        <Header tagline="Customizer"/>
        <div className="block-body">
          <form id="character-form">
            <div className="form-element-container">
              <input type="text" id="name" placeholder="Name" autoComplete="off" valueLink={linkState('preview.name')}/>
            </div>
            <div className="form-element-container">
                <div className="drop-menu" onClick={this.handleSelectBox}>
                  <div className="select">
                    <span id="head-selected" data-default="Head">Head</span>
                    <i className="chevron-down"></i>
                  </div>
                  <input type="hidden"/>
                  <ul className="drop-down">
                    <li data-key="head" data-value="head-1" onMouseOver={this.handleCharacter}>David Hasselhoff</li>
                    <li data-key="head" data-value="head-2" onMouseOver={this.handleCharacter}>Chuck Norris</li>
                    <li data-key="head" data-value="head-3" onMouseOver={this.handleCharacter}>Gerard Butler</li>
                    <li data-key="head" data-value="head-4" onMouseOver={this.handleCharacter}>Sylvester Stallone</li>
                  </ul>
                </div>
            </div>
            <div className="form-element-container">
                <div className="drop-menu" onClick={this.handleSelectBox}>
                  <div className="select">
                    <span id="arms-and-torso-selected" data-default="Arms &amp; torso">Arms &amp; torso</span>
                    <i className="chevron-down"></i>
                  </div>
                  <input type="hidden"/>
                  <ul className="drop-down">
                    <li data-key="armsAndTorso" data-value="arms-and-torso-1" onMouseOver={this.handleCharacter}>Glam tank top</li>
                    <li data-key="armsAndTorso" data-value="arms-and-torso-2" onMouseOver={this.handleCharacter}>Invaders t-shirt</li>
                    <li data-key="armsAndTorso" data-value="arms-and-torso-3" onMouseOver={this.handleCharacter}>Ranger jacket</li>
                    <li data-key="armsAndTorso" data-value="arms-and-torso-4" onMouseOver={this.handleCharacter}>Jersey</li>
                    <li data-key="armsAndTorso" data-value="arms-and-torso-5" onMouseOver={this.handleCharacter}>Robe</li>
                  </ul>
                </div>
            </div>
            <div className="form-element-container">
                <div className="drop-menu" onClick={this.handleSelectBox}>
                  <div className="select">
                    <span id="legs-selected" data-default="Legs">Legs</span>
                    <i className="chevron-down"></i>
                  </div>
                  <input type="hidden"/>
                  <ul className="drop-down">
                    <li data-key="legs" data-value="legs-1" onMouseOver={this.handleCharacter}>Glam pants</li>
                    <li data-key="legs" data-value="legs-2" onMouseOver={this.handleCharacter}>Pocket pants</li>
                    <li data-key="legs" data-value="legs-3" onMouseOver={this.handleCharacter}>Ranger pants</li>
                    <li data-key="legs" data-value="legs-4" onMouseOver={this.handleCharacter}>Shorts</li>
                  </ul>
                </div>
            </div>
            <div className="form-element-container">
                <div className="drop-menu" onClick={this.handleSelectBox}>
                  <div className="select">
                    <span id="feet-selected" data-default="Feet">Feet</span>
                    <i className="chevron-down"></i>
                  </div>
                  <input type="hidden"/>
                  <ul className="drop-down">
                    <li data-key="feet" data-value="feet-1" onMouseOver={this.handleCharacter}>Dr. Martens</li>
                    <li data-key="feet" data-value="feet-2"onMouseOver={this.handleCharacter}>All Stars</li>
                    <li data-key="feet" data-value="feet-3"onMouseOver={this.handleCharacter}>CAT</li>
                    <li data-key="feet" data-value="feet-4"onMouseOver={this.handleCharacter}>Feet 4</li>
                    <li data-key="feet" data-value="feet-5"onMouseOver={this.handleCharacter}>Slippers</li>
                  </ul>
                </div>
            </div>
            <div className="form-element-container">
              <textarea maxLength="36" id="message" placeholder="Message" autoComplete="off" valueLink={linkState('preview.message')}></textarea>
            </div>
          </form>
        </div>
      </div>
    )
  },
  propTypes: {
    linkState: React.PropTypes.func.isRequired,
    updatePreview: React.PropTypes.func.isRequired
  }
});

export default Customizer;