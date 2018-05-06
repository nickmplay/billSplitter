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

test("don't remove a person", () => {
  const newBill = new Bill(100);
  newBill.removePerson(12);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
}); 

//update a person
test("update a person", () => {
  const newBill = new Bill(100);
  const newPerson = {id:fakePerson1.id, type:"total", amount:12};
  newBill.updatePerson(newPerson.id, newPerson.type, newPerson.amount);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([newPerson, fakePerson2]);
}); 

test("don't update a person", () => {
  const newBill = new Bill(100);
  const flag = newBill.updatePerson();
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.people ).toMatchObject([fakePerson1, fakePerson2]);
  expect(flag).toBe(false);
}); 

test("don't update a person", () => {
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

test("don't read a person", () => {
  const newBill = new Bill(100);
  const read = newBill.readPerson(12);
  expect( newBill.countPeople() ).toBe(2);
  expect(read).toBe(false);
}); 