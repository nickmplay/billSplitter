let variable;

beforeEach(()=>{
  variable = 5;
})

test('after before each', () => {
  expect(variable).toBe(5);
});

test('change value one time', () => {
  variable++;
  expect(variable).toBe(6);
});

test('vaildate independence', () => {
  expect(variable).toBe(5);
});