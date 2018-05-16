const { Bill, Person } = require('../src/bill');
const { ViewBill } = require('../src/view');
const { billController } = require('../src/controller');

const newView = new ViewBill();
const newModel = new Bill(100);
const fakeId = 1462361249717;
//same as mock ids for snapshots
newModel.people[0].id = fakeId;
newModel.people[1].id = fakeId + 1;

const dom = document.createElement("div");
const testCon = new billController(newView, newModel, dom);
testCon.createApp();

test('instantiate a controller class', () => {
  expect(dom).toMatchSnapshot();
});

