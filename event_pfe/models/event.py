from odoo import fields, api, models


class event_inherit(models.Model):
    _inherit = "event.event"

    event_site_id = fields.Many2one(
        "event.site", string="event site", required=True)
