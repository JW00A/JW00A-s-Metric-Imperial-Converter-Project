function ConvertHandler() {
  
  this.getNum = function(input) {
    let numMatch = input.match(/[.\d\/]+/);
    if (!numMatch) return 1;
    
    let num = numMatch[0];

    if (num.includes('/')) {
      let parts = num.split('/');

      if (parts.length > 2) return 'invalid number';
      
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }

    return parseFloat(num);
  };
  
  this.getUnit = function(input) {
    let unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';

    let validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let unit = unitMatch[0].trim().toLowerCase();
    
    if (unit === 'l') unit = 'L';

    return validUnits.includes(unit) ? unit : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    let unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitNames[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    let conversions = { 
      'gal': 3.78541,
      'L': 1/3.78541,
      'lbs': 0.453592,
      'kg': 1/0.453592,
      'mi': 1.60934,
      'km': 1/1.60934
  };
    
    return conversions[initUnit] ? parseFloat((initNum * conversions[initUnit]).toFixed(5)) : 'invalid unit';
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let formattedInitUnit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
    let formattedReturnUnit = returnUnit === 'L' ? 'L' : returnUnit.toLowerCase();

    let result = `${initNum} ${this.spellOutUnit(formattedInitUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(formattedReturnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
