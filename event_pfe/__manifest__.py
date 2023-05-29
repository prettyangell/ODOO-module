{
    'name': 'Site_Event',
    'depends': ['base', 'event', 'event_sale', 'website_event'],
    'application': True,
    'data': [
        'security/ir.model.access.csv',
        'views/event_site_views.xml',
        'views/section_place_views.xml',
        'views/event_menus_view.xml',
        'views/website_event_update.xml',

    ],
    'assets':{
        'web.assets_frontend':[
            'event_pfe/static/src/js/index.js',
        ]
    }
}
