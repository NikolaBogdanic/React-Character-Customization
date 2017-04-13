import React from 'react';

var Header = React.createClass({
  render: function() {
    return (
      <div className="block-header">
        <h2>{this.props.tagline}</h2>
      </div>
    ) 
  },
  propTypes: {
    tagline: React.PropTypes.string.isRequired
  }
});

export default Header;