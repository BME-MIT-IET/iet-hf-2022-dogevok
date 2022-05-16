const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Url = require('../../url.min.js');


Given('I have a url with query params', function () {
    this.url = new Url('http://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo');
});
When('I remove the query params', function(){
    this.url.clearQuery();
});
Then('I should have a url with zero query params', function () {
    assert.equal(this.url.queryLength(), 0);
});


Given('I have a {string} protocol in a url', function (protocol) {
    this.url = new Url(protocol + '://example:3000/');
});
When('I check the protocol of the url', function () {
    this.protocol = this.url.protocol;
});
Then('I should see the protocol is {string}', function (expectedProtocol) {
    assert.equal(this.protocol, expectedProtocol);
});


Given('I have a url without query params', function () {
    this.url = new Url('http://example.com');
});
When('I add query params a={string} and b={int}', function (value1, value2) {
    this.url.query.a = value1;
    this.url.query.b = value2;
});
Then('The query params should be {string}', function (expectedQuery) {
    assert.equal(this.url.query, expectedQuery);
});


