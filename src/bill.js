//Person object to be instantiated into an array of people
function Person (id){
  return {id:id, type:"split"}
};

//Bill object that contains bill methods and properties
function Bill (amount, service = true) {
  this.amount = amount;
  this.service = service;
  this.people = [
    new Person(1),
    new Person(2)
  ];

  this.countPeople = function() {
    return this.people.length;
  };

  this.addPerson = function(){
    const newId = this.countPeople() + 1;
    this.people.push(new Person(newId));
  };
};

module.exports = {Bill, Person};