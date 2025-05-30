const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('convertHandler should correctly read a whole number input', function() {
        assert.strictEqual(convertHandler.getNum('10lbs'), 10);
    });
    test('convertHandler should correctly read a decimal number input', function() {
        assert.strictEqual(convertHandler.getNum('4.5mi'), 4.5);
    });
    test('convertHandler should correctly read a fractional input', function() {
        assert.strictEqual(convertHandler.getNum('3/2mi'), 1.5);
    });
    test('convertHandler should correctly read a fractional input with a decimal', function() {
        assert.strictEqual(convertHandler.getNum('3.5/2mi'), 1.75);
    });
    test('convertHandler should return an error on a double-fraction', function() {
        assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
    });
    test('convertHandler should correctly default to a number input of 1 when no numerical input is provided', function() {
        assert.strictEqual(convertHandler.getNum('kg'), 1);
    });
    test('convertHandler should correctly read each valid input unit', function() {
        assert.strictEqual(convertHandler.getUnit('1kg'), 'kg');
        assert.strictEqual(convertHandler.getUnit('2mi'), 'mi');
        assert.strictEqual(convertHandler.getUnit('4km'), 'km');
        assert.strictEqual(convertHandler.getUnit('2lbs'), 'lbs');
        assert.strictEqual(convertHandler.getUnit('1.4gal'), 'gal');
        assert.strictEqual(convertHandler.getUnit('4L'), 'L');
    });
    test('convertHandler should correctly return an error for an invalid input unit', function() {
        assert.strictEqual(convertHandler.getUnit('2x'), 'invalid unit');
    });
    test('convertHandler should return the correct return unit for each valid input unit', function() {
        assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
        assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
        assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
        assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
        assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
        assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
        assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
        assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    });
    test('convertHandler should correctly convert gal to L', function() {
        assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
    });
    test('convertHandler should correctly convert L to gal', function() {
        assert.strictEqual(convertHandler.convert(1, 'L'), parseFloat((1 / 3.78541).toFixed(5)));
    });
    test('convertHandler should correctly convert mi to km', function() {
        assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
    });
    test('convertHandler should correctly convert km to mi', function() {
        assert.strictEqual(convertHandler.convert(1, 'km'), parseFloat((1 / 1.60934).toFixed(5)));
    });
    test('convertHandler should correctly convert lbs to kg', function() {
        assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
    });
    test('convertHandler should correctly convert kg to lbs', function() {
        assert.strictEqual(convertHandler.convert(1, 'kg'), parseFloat((1 / 0.453592).toFixed(5)));
    });
});