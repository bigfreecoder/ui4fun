var React =require('react');

var Html = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>Demo</title>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
        <body>
          <div>{this.props.children}</div>
          <script src="http://localhost:3000/dist/reactkits.js" />
          <script src="http://localhost:3000/dist/default/bundle.js" />
        </body>
      </html>
    );
  }
});

module.exports = Html;
