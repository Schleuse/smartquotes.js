import string from "./string";

interface Expectations {
  [key: string]: string;
}

test('smartquotes.string()', () => {

  // a list of test strings and expected converted values
  const expectations : Expectations = {
    '"test"': '\u201ctest\u201d',
    'the\u2014 "test"': 'the\u2014 \u201ctest\u201d',
    '\'test\'': '\u2018test\u2019',
    'ma\'am': 'ma\u2019am',
    '\'em': '\u2019em',
    'Marshiness of \'Ammercloth\'s': 'Marshiness of \u2019Ammercloth\u2019s',
    '\'95': '\u201995',
    '\'\'\'': '\u2034',
    '\'\'': '\u2033',
    '"Better than a 6\'5" whale."': '\u201cBetter than a 6\u20325\u2033 whale.\u201d',
    '"It\'s my \'#1\' choice!" - 12" Foam Finger from \'93': '\u201cIt\u2019s my \u2018#1\u2019 choice!\u201d - 12\u2033 Foam Finger from \u201993',
    '"Say \'what?\'" says a Mill\'s Pet Barn employee.': '\u201cSay \u2018what?\u2019\u201d says a Mill\u2019s Pet Barn employee.',
    '"Quote?": Description': '\u201cQuote?\u201d: Description',
    '\'Quo Te?\': Description': '\u2018Quo Te?\u2019: Description',
    '"De Poesjes van Kevin?": Something, something': '\u201cDe Poesjes van Kevin?\u201d: Something, something',
    'And then she blurted, "I thought you said, \'I don\'t like \'80s music\'?"': "And then she blurted, \u201cI thought you said, \u2018I don\u2019t like \u201980s music\u2019?\u201d"
  };

  for (const source in expectations) {
    const expectation = expectations[source];
    const testResult = string(source);
    expect(testResult).toEqual(expectation);
  }
});
