tinyroutes
==========

A micro, environment agnostic router for js apps inspired by Backbone.Router

Currently developing this to dispatch mobile app urls within Titanium.

Usage:
```javascript
var router = require('./tinyrouter');

var Router = new router({
  routes: {
    'faq': 'faq',
    'product/:id', 'product'
  },
  
  faq: function() {
    // load index content
  },
  
  product: function(id) {
    // load product with id
  }
});
```