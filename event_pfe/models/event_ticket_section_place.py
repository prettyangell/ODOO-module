from odoo import api, models, fields, _


class EventTicketSectionPlace(models.Model):
    _inherit = "event.event.ticket"

    section_id = fields.Many2one(
        "section.place",
        string="section",
        required=True,
        compute="_compute_available_sections"
    )

    @api.depends('event_id')
    def _compute_available_sections(self):
        for ticket in self:
            event_site_id = ticket.event_id.event_site_id
            if event_site_id:
                ticket.section_id = False
                ticket.section_id = self.env['section.place'].search([
                    ('event_site_id', '=', event_site_id.id)
                ], limit=1)
            else:
                ticket.section_id = False
