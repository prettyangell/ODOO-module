from odoo import models, fields, api
from odoo.exceptions import ValidationError
import base64
import xml.etree.ElementTree as ET


class SiteEevent(models.Model):
    _name = "event.site"
    _description = "handling event sites"

    name = fields.Char(string="nom", required=True)
    capacity = fields.Integer(string="capacité", required=True)
    image = fields.Binary(string="image", required=True)
    adress = fields.Char(string="adresse", required=True)
    section_ids = fields.One2many(
        "section.place", "event_site_id", string="sections", required=True)

    @api.constrains("image")
    def _check_image(self):
        for rec in self:
            image_data = base64.b64decode(rec.image)
            decoded_string = image_data.decode('utf-8')
            # print(decoded_string)
            tree = ET.fromstring(decoded_string)
            paths = tree.findall(".//{http://www.w3.org/2000/svg}path")
            for path in paths:
                code = path.get('code')
                print(code)
                if code:
                    # Create section.place record
                    self.env['section.place'].create({
                        'event_site_id': rec.id,
                        'code_section': code,
                        'capacity': 10,
                    })
                    print("created with success!")
