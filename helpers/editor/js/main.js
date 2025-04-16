const url = "https://raw.githubusercontent.com/robchamberspfc/data-standards/refs/heads/main/helpers/new-pages.json"
const selectMenu = document.getElementById("pageSelect")
const newPageButton = document.getElementById("newPageButton")
const radioButtons = document.getElementById("pageTypes")
const count = document.getElementById("count")
const pageTypes = Object.keys(examples)

let k=0
let pages = []

async function pageLoad() {
    const response = await fetch(url)
    pages = await response.json()
    populateSelect(pages)
}

populateSelect = (data) => {
    selectMenu.options.length = 1;
    for (i = 0; i < data.length; i++) {
        selectMenu.options[selectMenu.options.length] = new Option(data[i].name, i)
    }
}

displayPage = () => {
    selectMenu.disabled = true
    newPageButton.disabled = true
    let selection = selectMenu.selectedOptions[0].value
    let pageJSON = JSON.stringify(pages[selection], null, 4)
    document.getElementById("edit").hidden = false
    document.getElementById("currentEdit").value = pageJSON
    getExample (pages[selection].type, "exampleEdit")
}

getExample = (type, location) => {
    document.getElementById(`${location}`).value = examples[type]
}

createPage = () => {
    selectMenu.disabled = true
    newPageButton.disabled = true
    document.getElementById("new").hidden = false
    let radioButtonsCode = ""
    for (i = 0; i < pageTypes.length; i++) {
        radio = `<div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="pageTypes" id="pageTypes${i}" onclick="getExample('${pageTypes[i]}','newEdit')">
            <label class="form-check-label" for="pageTypes${i}">
                ${pageTypes[i]}
            </label>
        </div>`
        radioButtonsCode += radio
    }
    radioButtons.innerHTML = radioButtonsCode
}

saveEdit = () => {
    let selection = selectMenu.selectedOptions[0].value
    pages[selection] = JSON.parse(document.getElementById("currentEdit").value)
    document.getElementById("edit").hidden = true
    softReset ()
}

saveNew = () => {
    newPageContent = JSON.parse(document.getElementById("newEdit").value)
    pages.push(newPageContent)
    document.getElementById("new").hidden = true
    softReset ()
}

softReset = () => {
    selectMenu.value = "Select page"
    selectMenu.disabled = false
    newPageButton.disabled = false
    k++
    count.innerHTML=k
    populateSelect(pages)
}

reset = () => {
    selectMenu.disabled =  false
    k=0
    count.innerHTML=k
    document.getElementById("edit").hidden = true
    document.getElementById("new").hidden = true
    pageLoad()
}

downloadJSON = () => {
    let jsonOutput = JSON.stringify(pages, null, 4)
    let blob = new Blob([jsonOutput], {type: "application/json"})
    let url  = window.URL.createObjectURL(blob)
    let fileName = "pages.json"
    let link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
}