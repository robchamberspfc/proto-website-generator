const fs = require('node:fs');
const location = require('./page-templates/location.js');
const navigation = require('./page-templates/navigation.js');
const simpleContent = require('./page-templates/simple-content.js');
const home = require('./page-templates/home.js');

const includes = fs.readdirSync('app/_includes');

//load config js file
fs.readFile(`./helpers/new-pages.json`, 'utf8', (err, newPages) => {
    if (err) {
        console.error(err);
        return;
    }

    newPages = JSON.parse(newPages)

    //loop through pages file
    for (i = 0; i < newPages.length; i++) {

        console.log(`${newPages[i].name}: Creating`)

        // if not a navigation page we need to check markdown exists
        if (newPages[i].type == "basic") {

            markdownExists = includes.indexOf(`_markdown-${newPages[i].fileName}.html`)

            if (markdownExists != -1) {

                //create folder structure
                fs.mkdirSync(`app/${newPages[i].location}`, {
                    recursive: true
                }, (err) => {
                    if (err) throw err;
                });

                //create html
                let includePage = simpleContent(newPages[i])

                //write page to location
                fs.writeFileSync(`app/${newPages[i].location}/index.html`, includePage);

            }

        } else if (newPages[i].type == "home") {

            //create html
            let includePage = home(newPages[i])

            //write page to location
            fs.writeFileSync(`app/index.html`, includePage);

        } else {

            //create folder structure
            fs.mkdirSync(newPages[i].location, {
                recursive: true
            }, (err) => {
                if (err) throw err;
            });

            //create html
            let includePage = navigation(newPages[i])

            //write page to location
            fs.writeFileSync(`app/${newPages[i].location}/index.html`, includePage);
        }

        console.log(`${newPages[i].name}: Finished`)
    }
})