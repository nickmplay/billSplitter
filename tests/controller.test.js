const { Bill, Person } = require('../src/bill');
const { ViewBill } = require('../src/view');
const { billController } = require('../src/controller');

// const newView = new ViewBill();
// const newModel = new Bill(100);
// const fakeId = 1462361249717;
// //same as mock ids for snapshots
// newModel.people[0].id = fakeId;
// newModel.people[1].id = fakeId + 1;

// const dom = document.createElement("div");
// const testCon = new billController(newView, newModel, dom);
// testCon.createApp();

//implementing before each testing structure
let newView, newModel, fakeId, dom, testCon;
const startingNumber = 2;

beforeEach(()=>{
  newView = new ViewBill();
  newModel = new Bill(100);
  fakeId = 1462361249717;
  //same as mock ids for snapshots
  newModel.people[0].id = fakeId;
  newModel.people[1].id = fakeId + 1;

  dom = document.createElement("div");
  testCon = new billController(newView, newModel, dom);
  testCon.createApp();
});

test('instantiate a controller class', () => {
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  expect(dom).toMatchSnapshot();
});

test('add a person', ()=>{
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  // dom.querySelectorAll("button")[2].click();
  dom.querySelector("button.addPersonBtn").click()
  expect( testCon.model.countPeople() ).toBe(3);
  expect( dom.querySelectorAll("li").length ).toBe(3);
  const shares = [];
  for(let i=0; i<3; i++){
    shares.push( dom.querySelectorAll("span")[i].innerHTML );
  }
  expect( shares.join("") ).toBe('Share: 33.33Share: 33.33Share: 33.33'); 
});

test('remove a person', ()=>{
  expect( testCon.model.countPeople() ).toBe(startingNumber);
  dom.querySelector("button").click();
  expect( testCon.model.countPeople() ).toBe(1);
  expect( dom.querySelectorAll("li").length ).toBe(1);
  expect( dom.querySelectorAll("span")[0].innerHTML ).toBe('Share: 100'); 
});