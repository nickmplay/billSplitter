(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//Person object to be instantiated into an array of people
function Person (){
  return {id: Date.now(), type:"split", amount:0}
};

//Bill object that contains bill methods and properties
function Bill (amount, service = true) {
  this.amount = amount;
  this.service = service;
  this.people = [
    new Person(),
    new Person()
  ];

  //to ensure uniqueness
  this.people[1].id++;
  
  //return number of people
  this.countPeople = function() {
    return this.people.length;
  };

  //add a person
  this.addPerson = function(){
    this.people.push(new Person());
  };

  //remove a person
  this.removePerson = function(id){
    if(!id){
      return false;
    } else {
      this.people = this.people.filter(e => e.id !== id);
    }
  };

  //update a person
  this.updatePerson = function(id, type, amount){
    const permittedTypes = ["split", "more", "less", "fixed"];
    if(!id || !type){
      return false;
    } else if( permittedTypes.filter(e => e === type).length === 0 ){
      return false;
    } else {
      this.people = this.people.map(e => {
        if(e.id != id){
          return e;
        } else {
          return {id, type, amount}
        }
      });
    };
  };

  //read a person
  this.readPerson = function(id){
    if(!id){
      return false;
    } else {
      return this.people.find(e => e.id === id) || false;
    };
  };

  //split the bill
  this.split = function(){
    let total = this.amount;
    const n = this.countPeople();
    const count = {split:0, more:0, less:0, fixed:0};
    let shares = [];

    //trivial case: only one person
    if (n === 1){
      shares.push({id: this.people[0].id, type: "split", share: amount});
      return shares;
    }

    //run counts
    for(let i = 0; i < n; i++){
      switch(this.people[i].type){
        case "split":
          count.split++;
          break;
        case "more":
          count.more++;
          break;
        case "less":
          count.less++;
          break;
        case "fixed":
          count.fixed++;
          break;
      }
    }

    //case: all share
    if( count.split === n){
      for(let i = 0; i < n; i++){
        shares.push({id: this.people[i].id, type: "split", share: this.r2dp(amount / n) });
      };
      return shares;
    }

    //case else: at least one more, less or fixed
    let sumAdj = 0;
    //calc adj total for fixed, more and less
    for(let i=0; i<n; i++){
      if( this.people[i].type == "fixed" || this.people[i].type == "more" ){
        sumAdj -= this.people[i].amount;
      } else if( this.people[i].type == "less" ){
        sumAdj += this.people[i].amount;
      }
    }
    amount += sumAdj;
    let average = this.r2dp( amount / (n - count.fixed) );

    //populate results array
    for(let i = 0; i < n; i++){
      switch(this.people[i].type){
        case "split":
          shares.push({id: this.people[i].id, type: "split", share: average }); 
          break;
        case "more":
          shares.push({id: this.people[i].id, type: "more", share: average + this.people[i].amount });
          break;
        case "less":
          shares.push({id: this.people[i].id, type: "less", share: average - this.people[i].amount });
          break;
        case "fixed":
          shares.push({id: this.people[i].id, type: "fixed", share: this.people[i].amount });
          break;
      }
    };

    return shares;
  }

  //utilities
  this.r2dp = function(a){
    return Math.round(a*100) / 100;
  }

};

module.exports = {Bill, Person};

/***/ })
/******/ ]);
});