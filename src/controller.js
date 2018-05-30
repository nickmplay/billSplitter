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