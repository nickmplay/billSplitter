const { ViewBill } = require('../src/view');

const fakeID = 1462361249717;
const fakePerson1 = {id:fakeID, type:"more", amount:10};
const fakePerson2 = {id:fakeID + 1, type:"split", amount:0};
const share1 = {id: fakePerson1.id, type: "split", share: 40};
const share2 = {id: fakePerson2.id, type: "split", share: 40};

//practise using toMatchSnapshot with DOM manipulations
test('instantiate a ViewBill class', () => {
  const newVB = new ViewBill();
  expect( newVB.test() ).toMatchObject({id:"test"});
  expect( newVB.test() ).toMatchSnapshot();
}); 

test('test a ViewBill DOM return', () => {
  const newVB = new ViewBill();
  expect( newVB.domTest() ).toMatchSnapshot();
}); 

test('test a ViewBill DOM manipulation', () => {
  const newVB = new ViewBill();
  const div = document.createElement("div");
  div.setAttribute("class", "test-div");
  expect( div ).toMatchSnapshot();
  expect( newVB.domChangeTest(div) ).toMatchSnapshot();
}); 

//test person template injection
test('test person template injection', () => {
  const newVB = new ViewBill();
  const FP1Div = newVB.createPersonLi(fakePerson1);
  expect( FP1Div ).toMatchSnapshot();
}); 

//update person DOM
test('test person DOM update', () => {
  const newVB = new ViewBill();
  const fakePerson1a = {id:fakePerson1.id, type:"split", amount:12 };
  const FP1Div = newVB.createPersonLi(fakePerson1);
  expect( FP1Div ).toMatchSnapshot();
  newVB.updatePerson(FP1Div, fakePerson1a);
  expect( FP1Div ).toMatchSnapshot();
}); 

test('test person DOM does not update', () => {
  const newVB = new ViewBill();
  const fakePerson1a = {id:123, type:"split", amount:12 };
  const FP1Div = newVB.createPersonLi(fakePerson1);
  expect( FP1Div ).toMatchSnapshot();
  const flag = newVB.updatePerson(FP1Div, fakePerson1a);
  expect( FP1Div ).toMatchSnapshot();
  expect(flag).toBe(false);
}); 