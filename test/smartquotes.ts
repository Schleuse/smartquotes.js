import smartquotes from '../lib';


test('smartquotes()', t => {

  test('detects and converts strings', t => {
    t.equal(smartquotes('"test"'), '\u201ctest\u201d');
    t.end();
  });

  test('detects and converts html documents', t => {

    const document = jsdom.jsdom(fs.readFileSync(path.join(__dirname, 'fixtures/basic.html')));
    const window = document.defaultView;

    var one = document.getElementById('one');
    var two = document.getElementById('two');

    test('converts individual elements if passed as an argument', t => {
      smartquotes(one);
      t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
      t.equal(two.innerHTML, 'Marshiness of \'Ammercloth\'s');
      t.end();
    });

    test('converts entire document if no argument is passed', t => {
      const _window = global.window;
      const _document = global.document;
      global.document = document;
      global.window = window;
      smartquotes();
      t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
      global.window = _window;
      global.document = _document;
      t.end();
    });

    t.end();

  });

  t.end();
});

test('smartquotes in a browser', function(t) {

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: [
      '../../dist/smartquotes.js',
      '../../node_modules/webcomponents.js/webcomponents-lite.js'
    ],
    onload: function (window) {

      test('it exists as a global variable', t => {
        t.ok(window.smartquotes);
        t.end();
      });

      test('it can react to DOM mutations', t => {
        var listener = window.smartquotes.listen();
        var addedNode = window.document.createElement('div');
        var changedNode = window.document.createElement('div');
        addedNode.innerHTML = 'Adding "this" node.';
        changedNode.innerHTML = 'No quotes.';
        window.document.body.appendChild(addedNode);
        window.document.body.appendChild(changedNode);
        t.equal(changedNode.innerHTML, 'No quotes.');
        changedNode.childNodes[0].data = "Changing \"this\" node.";
        setTimeout(() => {
          t.equal(addedNode.innerHTML, "Adding \u201cthis\u201d node.");
          t.equal(changedNode.textContent, "Changing \u201cthis\u201d node.");
          listener.disconnect();
          t.end();
        });
      });

      test('it does not replace text in an ignored tag', t => {
        var listener = window.smartquotes.listen();
        var addedNode = window.document.createElement('code');
        var changedNode = window.document.createElement('code');
        addedNode.innerHTML = 'Adding "this" node.';
        changedNode.innerHTML = 'No quotes.';
        window.document.body.appendChild(addedNode);
        t.equal(changedNode.innerHTML, 'No quotes.');
        window.document.body.appendChild(changedNode);
        changedNode.innerHTML = "Changing \"this\" node.";
        setTimeout(() => {
          t.notEqual(addedNode.innerHTML, "Adding \u201cthis\u201d node.");
          t.notEqual(changedNode.innerHTML, "Changing \u201cthis\u201d node.");
          listener.disconnect();
          t.end();
        });
      });

    }
  });
  t.end();

});
