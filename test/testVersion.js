/*jshint loopfunc: true */
let assert = require('assert');
let version = require('../version');

let testData = [
    ['refs/heads/main', '1', 'abcd', 'main-1-abcd', 'main', '1', 'abcd'],
    ['refs/pull/1/merge', '2', 'abcd', 'pr-1-2-abcd', 'pr-1', '2', 'abcd'],
    ['refs/pull/1/base', '2', 'abcd', 'pr-1-2-abcd', 'pr-1', '2', 'abcd'],
    ['refs/tags/v1', '2', 'abcd', 'v1', '1', '', ''],
    ['refs/tags/1.0', '2', 'abcd', '1.0', '1', '0', ''],
    ['refs/tags/1.0.0', '2', 'abcd', '1.0.0', '1', '0', '0'],
    ['refs/tags/v1.0.0', '2', 'abcd', 'v1.0.0', '1', '0', '0'],
    ['refs/tags/1.2.3.4', '2', 'abcd', '1.2.3.4', '1', '2', '3.4'],
    ['refs/heads/main', '1', 'abcd1234567890', 'main-1-abcd1234', 'main', '1', 'abcd1234'],
    ['refs/other/main', '1', 'abcd1234567890', 'refs/other/main-1-abcd1234', 'refs/other/main', '1', 'abcd1234'],
    ['refs/heads/develop', '1', 'abcd1234567890', 'develop-1-abcd1234', 'develop', '1', 'abcd1234'],
];

let testDataWithoutV = [
    // do nothing for branches
    ['refs/heads/main', '1', 'abcd', 'main-1-abcd'],
    ['refs/heads/v100', '1', 'abcd', 'v100-1-abcd'],
    ['refs/pull/1/merge', '2', 'abcd', 'pr-1-2-abcd'],

    // strip leading v from version numbers
    ['refs/tags/1.0.0', '2', 'abcd', '1.0.0'],
    ['refs/tags/v1.0.0', '2', 'abcd', '1.0.0'],
    ['refs/tags/v1', '2', 'abcd', '1'],
    ['refs/tags/v1.0-SNAPSHOT', '2', 'abcd', '1.0-SNAPSHOT'],

    // don't strip v from regular words
    ['refs/tags/vita', '2', 'abcd', 'vita'],
];

describe('version', function () {
    for (let data of testData) {
        it(JSON.stringify(data), function() {
            let outputs = version.get(data[0], data[1], data[2]);
            assert.strictEqual(outputs.version, data[3]);
            assert.strictEqual(outputs.major, data[4]);
            assert.strictEqual(outputs.minor, data[5]);
            assert.strictEqual(outputs.patch, data[6]);
        });
    }
});

describe('version-without-v', function () {
    for (let data of testDataWithoutV) {
        it(JSON.stringify(data), function () {
            let outputs = version.get(data[0], data[1], data[2]);
            assert.strictEqual(outputs.versionWithoutV, data[3]);
        });
    }
});
