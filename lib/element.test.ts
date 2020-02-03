import parse5 from 'parse5';
import element from './element'

test('smartquotes.element()', t => {

  test('supports parse5 parsing for server-side usage', t => {
    const document = parse5.parse('"test text"');
    element(document);
    t.match(parse5.serialize(document), /\u201ctest text\u201d/);
    t.end();
  });

  const document = jsdom.jsdom(fs.readFileSync(path.join(__dirname, 'fixtures/basic.html')));
  const window = document.defaultView;

  element(document.body);

  test('converting basic types of quotes to smart quotes', t => {
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
    t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
    t.end();
  });

  test('handling tags inside tags', t => {
    var three = document.getElementById('three');
    t.equal(three.innerHTML, '<p>\u201cThis \u2018text with an inner <em>emphasis</em>\u2019 should be smart, too.</p><p>\u201cSuper smart.\u201d</p>');
    t.end();
  });

  test('retaining proper substrings inside tag', t => {
    var four = document.getElementById('four');
    t.match(four.innerHTML, 'Maar Mees');
    t.end();
  });

  test('does not alter script tags', t => {
    var script = document.getElementsByTagName('SCRIPT')[0];
    t.match(script.innerHTML, 'unchanged = "text"');
    t.end();
  });

  t.end();

});
