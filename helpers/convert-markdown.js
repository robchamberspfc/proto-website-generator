const marked = require('marked');
const sanitizeHtml = require('sanitize-html');
const fs = require('node:fs');
const files = fs.readdirSync('./helpers/input');

console.log("Starting markdown conversion")

let lastUpdate = 'Last update: '
let dateTime = new Date().toLocaleString('en-GB')

//loop through all files in directory one at a time
for (i = 0; i < files.length; i++) {

  let name = files[i]
  name = name.replace(/.md/g, "");

  //read each markdown file
  fs.readFile(`./helpers/input/${files[i]}`, 'utf8', (err, markdown) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${name}: Reading markdown`)

    //changes to markdown pre-conversion
    // converter seems to only like 1 dash type for lists, so convert to the one it likes
    markdown = markdown.replace(/— /g, "- ");

    //convert to html
    let html = marked.parse(markdown);

    //changes to html post conversion

    //add current date
    html += `<hr><p><strong>${lastUpdate}</strong>${dateTime}</p>`

    //strip out google tags and make them IDs
    temp = (html.match(/<h2>/g) || []).length;
    for (i = 0; i < temp; i++) {

      startPos = html.indexOf("}") + "}".length;
      endPos = html.indexOf("{");
      targetText = html.substring(startPos, endPos).trim();

      html = html.replace(targetText, "")

      targetText = targetText.replace("{#", "")
      targetText = targetText.replace("}", "")

      id = `<h2 id="${targetText}">`

      html = html.replace("<h2>", id)
    }

    //add styles
    html = html.replaceAll("<h2 ", '<h2 class="mt-5 mb-4" ');
    html = html.replaceAll("<h3", '<h3 class="mt-3 mb-3" ');
    html = html.replaceAll("<h4", '<h4 class="mt-3 mb-3" ');
    html = html.replaceAll("<h5", '<h5 class="mt-3 mb-3" ');
    html = html.replaceAll("<ul>", '<ul class="ms-4">');
    html = html.replaceAll("<table>", '<table class="table table-striped">');
    html = html.replaceAll("<thead>", '<thead class="thead-dark">');

    //sanitise HTML to make sure no nasties
    const output = sanitizeHtml(html, {
      allowedTags: ['img', 'p', 'h1','h2','h3','h4','h5','h6','ul','li','ol','a','blockquote','i','strong','table','thead','th','tr','td'],
      allowedClasses: {
        'h2': ['mt-5','mb-4'],
        'h3': ['mt-3','mb-3'],
        'h4': ['mt-3','mb-3'],
        'h5': ['mt-3','mb-3'],
        'ul': ['ms-4'],
        'table': ['table', 'table-striped'],
        'thead': ['thead-dark']
      },
      allowedAttributes: {
        'h2': ["id"],
        'a': ["href"],
        'img':["src", "align","alt"]
      },
      allowedSchemes: [ 'data', 'http', 'https']
    });

    console.log(`${name}: Output HTML`)

    //write files to location to be included in app
    fs.writeFileSync(`./app/_includes/_markdown-${name}.html`, output);
  });
}
