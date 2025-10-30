// ===== Login Logic =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    if (username === "admin" && password === "1234") {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = "home.html";
    } else {
      errorMsg.classList.remove('hidden');
    }
  });
}

// ===== Protect Home Page =====
if (window.location.pathname.includes('home.html')) {
  const loggedIn = localStorage.getItem('isLoggedIn');
  if (!loggedIn) window.location.href = "index.html";
}

// ===== Logout Logic =====
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "index.html";
  });
}

// ===== Booking Modal =====
const bookingModal = document.getElementById('bookingModal');
const bookNowBtn = document.getElementById('bookNowBtn');
const closeModal = document.getElementById('closeModal');
const confirmBooking = document.getElementById('confirmBooking');
const destinationSelect = document.getElementById('destination');
const bookingCard = document.getElementById('bookingCard');

// Destination backgrounds
const destinationImages = {
  mountain: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  desert: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  forest: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  city: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=80"
};

// Open/Close Modal
if (bookNowBtn) bookNowBtn.addEventListener('click', () => bookingModal.classList.remove('hidden'));
if (closeModal) closeModal.addEventListener('click', () => bookingModal.classList.add('hidden'));

// Change background dynamically
if (destinationSelect) {
  destinationSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (destinationImages[selected]) {
      bookingCard.style.backgroundImage = `url('${destinationImages[selected]}')`;
    } else {
      bookingCard.style.backgroundImage = "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')";
    }
  });
}

// Confirm Booking
if (confirmBooking) {
  confirmBooking.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const destination = document.getElementById('destination').value.trim();
    if (name && destination) {
      alert(`🎉 Booking Confirmed!\nName: ${name}\nDestination: ${destination}`);
      bookingModal.classList.add('hidden');
    } else {
      alert("⚠️ Please fill in all fields!");
    }
  });
}
