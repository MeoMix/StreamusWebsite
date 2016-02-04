// Give Handlebars additional functionality in the form of helper methods.
import Handlebars from 'handlebars/handlebars.runtime';

// Provide handlebars with the ability to look up a model's attributes from within a template.
Handlebars.registerHelper('get', (model, attribute) => {
  return model.get(attribute);
});

Handlebars.registerHelper('ternary', (test, yes, no) => {
  return test ? yes : no;
});