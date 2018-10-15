const {escapeSOSL, escapeSOQL} = require('../index');

describe(`escapeSOQL`, ()=> {
  it(`The single quote (’)  character must be preceded by a backslash`, () => {
    expect(escapeSOQL(`Tom's cabin`)).toBe(`Tom\\'s cabin`);
  });
  it(`The backlash (\) character must be preceded by a backslash`, () => {
    expect(escapeSOQL(`Tom\\s cabin`)).toBe(`Tom\\\\s cabin`);
  });
});

describe(`escapeSOSL`, ()=> {
  it(`The ({}+:) characters must be preceded by a backslash`, () => {
    expect(escapeSOSL(`{1+1}:2`)).toBe(`\\{1\\+1\\}\\:2`);
  });
});
