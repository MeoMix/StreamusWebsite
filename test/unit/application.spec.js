// Import from 'compiled' because tests work off of pre-compiled logic not raw ES6.
import Application from 'compiled/application/application.js';
import indexText from 'compiled/index.html!text';

describe('Application', () => {
  // Ensure the 'main' element in index.html stays synchronized with our test page.
  const indexElement = document.createElement('div');
  indexElement.innerHTML = indexText;
  document.body.appendChild(indexElement.querySelector('main'));

  let application;
  beforeEach(() => {
    application = new Application();
    window.App = application;
  });

  it('should start', () => {
    const spy = sinon.spy();
    application.on('start', spy);
    application.start();
    expect(spy.calledOnce).to.equal(true);
  });
});