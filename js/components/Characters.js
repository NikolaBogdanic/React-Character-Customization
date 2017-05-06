import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Header from './Header';

var Characters = React.createClass({
  onCreateClick : function() {
    this.props.resetPreview();
    this.props.startApp();
  },
  renderCharacterRow : function(key) {
    var character = this.props.characters[key];
    var linkState = this.props.linkState;
    var head = character.head || 'default-head';
    var avatar = head.replace('head', 'avatar');
    var avatarStyle = {
        backgroundImage: 'url(/build/img/' + avatar + '.png)'
    }
    return (
      <div className="character-row" key={key}>
        <div className="avatar" style={avatarStyle}></div>
        <div className="character-details">
          <div className="character-name">
              {character.name}
          </div>
          <div className="actions">
            <i className="edit" onClick={this.props.editCharacter.bind(null, key)}></i>
            <i className="delete" onClick={this.props.deleteCharacter.bind(null, key)}></i>
            <i className="play" onClick={this.props.playMessage.bind(null, key)}></i>
          </div>
        </div>
      </div>
    )
  },
  render: function() {
    return (
      <div className="app-block purple-block">
        <Header tagline="Characters"/>
        <div className="block-body">
          <div className="create-new-button-container">
            <button type="button" className="create-new-button" onClick={this.onCreateClick}>Create new</button>
          </div>
          <CSSTransitionGroup 
            className="character-rows"
            component="div"
            transitionName="character-rows"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={100}
          >
            {Object.keys(this.props.characters).map(this.renderCharacterRow)}
          </CSSTransitionGroup>
        </div>
      </div>
    )
  },
  propTypes: {
    characters: React.PropTypes.object.isRequired,
    resetPreview: React.PropTypes.func.isRequired,
    startApp: React.PropTypes.func.isRequired,
    editCharacter: React.PropTypes.func.isRequired,
    deleteCharacter: React.PropTypes.func.isRequired,
    playMessage: React.PropTypes.func.isRequired
  }
});

export default Characters;
