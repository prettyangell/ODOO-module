

const pathElements = document.querySelectorAll("path");
const popup = document.querySelectorAll(".popup_holder")[0];
// popup.style.display = none

function get_path_element_code(pathElement) {
  const codeAttribute = pathElement.getAttribute("code");
  return codeAttribute;
}

function get_ticket_item_from_path_element(pathElement) {
  const code = get_path_element_code(pathElement);
  const ticket_item = document.getElementById(code);
  return ticket_item
}


const ticket_items = document.querySelectorAll('.ticket_item');

// reserved_tickets management
let reserved_tickets = []
function add_reservation(reservation) {
  if (!reservation.code || !reservation.dom_element) {
    throw new Error('Missing attribute in reservation !');
  }
  reservation.dom_element.style.display = 'block';
  reserved_tickets.push(reservation);

}
function remove_reservation(code) {
  if (typeof code != 'string') {
    throw Error('code passed is not string');
  }
  const ticket_to_remove = reserved_tickets.findIndex((value) => value.code == code)
  // ticket_to_remove.dom_element.style.display = 'none';
  reserved_tickets = reserved_tickets.filter((element) => element.code != code)
}

// ticket item close button management
Array.from(ticket_items).forEach((ticket_item) => {
  const close_btn = ticket_item.querySelector('.close-btn')
  console.log(close_btn)
  close_btn.addEventListener("click", (e) => {
     e.preventDefault();
     ticket_item.style.display="none";
     remove_reservation(ticket_item.id);
    // state update
  })
})

let activePopup = null;

function showPopup() {
  alert("done");
}




// we extract the valid ticket_items
const active_path_element = Array.from(pathElements).filter((pathElement) => {
  return !!get_ticket_item_from_path_element(pathElement)
})





active_path_element.map((pathElement) => {
  pathElement.style.backgroundColor = 'green';

  const ticket_item = get_ticket_item_from_path_element(pathElement)

  pathElement.addEventListener("click", () => {

    add_reservation({
      code: get_path_element_code(pathElement),
      dom_element: ticket_item
    })

    if (!popup.classList.contains('show')) {
      popup.classList.add('show')
    }

    // state update

  });

});

const registration = document.getElementById('main_registration');

odoo.define('custom_module.custom_event', function (require) {
  var EventRegistrationForm = require('website_event.website_event');
  var ajax = require('web.ajax');
var core = require('web.core');
var Widget = require('web.Widget');
var publicWidget = require('web.public.widget');

var _t = core._t;
  
  EventRegistrationForm.include({
      start: function () {
          var self = this;
          var res = this._super.apply(this, arguments).then(function () {
              $('#registration_form #main_registration')
                  .off('click')
                  .click(function (ev) {
                      self.on_click(ev);
                  })
                  .prop('disabled', false);
          });
          return res;
      },

      on_click: function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          var $form = $(ev.currentTarget).closest('form');
          var $button = $(ev.currentTarget).closest('[type="submit"]');
          var post = {};
          $('#registration_form table').siblings('.alert').remove();
          $('#registration_form select#test').each(function () {
              post[$(this).attr('name')] = $(this).val();
          });
          var tickets_ordered = _.some(_.map(post, function (value, key) { return parseInt(value); }));
          if (!tickets_ordered) {
              $('<div class="alert alert-info"/>')
                  .text(_t('Please select at least one ticket.'))
                  .insertAfter('#registration_form table');
              return new Promise(function () {});
          } else {
              $button.attr('disabled', true);
              return ajax.jsonRpc($form.attr('action'), 'call', post).then(function (modal) {
                  var $modal = $(modal);
                  $modal.modal({backdrop: 'static', keyboard: false});
                  $modal.find('.modal-body > div').removeClass('container');
                  $modal.appendTo('body').modal();
                  $modal.on('click', '.js_goto_event', function () {
                      $modal.modal('hide');
                      $button.prop('disabled', false);
                  });
                  $modal.on('click', '.close', function () {
                      $button.prop('disabled', false);
                  });
              });
          }
      }
  });

  return EventRegistrationForm;
});



// registration.addEventListener('click', (e) => {

  

  
//   // use reserved_tickets
//   // copy of the old registration code
// })
