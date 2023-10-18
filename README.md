# ODOO Module
# Event Website with Interactive Event Site Map

## Overview

This is a custom module developed for the Odoo platform to enhance event management. The module allows administrators to create event websites with interactive event site maps. Users can easily navigate and interact with the event site map, view section details, and reserve tickets for specific sections.

![Interactive Event Site Map](link-to-your-image.png)

## Features

- **Event Management:** Create and manage events using the Odoo platform.
- **Interactive Event Site Map:** Add an interactive SVG map of the event site to your event website.
- **Section Details:** Each section on the map can display its capacity, code, and an associated image.
- **Ticket Reservation:** Users can click on sections to reserve and purchase tickets.

## Installation

1. Clone the repository to your Odoo addons directory.

   ```bash
   git clone https://github.com/prettyangell/ODOO-module.git
2. Start your Odoo and include the new module:
   ```bash
   ./odoo-bin --addons-path=./pfe,addons -d pfe -u event_pfe
3. Install the module from the Odoo web interface.

   
## Usage

Utilizing this module is straightforward and enhances event management in Odoo. Follow these steps to leverage its capabilities:

1.Create an Event:

Access the Events module within Odoo.
Create a new event and input essential event details.
2. Add an Interactive Event Site Map:

In the administrator section, select the event you wish to enhance.
Upload an interactive SVG map of the event site.
Define individual sections on the map, specifying their capacity, code, and images for reference.
3.Publish the Event Website:

As soon as the interactive map is uploaded, it will automatically be displayed on the event website for public access.
User Interaction:

Website visitors can explore the interactive map.
By clicking on specific sections, they can access detailed information and reserve tickets (that you provided in the administrator side) directly.
