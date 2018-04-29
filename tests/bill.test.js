const {Bill, Person} = require('../src/bill');
// import {Bill, Person} from '../src/bill';

//default settings
test('instantiate a Bill class', () => {
  const newBill = new Bill(100);
  expect( newBill.countPeople() ).toBe(2);
  expect( newBill.amount ).toBe(100);
  expect( newBill.service ).toBe(true);
}); 

//add person
test('add a person', () => {
  const newBill = new Bill(100, false);
  newBill.addPerson();
  expect( newBill.countPeople() ).toBe(3);
  expect( newBill.amount ).toBe(100);
  expect( newBill.service ).toBe(false);
  
  const newPerson = new Person(2);
  expect( JSON.stringify(newPerson) ).toMatch(JSON.stringify({id:2, type:"split"}));
}); 