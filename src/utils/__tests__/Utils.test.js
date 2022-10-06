const {
  extractSubHeadingFromString,
  removeSubHeading,
  capitalizeFirstLetter,
  formatString,
} = require('./../Utils');
describe('Utils function should return correct value(s)', () => {
  test('formatString function removes # and - from a string and returns formatted string', () => {
    const string = '# This is a test-string';
    const expectedResult = '  This is a test string';

    const formattedString = formatString(string);

    expect(formattedString).toBe(expectedResult);
  });
  test('capitalizeFirstLetter function capitalizes first character of string, formats & returns the formatted string', () => {
    const string = 'this is a test-string';
    const expectedResult = 'This is a test string';

    const formattedString = capitalizeFirstLetter(string);

    expect(formattedString).toBe(expectedResult);
  });
});
