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
    const personTemplate = "To pay <span class='p-type'>{{type}}</span> <span class='p-amount'>{{amount}}</span>";
    const pDiv = document.createElement("li");
    pDiv.setAttribute("p-id", data.id);
    let pInner = personTemplate.replace("{{type}}", data.type).replace("{{amount}}", data.amount);
    pDiv.innerHTML = pInner;
    return pDiv;
  }

  this.updatePerson = function(elem, data){
    //validate person id is equal
    if(elem.getAttribute("p-id") == data.id){
      elem.querySelector(".p-type").innerHTML = data.type;
      elem.querySelector(".p-amount").innerHTML = data.amount;
    } else {
      return false;
    }
  }

};

module.exports = { ViewBill };