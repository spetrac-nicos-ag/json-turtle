const
    // https://rdf.js.org/N3.js/
    N3 = require('n3');

exports.parseTurtle = function (turtle) {
    const parser = new N3.Parser({
        format: 'text/turtle',
        baseIRI: 'http://localhost/',
        blankNodePrefix: ''
    });
    const quads = parser.parse(turtle);
    return new N3.Store(quads);
};