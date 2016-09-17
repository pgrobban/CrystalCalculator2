const SelectWrapper = require('./select_wrapper');
const should = require('should');

describe('treasure row directives', () => {
  it('should create a treasure row with a name and a select box for choosing the level', () => {
    browser.get('http://localhost:3000');
    should.exist(element.all(by.binding('vm.treasure.name')).first());
    should.exist(element.all(by.model('vm.treasure.treasureInstance.level')).first());
  });
});
