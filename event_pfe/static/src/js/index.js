

const pathElements = document.querySelectorAll("path");
const popup = document.querySelectorAll(".popup")[0];
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


const ticket_items = document.querySelector('.ticket_item');

// reserved_tickets management
const reserved_tickets = []
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
  ticket_to_remove.dom_element.style.display = 'none';
  reserved_tickets = reserved_tickets.filter((element) => element.code != code)
}

// ticket item close button management
Array.from(ticket_items).forEach((ticket_item) => {
  const close_btn = ticket_item.querySelector('.close-btn')
  close_btn.addEventListener("click", (e) => {
    // e.preventDefault();
    remove_reservation(ticket_item.id);
    // state update
  })
})

let activePopup = null;

function showPopup() {
  alert("done");
}
console.log(pathElements)



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

registration.addEventListener('click', (e) => {

  
  // use reserved_tickets
  // copy of the old registration code
})
