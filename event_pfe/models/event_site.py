from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import base64
import os
import xml.etree.ElementTree as ET

STATE_DRAFT = 'draft'
STATE_CONFIRMED = 'confirmed'
STATES = [
    (STATE_DRAFT, _("Draft")),
    (STATE_CONFIRMED, _("Confirmed"))
]


class SiteEvent(models.Model):
    _name = "event.site"
    _description = _("handling event sites")

    name = fields.Char(
        string=_("Name"),
        required=True
    )
    capacity = fields.Integer(
        string=_("Capacity"),
        required=True
    )
    image = fields.Binary(
        string=_("Image"),
        required=True
    )
    address = fields.Char(
        string=_("Address"),
        required=True
    )
    section_ids = fields.One2many(
        "section.place",
        "event_site_id",
        string=_("sections"),
        required=True
    )
    state = fields.Selection(
        STATES,
        default=STATE_DRAFT,
        copy=False,
        required=True
    )
    event_ids = fields.One2many(
        "event.event",
        "event_site_id",
        string=_("events"),
        required=True
    )

    @api.constrains("image")
    def _check_image(self):
        for rec in self:
            if rec.state == STATE_DRAFT:
                rec.section_ids.unlink()
                image_data = base64.b64decode(rec.image)
                decoded_string = image_data.decode('utf-8')
                tree = ET.fromstring(decoded_string)
                paths = tree.findall(".//{http://www.w3.org/2000/svg}path")
                for path in paths:
                    code = path.get('code')
                    print(code)
                    if code:
                        # Create section.place record
                        section_place = self.env['section.place'].create({
                            'event_site_id': rec.id,
                            'code_section': code,
                            'capacity': 0,
                        })
                        # Set image field of section.place
                        image_filename = code.replace("secp", '') + '.jpg'
                        image_path = '/home/yousra/Projects/odoo/pfe/event_pfe/static/img/Stadiumpics/' + image_filename
                    

                        if os.path.exists(image_path):
                            with open(image_path, 'rb') as image_file:
                                section_place.image = base64.b64encode(
                                    image_file.read())

    @api.onchange("state")
    def _check_state(self):
        if self.state == STATE_CONFIRMED:
            print("yes")
            self = self.with_context(readonly_fields=['image'])

    def action_confirm(self):
        for rec in self:
            rec.state = STATE_CONFIRMED

    def action_draft(self):
        for rec in self:
            rec.state = STATE_DRAFT

    def website_get_svg(self):
        image_data = base64.b64decode(self.image)
        decoded_string = image_data.decode('utf-8')
        return decoded_string

