import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('drop-zone', 'Unit | Component | drop zone', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('that is being initialized', function(assert) {
  let component = this.subject();
  this.render();
  Ember.run(() => {
    assert.ok(component.myDropzone);
  });
});

test('that options are being assigned properly', function(assert){
  let component = this.subject();

  let urlArr = ['#', 'http://example.com/example', '/here/inside'];
  component.set('url', urlArr[Math.floor(Math.random() * urlArr.length)]);

  let methodArr = ['POST', 'GET'];
  component.set('method', methodArr[Math.floor(Math.random() * methodArr.length)]);

  component.set('parallelUploads', Math.floor(Math.random() * 16));  

  component.set('maxFilesize', Math.floor(Math.random() * 10000));

  this.render();

  Ember.run(() => {
    let dropOption = component.myDropzone.options;

    assert.equal(component.url, dropOption.url);
    assert.equal(component.method, dropOption.method);
    assert.equal(component.parallelUploads, dropOption.parallelUploads);
    assert.equal(component.maxFilesize, dropOption.maxFilesize);
  });
});