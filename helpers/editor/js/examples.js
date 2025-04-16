const examples = {
    home: `{
    "name": "Home",
    "type": "home",
    "location": "./",
    "fileName": "home",
    "topSection": [
        {
            "name": "Block title",
            "description": "",
            "items": [
                {
                    "title": "Page name",
                    "url": "Relative address",
                    "description": "Short description"
                },
                {
                    "title": "Page name",
                    "url": "Relative address",
                    "description": "Short description"
                }
            ]
        },
        {
            "name": "Block title",
            "description": "",
            "items": [
                {
                    "title": "Page name",
                    "url": "Relative address",
                    "description": "Short description",
                    "pill": "text label"
                },
                {
                    "title": "Page name",
                    "url": "Relative address",
                    "description": "Short description",
                    "pill": "text label"
                }
            ]
        },
        {
            "name": "Block title",
            "description": "",
            "items": [
                {
                    "title": "Page name",
                    "url": "Relative address",
                    "description": "Short description"
                },
                {
                    "title": "Page name",
                    "url": "Relative address",
                    "description": "Short description"
                }
            ]
        }
    ],
    "linkBlocks": [
        {
            "name": "Block title",
            "items": [
                {
                    "title": "Page name",
                    "url": "Relative address"
                },
                {
                    "title": "Page name",
                    "url": "Relative address"
                }
            ]
        }
    ]
}
`,
    basic: `{
    "name": "Page name",
    "type": "basic",
    "location": "./{location}",
    "fileName": "markdown filename",
    "breadcrumb": [{
        "title": "Page name",
        "url": "Relative address"
    }],
    "related": [{
        "title": "Page name",
        "url": "Relative address"
    }, {
        "title": "Page name",
        "url": "Relative address"
    }]
}
`,
    navigation: `{
    "name": "Page name",
    "description": "Short description",
    "type": "navigation",
    "location": "./{location}",
    "fileName": "url slug",
    "breadcrumb": [],
    "tiles": [{
        "title": "Page name",
        "url": "Relative address",
        "description": "Short description"
    }, {
        "title": "Page name",
        "url": "Relative address",
        "description": "Short description"
    }]
}
`
}