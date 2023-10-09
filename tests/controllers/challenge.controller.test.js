const { resistorsInfo } = require('../../controllers/challenges.controller');
const { Resistors } = require('../../services/resistor');

describe('Challenges Controller', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Resistors();
  });

  it('should return ohm value info for a valid color sequence', async () => {
    calculator.validateColorSequence = jest.fn().mockReturnValue(true);
    calculator.calculateOhmValue = jest.fn().mockResolvedValue({
      ohmValue: 920000000,
      tolerance: '±1',
    });

    const req = {
      body: {
        bandAColor: 'white',
        bandBColor: 'red',
        bandCColor: 'violet',
        bandDColor: 'brown',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await resistorsInfo(req, res);

    expect(res.status(200).json).toHaveBeenCalledWith({
      ohmValue: 920000000,
      tolerance: '±1',
    });
  });

  it('should return a 400 status with an error message for an invalid color sequence', async () => {
    calculator.validateColorSequence = jest.fn().mockReturnValue(false);

    const req = {
      body: {
        bandAColor: 'fakecolor',
        bandBColor: 'fakecolor',
        bandCColor: 'fakecolor',
        bandDColor: 'fakecolor',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await resistorsInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      ohmValue: "Invalid",
      tolerance: "Invalid"
    });
  });
});
