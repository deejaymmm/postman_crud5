const noteRoutes = require('./routes');
module.exports = function(app, client) {
  noteRoutes(app, client); 
};