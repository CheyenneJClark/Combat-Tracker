'use strict';
//create namespace
var app = app || {}; 

//Initializers
app.combatants = new app.allCombatants();

app.router = new app.Router();
Backbone.history.start();


