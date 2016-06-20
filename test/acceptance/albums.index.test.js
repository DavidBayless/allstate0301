require('../helper');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Albumz Index', function(){
  it('has a header', function(done){
    browser.get('/albumz');
    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('Albumz');
      done();
    });
  });
  it('should have a link to /albumz/new', function(done){
    browser.get('/albumz');
    element(by.tagName('a')).click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.split(browser.baseUrl)[1]).to.equal('/albumz/new');
      done();
    });
  });
  it('should display a table of albums', function(done) {
    browser.get('/albumz');
    element.all(by.css('.albumsList td')).getText().then(function(text) {
      console.log(text);
      expect(text[0]).to.equal('Jazz');
      expect(text[1]).to.equal('Miles Davis');
      expect(text[2]).to.equal('Kind of Blue');
      done();
    });
  });
  it('should have a link to take users to a specific album page', function(done) {
    browser.get('/albumz');
    element(by.css('.albumsList a')).click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.split(browser.baseUrl)[1]).to.equal('/albumz/576865590893834868bfcf04');
      done();
    });
  })
});
