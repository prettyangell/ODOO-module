from odoo import api, models, fields, _


class EventTicketSectionPlace(models.Model):
    _inherit = "event.event.ticket"

    section_id = fields.Many2one(
        "section.place",
        string="section",
        required=True,
    )
