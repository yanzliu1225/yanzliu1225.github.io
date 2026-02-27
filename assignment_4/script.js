// ============================================================
// TUTORIAL 4: JAVASCRIPT FUNDAMENTALS
// RSVP card — wire up the behavior
// ============================================================
//
// BEFORE YOU START: open the browser console (F12 → Console)
// You'll use it to check your work throughout.
//
// Run this any time to see the current state of your variables:
//   checkStatus()
//
// ============================================================

// ── 1. DATA: what are we tracking? ──────────────────────────

let isGoing    = false;
let isNotGoing = false;

// ── 2. ELEMENTS: find everything we'll need ─────────────────


const nameInput = document.querySelector('#name-input');
const guestInput   = document.querySelector('#guest-input');
const guestField   = document.querySelector('#guest-field');

// Try getting the yes, no, confirmation and regret elements from the html.
const btnYes       = document.querySelector('#btn-yes');
const btnNo        = document.querySelector('#btn-no');
const confirmation = document.querySelector('#confirmation');
const regret       = document.querySelector('#regret');


// ── 3. HELPERS: small functions that do one thing ───────────

const getName = () => {
  const raw = nameInput.value.trim();
  return raw || 'Someone';
};

const getGuests = () => Number(guestInput.value);


// ── 4. TASK 1 & 2: wire up the YES button ───────────────────

btnYes.addEventListener('click', () => {

  isGoing = true;
  isNotGoing = false;

  btnYes.classList.add('active');
  btnNo.classList.remove('active');

  guestField.classList.remove('hidden');

  confirmation.classList.remove('hidden');
  regret.classList.add('hidden');

  updateConfirmation();
});

btnNo.addEventListener('click', () => {

  isGoing = false;
  isNotGoing = true;

  btnNo.classList.add('active');
  btnYes.classList.remove('active');

  guestField.classList.add('hidden');

  confirmation.classList.add('hidden');
  regret.classList.remove('hidden');

  regret.textContent = `Sorry to miss you, ${getName()}!`
});


// ── 5. TASK 3 & 4: build the confirmation message ───────────

const updateConfirmation = () => {

  const guests = getGuests();
  let guestLine;

  if (guests === 0) {
    guestLine = 'flying solo.';
  } else if (guests === 1) {
    guestLine = 'bringing 1 guest.';
  } else {
    guestLine = `bringing ${guests} guests.`;
  }

  confirmation.textContent = `${getName()} is coming — ${guestLine}`;
};

// ── 6. TASK 5: live updates ──────────────────────────────────

nameInput.addEventListener('input', () => {

  if (isGoing) {
  updateConfirmation();
  }

  if (isNotGoing) {
    regret.textContent = `Sorry to miss you, ${getName()}!`;
  }

});

guestInput.addEventListener('input', () => {

  if (isGoing) {
    updateConfirmation();
  }

});

// ── DEBUGGING ────────────────────────────────────────────────
//
// Type checkStatus() in the browser console to see current variable values.

const checkStatus = () => {
  console.log('=== current state ===');
  console.log('isGoing:    ', isGoing);
  console.log('isNotGoing: ', isNotGoing);
  console.log('name:       ', nameInput.value);
  console.log('guests:     ', getGuests(), '(type:', typeof getGuests(), ')');
  console.log('raw value:  ', guestInput.value, '(type:', typeof guestInput.value, ')');
  console.log('====================');
};

// Type resetCard() in the browser console to clear everything and start over.

const resetCard = () => {
  isGoing    = false;
  isNotGoing = false;

  nameInput.value  = '';
  guestInput.value = '0';

  btnYes.classList.remove('active');
  btnNo.classList.remove('active');

  guestField.classList.add('hidden');
  confirmation.classList.add('hidden');
  regret.classList.add('hidden');

  confirmation.textContent = '';
  regret.textContent       = '';

  console.log('Card reset.');
};