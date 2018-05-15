const {Bill, Person} = require('../src/bill');
// import {Bill, Person} from '../src/bill';

//mocks
//http://untangled.io/how-to-mock-date-now-to-keep-date-based-unit-tests-predictable/
function mockDateNow() {
  // mock now = 1462361249717ms = 4th May 2016
  return 1462361249717;
}

beforeEach(function () {
  originalDateNow = Date.now;
  Date.now = mockDateNow;
});

afterEach(function () {
  Date.now = originalDateNow;
});

const fakeID = mockDateNow();
const fakePerson1 = {id:fakeID, type:"split", amount:0}
const fakePerson2 = {id:fakeID + 1, type:"split", amount:0}

//default settings
test('instantiate a Bill class', () => {
  const newBill = new Bill(100);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.amount ).toBe(100);
  expect( newBill.service ).toBe(true);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
}); 

//create a person
test('instantiate a person', () => {
  const newPerson = new Person();
  expect(newPerson).toMatchObject(fakePerson1);
}); 

//add a person
test('create a person', () => {
  const newBill = new Bill(100);
  newBill.addPerson();
  expect( newBill.countPeople() ).toBe(3);
  expect( newBill.people[2] ).toMatchObject(fakePerson1);
}); 

//remove a person
test('remove a person', () => {
  const newBill = new Bill(100);
  newBill.removePerson(fakePerson1.id);
  expect( newBill.countPeople() ).toBe(1);
  expect( newBill.people[0] ).toMatchObject(fakePerson2);
}); 

test("remove a person with string id", () => {
  const newBill = new Bill(100);
  const newId = fakePerson1.id;
  const newIdstring = `${newId}`;
  newBill.removePerson(newIdstring);
  expect( newBill.countPeople() ).toBe(1);
  expect( newBill.people[0] ).toMatchObject(fakePerson2);
}); 

test("don't remove a person", () => {
  const newBill = new Bill(100);
  newBill.removePerson(12);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
}); 

//update a person
test("update a person", () => {
  const newBill = new Bill(100);
  const newPerson = {id:fakePerson1.id, type:"more", amount:12};
  newBill.updatePerson(newPerson.id, newPerson.type, newPerson.amount);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([newPerson, fakePerson2]);
}); 

test("don't update a blank person", () => {
  const newBill = new Bill(100);
  const flag = newBill.updatePerson();
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
  expect(flag).toBe(false);
}); 

test("don't update an incomplete person", () => {
  const newBill = new Bill(100);
  const newPerson = {id:fakePerson1.id, type:"wrong-type", amount:12};
  const flag = newBill.updatePerson(newPerson.id, newPerson.type, newPerson.amount);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
  expect(flag).toBe(false);
}); 

test("don't update an incorrect type", () => {
  const newBill = new Bill(100);
  const flag = newBill.updatePerson(fakePerson1.id);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
  expect(flag).toBe(false);
}); 

//read a person
test("read a person", () => {
  const newBill = new Bill(100);
  const newId = fakeID + 1;
  const newPerson = {id:newId, type:"split", amount:0};
  newBill.people[0].id = newId;
  const read = newBill.readPerson(newId);
  expect( newBill.countPeople() ).toBe(2);
  expect(read).toMatchObject(newPerson);
}); 

test("read a person with string id", () => {
  const newBill = new Bill(100);
  const newId = fakeID + 1;
  const newIdstring = `${newId}`;
  const newPerson = {id:newId, type:"split", amount:0};
  newBill.people[0].id = newId;
  const read = newBill.readPerson(newId);
  expect( newBill.countPeople() ).toBe(2);
  expect(read).toMatchObject(newPerson);
}); 

test("don't read a person", () => {
  const newBill = new Bill(100);
  const read = newBill.readPerson(12);
  expect( newBill.countPeople() ).toBe(2);
  expect(read).toBe(false);
}); 

//split the bill
test("split the bill by one", ()=>{
  const newBill = new Bill(100);
  const share1 = {id: fakePerson1.id, type: "split", share: newBill.amount};
  newBill.removePerson(newBill.people[1].id);
  expect( newBill.countPeople() ).toBe(1);
  expect( newBill.split() ).toMatchObject([share1]);
});

