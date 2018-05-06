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
    if(!id || !type){
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

};

module.exports = {Bill, Person};