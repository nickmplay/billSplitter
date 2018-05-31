const { Bill, Person } = require('../src/bill');
const { ViewBill } = require('../src/view');
const { billController } = require('../src/controller');

//implementing before each testing structure
let newView, newModel, fakeId, dom, testCon, changeEvent;
const startingNumber = 2;

const shareString = (appDom) => {
  const shares = [];
  const numLis = appDom.querySelectorAll("li").length;
  for(let i=0; i<numLis; i++){
    shares.push( dom.querySelectorAll("span")[i].innerHTML );
  }
  return shares.join("");
};

//delay required to allow simulated DOM manipulation to finish
const wait = (ms) => {
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

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

test('test all options', ()=>{
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  dom.querySelector("button.addPersonBtn").click();
  // dom.querySelector("button.addPersonBtn").click();
  //wait required otherwise view doesnt complete render
  // wait(7000);
  expect( testCon.model.countPeople() ).toBe(3);
  expect( dom.querySelectorAll("li").length ).toBe(3);
  expect( shareString(dom) ).toBe('Share: 33.33Share: 33.33Share: 33.33');
  // expect( shareString(dom) ).toBe('Share: 25Share: 25Share: 25Share: 25');

  //mock UI person 1 - more
  dom.querySelectorAll("li")[0].querySelectorAll("option")[0].removeAttribute("selected");
  dom.querySelectorAll("li")[0].querySelectorAll("option")[1].setAttribute("selected", true);
  dom.querySelectorAll("li")[0].querySelector("input").disabled = false;
  dom.querySelectorAll("li")[0].querySelector("input").setAttribute("value", 10);

  dom.querySelectorAll("li")[0].querySelector("input").dispatchEvent(changeEvent);
  dom.querySelectorAll("li")[0].querySelector("select").dispatchEvent(changeEvent);

  //mock UI person 2 - less
  dom.querySelectorAll("li")[1].querySelectorAll("option")[0].removeAttribute("selected");
  dom.querySelectorAll("li")[1].querySelectorAll("option")[2].setAttribute("selected", true);
  dom.querySelectorAll("li")[1].querySelector("input").disabled = false;
  dom.querySelectorAll("li")[1].querySelector("input").setAttribute("value", 10);

  dom.querySelectorAll("li")[1].querySelector("input").dispatchEvent(changeEvent);
  dom.querySelectorAll("li")[1].querySelector("select").dispatchEvent(changeEvent);
  
  //mock UI person 3 - fixed
  dom.querySelectorAll("li")[2].querySelectorAll("option")[0].removeAttribute("selected");
  dom.querySelectorAll("li")[2].querySelectorAll("option")[3].setAttribute("selected", true);
  dom.querySelectorAll("li")[2].querySelector("input").disabled = false;
  dom.querySelectorAll("li")[2].querySelector("input").setAttribute("value", 10);

  dom.querySelectorAll("li")[2].querySelector("input").dispatchEvent(changeEvent);
  dom.querySelectorAll("li")[2].querySelector("select").dispatchEvent(changeEvent);

  expect( shareString(dom) ).toBe('Share: 55Share: 35Share: 10'); 
  // expect( shareString(dom) ).toBe('Share: 40Share: 20Share: 10Share: 30'); 
});