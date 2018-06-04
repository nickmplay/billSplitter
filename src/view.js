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
    const amountDiv = document.createElement("div");
    amountDiv.setAttribute("class", "totalBill");
    const amountLabel = document.createElement("label");
    amountLabel.setAttribute("for", "amountInp");
    amountLabel.innerHTML = "Enter total bill to split:";
    const amountInput = document.createElement("input");
    amountInput.setAttribute("name", "amountInp");
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("class", "input-total");
    amountInput.setAttribute("placeholder", "Enter amount");
    amountInput.setAttribute("value", startAmount);
    amountDiv.appendChild(amountLabel);
    amountDiv.appendChild(amountInput);
    return amountDiv;
  }
  

};

module.exports = { ViewBill };