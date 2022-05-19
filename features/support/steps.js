const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Url = require('../../url.min.js');
const { url } = require('inspector');


Given('I have a url with query params', function () {
    this.url = new Url('https://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo');
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


Given('I have a {string} port in a url', function (port) {
    this.url = new Url('https://example:'+port);
});
When('I check the port of the url', function () {
    this.port = this.url.port;
});
Then('I should see the port is {string}', function (expectedPort) {
    assert.equal(this.port, expectedPort);
});


Given('I have a url without query params', function () {
    this.url = new Url('https://example.com');
});
When('I add query params a={string} and b={int}', function (value1, value2) {
    this.url.query.a = value1;
    this.url.query.b = value2;
});
Then('The query params should be {string}', function (expectedQuery) {
    assert.equal(this.url.query, expectedQuery);
});


Given('I have an url: {string}', function (input_url) {
    this.url = new Url(input_url);
});
When('I set the hash to {string}', function (hash) {
    this.url.hash = hash;
});
Then('I should have a new url with hash: {string}', function (url) {
    assert.strictEqual(this.url.toString(), url);
});


Given('I have an url with path: {string}', function (path) {
    this.url = new Url(path);
});
When('I change the path to {string}', function (newPath) {
    this.url.path = newPath;
});
Then('I should have the path: {string}', function (expectedAnswer) {
    assert.strictEqual(this.url.toString(), expectedAnswer);
});


Given('I have new url: {string}', function(url){
    this.url = new Url(url);
});
When('I add a query: {string}', function(query){
    this.url.query = query;
});
Then('I should have a new url with the query length: {string}', function(n){
   assert.equal(this.url.queryLength(), n)
}); 


Given('I have another url: {string}', function(url){
    this.url = new Url(url);
});
When('I add params: {string}', function(params){
    this.url.path = params;
});
Then('I should have a new url with the length: {string}', function(n){
   assert.equal((this.url.toString()).length, n)
});