test("split the bill by all", ()=>{
  const newBill = new Bill(100);
  const shareAmount = Math.round(100 * 100 / 3) / 100;
  const share1 = {id: fakePerson1.id, type: "split", share: shareAmount};
  const share2 = {id: fakePerson2.id, type: "split", share: shareAmount};
  newBill.addPerson();
  expect( newBill.countPeople() ).toBe(3);
  expect( newBill.split() ).toMatchObject([share1, share2, share1]);
});

test("split the bill with some fixed", ()=>{
  const newBill = new Bill(100);  
  const share1 = {id: fakePerson1.id, type: "split", share: 40};
  const share2 = {id: fakePerson2.id, type: "split", share: 40};
  const share3 = {id: share2.id + 1, type: "fixed", share: 20};
  newBill.addPerson();
  newBill.people[2].id = share3.id;
  newBill.updatePerson(share3.id, share3.type, share3.share);
  expect( newBill.countPeople() ).toBe(3);
  expect( newBill.split() ).toMatchObject([share1, share2, share3]);
});

test("split the bill with some fixed", ()=>{
  const newBill = new Bill(100);  
  const share1 = {id: fakePerson1.id, type: "split", share: 65};
  const share2 = {id: fakePerson2.id, type: "fixed", share: 15};
  const share3 = {id: share2.id + 1, type: "fixed", share: 20};
  newBill.addPerson();
  newBill.people[2].id = share3.id;
  newBill.updatePerson(share2.id, share2.type, share2.share);
  newBill.updatePerson(share3.id, share3.type, share3.share);
  expect( newBill.countPeople() ).toBe(3);
  expect( newBill.split() ).toMatchObject([share1, share2, share3]);
});

test("split the bill with some fixed and more", ()=>{
  const newBill = new Bill(100);  
  const share1 = {id: fakePerson1.id, type: "split", share: 21};
  const share2 = {id: fakePerson2.id, type: "fixed", share: 15};
  const share3 = {id: share2.id + 1, type: "more", share: 31};
  const share4 = {id: share2.id + 2, type: "more", share: 33};
  newBill.addPerson();
  newBill.people[2].id = share3.id;
  newBill.addPerson();
  newBill.people[3].id = share4.id;
  newBill.updatePerson(share2.id, share2.type, 15);
  newBill.updatePerson(share3.id, share3.type, 10);
  newBill.updatePerson(share4.id, share4.type, 12);
  expect( newBill.countPeople() ).toBe(4);
  expect( newBill.split() ).toMatchObject([share1, share2, share3, share4]);
});

test("split the bill with some fixed and less", ()=>{
  const newBill = new Bill(100);  
  const share1 = {id: fakePerson1.id, type: "split", share: 35.67};
  const share2 = {id: fakePerson2.id, type: "fixed", share: 15};
  const share3 = {id: share2.id + 1, type: "less", share: 25.67};
  const share4 = {id: share2.id + 2, type: "less", share: 23.67};
  newBill.addPerson();
  newBill.people[2].id = share3.id;
  newBill.addPerson();
  newBill.people[3].id = share4.id;
  newBill.updatePerson(share2.id, share2.type, 15);
  newBill.updatePerson(share3.id, share3.type, 10);
  newBill.updatePerson(share4.id, share4.type, 12);
  expect( newBill.countPeople() ).toBe(4);
  expect( newBill.split() ).toMatchObject([share1, share2, share3, share4]);
});

test("split the bill with some fixed, more and less", ()=>{
  const newBill = new Bill(100);  
  const share1 = {id: fakePerson1.id, type: "split", share: 29};
  const share2 = {id: fakePerson2.id, type: "fixed", share: 15};
  const share3 = {id: share2.id + 1, type: "more", share: 39};
  const share4 = {id: share2.id + 2, type: "less", share: 17};
  newBill.addPerson();
  newBill.people[2].id = share3.id;
  newBill.addPerson();
  newBill.people[3].id = share4.id;
  newBill.updatePerson(share2.id, share2.type, 15);
  newBill.updatePerson(share3.id, share3.type, 10);
  newBill.updatePerson(share4.id, share4.type, 12);
  expect( newBill.countPeople() ).toBe(4);
  expect( newBill.split() ).toMatchObject([share1, share2, share3, share4]);
});