import element from './element';
import listen from './listen';
import string from './string';
import replacements from './replacements';


// The smartquotes function should just delegate to the other functions
function smartquotes(context?: Node) {
  if (context === undefined) {
    listen.runOnReady(() => element(document.body));
    return smartquotes;
  } else if (typeof context === 'string') {
    return string(context);
  } else {
    return element(context);
  }
}

export default Object.assign(smartquotes, {
  string,
  element,
  replacements,
  listen
});
