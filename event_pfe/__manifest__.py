{
    'name': 'Site_Event',
    'depends': ['base', 'event'],
    'application': True,
    'data': [
        'security/ir.model.access.csv',
        'views/event_site_views.xml',
        'views/event_menus_view.xml',

    ]
}
