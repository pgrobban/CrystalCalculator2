const _ = require('lodash');

describe('treasure row directives', () => {
  it('should create a treasure row with a name and a select box for choosing the level', () => {
    browser.get('http://localhost:3000');
    element(by.binding('vm.treasure.name'));
    element(by.model('vm.treasure.treasureInstance.level'));
  });

  it('should be possible to select the level of the treasure from 0 to +9 and also not having the treasure', (done) => {
    element(by.model('vm.treasure.treasureInstance.level')).all(by.tagName('option')).then((arr) => {
      expect(arr.length).toEqual(11);
      _.forEach(arr, (option) => {
        option.click();
      });
      element(by.cssContainingText('option', 'Don\'t have')).click();
      done();
    });

    //  element(by.model('vm.treasure.treasureInstance.level')).$("[text='Don't have']").click();
    /*
      for (let i = 0; i <= 9; i++) {
        element(by.model('vm.treasure.treasureInstance.level')).$(`[value="number:${i}"]`).click();
      } */
    // levelSelect.getOptions().then((opt) => {
    //  expect(opt.length).toEqual(11);
    // levelSelect.selectByValue(9);

    //  });
  });
});
