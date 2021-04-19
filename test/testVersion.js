let assert = require('assert');
let version = require('../version');
let testData = [
    ['refs/heads/main', '1', 'abcd', 'main-1-abcd'],
    ['refs/pull/1/merge', '2', 'abcd', 'pr-1-2-abcd'],
    ['refs/tags/1.0.0', '2', 'abcd', '1.0.0'],
    ['refs/heads/main', '1', 'abcd1234567890', 'main-1-abcd1234'],
    ['refs/other/main', '1', 'abcd1234567890', 'refs/other/main-1-abcd1234'],
    ['refs/heads/develop', '1', 'abcd1234567890', 'develop-1-abcd1234']
];

describe('getVersion', function() {
    for(let data of testData) {
        it(JSON.stringify(data), function() {
            assert.strictEqual(version.get(data[0], data[1], data[2]), data[3])
        });
    }
});
