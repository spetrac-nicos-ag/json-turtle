const
    // https://mochajs.org/#interfaces
    { describe, test } = require('mocha'),
    // https://www.chaijs.com/api/bdd/
    { expect } = require('chai'),
    N3 = require('n3'),
    jsonTurtle = require('../src/json-turtle.js');

describe('develop', function () {

    test('parseTurtle', function () {
        const store = jsonTurtle.parseTurtle(`
            @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
            @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
            @prefix ex: <http://example.org/> .

            ex:hello 
                a rdfs:Resource ;
                rdfs:label "Hello World!"@en ;
            .
        `);

        expect(store)
            .to.be.an.instanceof(N3.Store)
            .that.has.a.property('size')
            .which.equals(2);
        expect(store.getQuads())
            .to.be.an('array').of.length(2)
            .that.has.a.nested.property('[0].subject.value')
            .which.equals('http://example.org/hello');
    });

});