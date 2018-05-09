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
  this.personTemplate = "{{type}} to pay {{amount}}";

  this.createPersonLi = function(data){
    const pDiv = document.createElement("li");
    let pInner = this.personTemplate.replace("{{type}}", data.type).replace("{{amount}}", data.amount);
    pDiv.innerHTML = pInner;
    return pDiv;
  }

};

module.exports = { ViewBill };