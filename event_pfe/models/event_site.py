from odoo import models, fields, api


class SiteEevent(models.Model):
    _name = "event.site"
    _description = "handling event sites"

    name = fields.Char(string="nom", required=True)
    capacity = fields.Integer(string="capacité", required=True)
    image = fields.Binary(string="image")
