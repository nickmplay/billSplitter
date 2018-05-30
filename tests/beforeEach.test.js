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

//use a describe block instead of module globals
describe('a set of unit tests within a code block', ()=>{
  let descVarGlobal = 10;
  
  test('standard test', ()=>{
    let describeVar = 12;
    expect(describeVar).toBe(12);
  });

  test('change global', ()=>{
    expect(descVarGlobal).toBe(10);
    descVarGlobal++;
    expect(descVarGlobal).toBe(11);
  });

  test('change global again', ()=>{
    expect(descVarGlobal).not.toBe(10);
    descVarGlobal--;
    expect(descVarGlobal).toBe(10);
  });

});