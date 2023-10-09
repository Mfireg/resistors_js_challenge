const { Resistors } = require('../../services/resistor');

describe('Resistors Class', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Resistors();
  });

  it('should validate a valid color sequence', async () => {
    const isValid = await calculator.validateColorSequence('red', 'brown', 'violet', 'gold');
    expect(isValid).toBe(true);
  });

  it('should reject an invalid color sequence', async () => {
    const isValid = await calculator.validateColorSequence('red', 'invalid', 'violet', 'gold');
    expect(isValid).toBe(false);
  });

  it('should calculate the ohm value and tolerance', async () => {
    const ohmValueInfo = await calculator.calculateOhmValue('red', 'brown', 'violet', 'gold');
    expect(ohmValueInfo).toEqual({
      ohmValue: 210000000,
      tolerance: '±5',
    });
  });
});
