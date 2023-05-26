from odoo import models, fields, api


class SectionPlace(models.Model):
    _name = "section.place"
    _description = "dzdazdza"

    code_section = fields.Char(
        string="code",
        required=True)
    capacity = fields.Integer(
        string="capacité",
        required=True)
    image = fields.Binary(
        string="images")
    event_site_id = fields.Many2one(
        "event.site",
        string="site",
        required=True)

    def name_get(self):
        result = []
        for rec in self:
            result.append([rec.id, rec.code_section])
        return result
