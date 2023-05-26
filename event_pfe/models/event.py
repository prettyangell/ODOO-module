from odoo import fields, api, models


class event_inherit(models.Model):
    _inherit = "event.event"

    event_site_id = fields.Many2one(
        "event.site", string="event site", required=True)

    event_site_image = fields.Binary(
        related="event_site_id.image",
        string="Event Site Image",
        readonly=True
    )
