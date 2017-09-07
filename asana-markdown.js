function formatDocument() {
  const description = document.getElementsByClassName("TaskDescription")[0];
  const stories = document.getElementsByClassName("RichText");

  if (description) {
    formatText(description);
  }

  for (let i=0; i<stories.length; i++) {
    formatText(stories[i]);
  }
}

function formatText(elem) {
  const title_regex = /#+ ([^<]+)(?=<\/)/g;
  const italic_regex = /_([^_<"]+)_/g;
  const italic_star_regex = /\*([^\*<"]+)\*/g;
  const bold_regex = /__([^_])__/g;
  const bold_star_regex = /\*\*([^\*]+)\*\*/g;
  const code_regex = /`([^`]+)`/g;
  const code_block_regex = /```([^`]+)```/g;

  elem.innerHTML = elem.innerHTML
    .replace(code_block_regex, "<code>$1</code>")
    .replace(code_regex, "<code>$1</code>")
    .replace(title_regex, "<b>$1</b>")
    .replace(bold_regex, "<b>$1</b>")
    .replace(italic_regex, "<i>$1</i>")
    .replace(bold_star_regex, "<b>$1</b>")
    .replace(italic_star_regex, "<i>$1</i>");
}

var oldLocation;

function locationListener() {
  if (oldLocation !== window.location.href) {
    oldLocation = window.location.href;
    window.setTimeout(formatDocument, 200);
  }

  window.setTimeout(locationListener, 100);
}

window.addEventListener("load", locationListener);
