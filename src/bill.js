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

    //case: some shares and some fixed
    if( count.split > 0 && count.fixed > 0 ){
      let sumFixed = 0;
      
      //calc total fixed amounts to net off total
      for(let i = 0; i < n; i++){
        if(this.people[i].type == "fixed"){
          sumFixed += this.people[i].amount;
        }
      }
      amount -= sumFixed;
      let average = this.r2dp(amount / count.split);

      //populate results array
      for(let i = 0; i < n; i++){
        if( this.people[i].type == "fixed" ){
          shares.push({id: this.people[i].id, type: "fixed", share: this.people[i].amount });
        } else {
          shares.push({id: this.people[i].id, type: "split", share: average });
        }
      };

      return shares;
    }

    


  }

  //utilities
  this.r2dp = function(a){
    return Math.round(a*100) / 100;
  }

};

module.exports = {Bill, Person};