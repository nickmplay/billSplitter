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