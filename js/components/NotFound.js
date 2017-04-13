import React from 'react';

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="app-container">
        <div className="not-found-screen">
        	<p className="not-found-message">Ooops, nothing to see here</p>
		</div>
      </div>
    ) 
  }
});

export default NotFound;