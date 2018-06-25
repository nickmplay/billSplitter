let testDiv;

const proUpdate = (dom, fail) => {
  const newInner = "something else";
  return new Promise((resolve, reject)=>{
    if(!fail){
      dom.innerHTML = newInner;
    }
    if( dom.innerHTML == newInner){
      resolve(dom);
    } else {
      reject("dom not updated");
    }
  });  
}; 

beforeEach(()=>{
  testDiv = document.createElement("div");
  testDiv.innerHTML = "Say something";
});

test('see div snapshot', () => {
  expect(testDiv).toMatchSnapshot();
});

test('promise should update', (done)=>{
  proUpdate(testDiv, false).then(
    (newDom) => {
      expect(newDom).toMatchSnapshot();
      done();
    }
  ).catch(
    (e)=>{
      expect(e).toBe("dom not updated");
      expect(testDiv).toMatchSnapshot();
      done();
    }
  );
});

test('promise should not update', (done)=>{
  proUpdate(testDiv, true).then(
    (newDom) => {
      expect(newDom).toMatchSnapshot();
      done();
    }
  ).catch(
    (e)=>{
      expect(e).toBe("dom not updated");
      expect(testDiv).toMatchSnapshot();
      done();
    }
  );
}); 