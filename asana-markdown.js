function elementsToFormat() {
  const description = document
    .getElementsByClassName("TaskDescription-textEditor")[0];
  const stories = document.getElementsByClassName("RichText");

  const elements = description && !description.classList.contains("is-focused")
    ? [description]
    : [];

  for (let i=0; i<stories.length; i++) {
    elements.push(stories[i]);
  }

  return elements;
}

function formatElem(elem) {
  const title_regex = /#+ ([^<]+)(?=<)/g;
  const italic_regex = /(\s|>)_([^_<"]+)_/g;
  const italic_star_regex = /(\s|>)\*([^\*<"]+)\*/g;
  const bold_regex = /(\s|>)__([^_]+)__/g;
  const bold_star_regex = /(\s|>)\*\*([^\*]+)\*\*/g;
  const code_regex = /`([^`]+)`/g;
  const code_block_regex = /```([^`]+)```/g;

  elem.innerHTML = elem.innerHTML
    .replace(code_block_regex, "<code>$1</code>")
    .replace(code_regex, "<code>$1</code>")
    .replace(title_regex, "<b>$1</b>")
    .replace(bold_regex, "$1<b>$2</b>")
    .replace(italic_regex, "$1<i>$2</i>")
    .replace(bold_star_regex, "$1<b>$2</b>")
    .replace(italic_star_regex, "$1<i>$2</i>");
}

var oldDOM = 0;

/* hash function used to do quick-enough dom diffing
 * from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method
 */
String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length == 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function maybeFormatElements() {
  const elems = elementsToFormat();

  const newDOM = elems.reduce(
      (accum, elem) => (accum << 5 - accum) + elem.innerHTML.hashCode(), 0);

  if (newDOM !== oldDOM) {
    elems.map(formatElem);
    oldDOM = elems.reduce(
      (accum, elem) => (accum << 5 - accum) + elem.innerHTML.hashCode(), 0);
  }

  window.setTimeout(maybeFormatElements, 100);
}

window.addEventListener("load", maybeFormatElements);
