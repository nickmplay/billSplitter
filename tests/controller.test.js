const { Bill, Person } = require('../src/bill');
const { ViewBill } = require('../src/view');
const { billController } = require('../src/controller');

//implementing before each testing structure
let newView, newModel, fakeId, dom, testCon, changeEvent;
const startingNumber = 2;

const shareString = (appDom)=>{
  const shares = [];
  const numLis = appDom.querySelectorAll("li").length;
  for(let i=0; i<numLis; i++){
    shares.push( dom.querySelectorAll("span")[i].innerHTML );
  }
  return shares.join("");
};

beforeEach(()=>{
  newView = new ViewBill();
  newModel = new Bill(100);
  fakeId = 1462361249717;
  //same as mock ids for snapshots
  newModel.people[0].id = fakeId;
  newModel.people[1].id = fakeId + 1;

  changeEvent = document.createEvent('Event');
  changeEvent.initEvent('change', true, true);  

  dom = document.createElement("div");
  testCon = new billController(newView, newModel, dom);
  testCon.createApp();
});

//tests
test('instantiate a controller class', () => {
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  expect(dom).toMatchSnapshot();
  expect( shareString(dom) ).toBe('Share: 50Share: 50');
});

test('add a person', ()=>{
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  dom.querySelector("button.addPersonBtn").click()
  expect( testCon.model.countPeople() ).toBe(3);
  expect( dom.querySelectorAll("li").length ).toBe(3);
  expect( shareString(dom) ).toBe('Share: 33.33Share: 33.33Share: 33.33');
});

test('remove a person', ()=>{
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  dom.querySelector("button").click();
  expect( testCon.model.countPeople() ).toBe(1);
  expect( dom.querySelectorAll("li").length ).toBe(1);
  expect( shareString(dom) ).toBe('Share: 100'); 
});

test('edit a person', ()=>{
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  
  //mock UI
  dom.querySelector("li").querySelectorAll("option")[0].removeAttribute("selected");
  dom.querySelector("li").querySelectorAll("option")[1].setAttribute("selected", true);
  dom.querySelector("li").querySelector("input").disabled = false;
  dom.querySelector("li").querySelector("input").setAttribute("value", 10);
  
  //fire event listeners
  dom.querySelector("li").querySelector("input").dispatchEvent(changeEvent);
  dom.querySelector("li").querySelector("select").dispatchEvent(changeEvent);
  
  //test dom
  expect(dom).toMatchSnapshot();
  expect( shareString(dom) ).toBe('Share: 55Share: 45'); 
});