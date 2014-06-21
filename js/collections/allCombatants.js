var app = app || {};

app.allCombatants = Backbone.Collection.extend({
    model: app.singleCombatant,
    localStorage: new Store("backbone-party")
});