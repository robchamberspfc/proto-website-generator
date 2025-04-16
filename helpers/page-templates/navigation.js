module.exports = (data) => {
    //create breadcrumb
    breadcrumb = ''

    if (data.breadcrumb != null) {
        for (j = 0; j < data.breadcrumb.length; j++) {
            breadcrumb += `
                <li class="breadcrumb-item"><a href="${data.breadcrumb[j].url}">${data.breadcrumb[j].title}</a></li>`
        }
    }
    
    breadcrumb += `
                <li class="breadcrumb-item active" aria-current="page">${data.name}</li>`

    //create cards
    cards = ''

    for (k = 0; k < data.tiles.length; k++) {

        let pill = ''

        if (data.tiles[k].pill != null) {
            pill = `<span class="badge text-bg-secondary p-2 rounded-0">${data.topSection[j].items[k].pill}</span>`
        }

        cards += `
                    <div class="col col-12 col-lg-4 col-md-6 pb-4">
                        <div class="card mb-4 card-navigation rounded-0 h-100">
                            <div class="card-body">
                                 <div class="col-md-12">
                                    <h2 class="h3 card-text">
                                     <a href="${data.tiles[k].url}" class="stretched-link card-navigation">
                                            ${data.tiles[k].title}</a></h2>
                                    <p class="card-text">${data.tiles[k].description}</p>
                                </div>
                            </div>
                            <div class="card-footer card-navigation border-0">
                            <div class="row pb-0">
                                <div class="col-md-8">
                                    <i class="bi bi-arrow-right-short h2"></i>
                                </div>
                                <div class="col-md-4 mt-1">${pill}</div>
                            </div>
                        </div>
                    </div>
                </div>`
    }

    let html = `---
layout: basic
title: ${data.name}
---

<main role="main" id="content" tabindex="-1">
    <div class="container">
        <nav aria-label="breadcrumb" class="mt-4">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>${breadcrumb}
            </ol>
        </nav>
        <div class="row">
            <div class="col-md-7">
                <h1 class="mt-5 pt-4 mb-5 pb-4">${data.name}</h1>
            </div>
        </div>
            <div class="row mb-3">
             ${cards}
             </div>
        </div>
    </div>
</main>`

    return html
}