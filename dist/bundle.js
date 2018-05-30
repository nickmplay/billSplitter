(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/***/ (function(module, exports, __webpack_require__) {

const { Bill, Person } = __webpack_require__(1);
const { ViewBill } = __webpack_require__(2);
const { billController } = __webpack_require__(3);


module.exports = {Bill, Person, ViewBill, billController};

/***/ }),
/* 1 */
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
      this.people = this.people.filter(e => e.id !== parseInt(id));
    }
  };

  //update a person
  this.updatePerson = function(id, type, amount = 0){
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
          return {id: parseInt(id), type, amount: parseFloat(amount)}
        }
      });
    };
  };

  //read a person
  this.readPerson = function(id){
    if(!id){
      return false;
    } else {
      return this.people.find(e => e.id === parseInt(id)) || false;
    };
  };

  //split the bill
  this.split = function(){
    let total = this.amount + 0;
    const n = this.countPeople();
    const count = {split:0, more:0, less:0, fixed:0};
    let shares = [];

    //trivial case: only one person
    if (n === 1){
      shares.push({id: this.people[0].id, type: "split", share: total});
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
        shares.push({id: this.people[i].id, type: "split", share: this.r2dp(total / n) });
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
    total += sumAdj;
    let average = this.r2dp( total / (n - count.fixed) );

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

//define view of the Bill model
function ViewBill() {
  //test functions
  this.test = function(){
    return {id:"test"}
  };

  this.domTest = function() {
    const div = document.createElement("div");
    div.innerHTML = "<h1>Hello world</h1>";
    return div;
  };

  this.domChangeTest = function(elem) {
    elem.setAttribute("class", "new-class");
    elem.innerHTML = "<span>ViewBill entry</span>"
    return elem;
  };

  //person views
  this.createPersonLi = function(data){
    const options = ["split", "more", "less", "fixed"];
    let personTemplate = "To pay ";
    personTemplate += "<input type='number' class='p-amount' placeholder='{{amount}}'</input><select>";
    personTemplate += options.map( e => {
      const sel = data.type === e ? "selected" : "";
      return `<option value='${e}' ${sel}>${e}</option>`;
    }).join('');
    personTemplate += `</select><span p-id=${data.id}>Share: -</span>`;
    personTemplate += "<button>X</button>";

    //create element and inject data
    const pDiv = document.createElement("li");
    pDiv.setAttribute("p-id", data.id);
    let pInner = personTemplate.replace("{{amount}}", data.amount);
    pDiv.innerHTML = pInner;
    pDiv.querySelector("input").disabled = (data.type == "split");
    return pDiv;
  }

  this.updatePerson = function(elem, data){
    //validate person id is equal
    if(elem.getAttribute("p-id") == data.id){
      const options = ["split", "more", "less", "fixed"];
      const newOptionsHTML = options.map( e => {
        const sel = data.type === e ? "selected" : "";
        return `<option value='${e}' ${sel}>${e}</option>`;
      }).join('');
      // elem.querySelector(".p-type").innerHTML = data.type;
      elem.getElementsByTagName("select")[0].innerHTML = newOptionsHTML;
      elem.getElementsByClassName("p-amount")[0].placeholder = data.amount;
    } else {
      return false;
    }
  }

  this.updateShare = function(app, id, shareAmount){
    app.querySelector(`span[p-id='${id}']`).innerHTML = `Share: ${shareAmount}`;
  }

  this.addPersonButton = function(){
    const addPersonBtn = document.createElement("button");
    addPersonBtn.setAttribute("class","addPersonBtn");
    addPersonBtn.innerHTML = "Add Person";
    return addPersonBtn;
  }

  this.createAmountInput = function(startAmount = 0){
    const amountInput = document.createElement("input");
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("class", "input-total");
    amountInput.setAttribute("placeholder", "Enter amount");
    amountInput.setAttribute("value", startAmount);
    return amountInput;
  }
  

};

module.exports = { ViewBill };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

//define the controller to liaise between the model and the view
function billController(billView, billModel, domTarget){
  this.view = billView;
  this.model = billModel;
  this.target = domTarget;
  this.olPeople = document.createElement("ol");

  this.total = this.view.createAmountInput(this.model.amount);
  this.total.addEventListener("change", e => {
    this.model.amount = parseFloat(e.target.value);
    this.updateShares();
  });

  //update shares
  this.updateShares = function(){ 
    this.shares = this.model.split();
    for(let i=0; i<this.shares.length; i++){
      this.view.updateShare(this.target, this.shares[i].id, this.shares[i].share);
    }
  }
  
  //create person
  this.createPerson = function(id){
    const data = this.model.readPerson(id);
    const pNew = this.view.createPersonLi(data);

    //add event listeners
    //..btn
    pNew.querySelector("button").addEventListener("click",  e => {
      const personId = e.target.parentElement.getAttribute("p-id");
      this.model.removePerson(personId);
      e.target.parentElement.remove();
      //update shares
      this.updateShares();
    });

    //..select option
    pNew.querySelector("select").addEventListener("change", e => {
      const options = e.target.children;
      const personId = e.target.parentElement.getAttribute("p-id");
      const personJSON = this.model.readPerson(personId);

      //extract new type
      let chosenIndex = -1;
      for(let i=0; i<options.length; i++){
        if(options[i].selected){
          chosenIndex = i;
        }
      }
      //update model, assuming amount unchanged
      this.model.updatePerson(personId, e.target.children[chosenIndex].value, personJSON.amount);
      // this.model.people.forEach(e=>console.log(e));
      
      //disable input if split option selected
      if(e.target.children[chosenIndex].value == "split"){
        e.target.parentElement.querySelector("input").value = 0;
        e.target.parentElement.querySelector("input").disabled = true;
      } else {
        e.target.parentElement.querySelector("input").disabled = false;
      }
      

      //update shares
      this.updateShares();
    });

    //..amount
    pNew.querySelector("input").addEventListener("change", e => {
      const personId = e.target.parentElement.getAttribute("p-id");
      const personJSON = this.model.readPerson(personId);
      //update model, assuming type unchanged
      this.model.updatePerson(personId, personJSON.type, e.target.value);
      // this.model.people.forEach(e=>console.log(e));

      //update shares
      this.updateShares();
    });

    //append to ol DOM
    this.olPeople.appendChild(pNew);
  }

  
  //instantiate app
  this.createApp = function(){
    //append new elements to app DOM
    this.target.appendChild(this.total);
    this.target.appendChild(this.olPeople);

    //create people
    for(let i=0; i<this.model.countPeople(); i++){
      this.createPerson(this.model.people[i].id);
    }

    //create add person button
    const btn = this.view.addPersonButton();
    btn.addEventListener("click", e => {
      this.model.addPerson();
      const newId = this.model.people[ this.model.countPeople()-1 ].id; 
      this.createPerson(newId);
      this.updateShares();
    });
    this.target.appendChild(btn);

    //update shares
    this.updateShares();
  }

};

module.exports = { billController };

/***/ })
/******/ ]);
});