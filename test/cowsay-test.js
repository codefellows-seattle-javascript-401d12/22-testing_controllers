'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
      this.navCtrl = new $controller('NavController');
    });
  });

  describe('initial properties', () => {
    it('title property should equal Welcome to Cowville!', () => {
      expect(this.cowsayCtrl.title).toBe('Welcome to Cowville!');
    });

    it('history property should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

    it('list of cowfiles should show proper cowfiles', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.current).toEqual(list[0]);
      });
    });
  });

  describe('#update', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      let result = this.cowsayCtrl.update('testing');
      expect(result).toEqual(expected);
    });
  });

  describe('#speak', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });

  describe('#undo', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      this.cowsayCtrl.speak('testing again');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });
  describe('#routes', () => {
    it('should redirect to a new page', () => {
      expect(Array.isArray(this.navCtrl.routes)).toBe(true);
      expect(this.navCtrl.routes[0].name).toEqual('home');
      expect(this.navCtrl.routes[0].url).toEqual('/home');
      expect(this.navCtrl.routes[1].name).toEqual('cow creator');
      expect(this.navCtrl.routes[1].url).toEqual('/cowCreator');
      expect(this.navCtrl.routes[2].name).toEqual('account');
      expect(this.navCtrl.routes[2].url).toEqual('/account');
    });
  });
});
