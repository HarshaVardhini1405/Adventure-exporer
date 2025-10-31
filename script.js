/* script.js - shared actions for WanderScape
   Handles: search, explore button, destination filters, booking form submission,
   simple login (mock), and small UI interactions.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Hero image gentle zoom toggle if present
  const heroBg = document.querySelector('.hero .bg');
  if (heroBg) setTimeout(()=> heroBg.classList.toggle('zoom'), 800);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Explore Now - uses search inputs if present
  const exploreBtn = document.querySelector('#exploreNowBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const loc = document.querySelector('#search-location')?.value || '';
      // go to destinations page with a simple query param
      const q = loc ? `?q=${encodeURIComponent(loc)}` : '';
      window.location.href = `destinations.html${q}`;
    });
  }

  // Destination filter buttons
  const filters = document.querySelectorAll('.filter-btn');
  if (filters.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        document.querySelectorAll('.filter-btn[data-group="'+group+'"]').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
  }

  // Booking form submit
  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm){
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const name = data.get('name');
      const destination = data.get('destination');
      showConfirmation({name, destination, details: Object.fromEntries(data)});
      bookingForm.reset();
    });
  }

  // Login form (mock)
  const loginForm = document.querySelector('#loginForm');
  if (loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const mail = loginForm.querySelector('input[type="email"]').value;
      // Mock success
      alert(`Welcome back, ${mail.split('@')[0] || 'traveler'}! (This is a mock login)`);
      loginForm.reset();
      window.location.href = 'index.html';
    });
  }

  // Read query on destinations page to pre-filter
  if (window.location.pathname.endsWith('destinations.html')) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if(q){
      document.querySelector('#search-location-dest')?.setAttribute('value', q);
      // option: filter cards by q term
      filterByText(q);
    }
  }
});

/* Show confirmation overlay */
function showConfirmation({name, destination, details}){
  let overlay = document.querySelector('.overlay-confirm');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'overlay-confirm';
    overlay.innerHTML = `
      <div class="confirm-card fade-in">
        <h3>Booking Confirmed</h3>
        <p class="small-muted">Thanks <strong>${escapeHtml(name)}</strong> — your booking for <strong>${escapeHtml(destination)}</strong> is confirmed!</p>
        <p class="small-muted">We emailed the details to you (mock). Have an amazing trip!</p>
        <div style="margin-top:0.8rem"><button id="closeConfirm" class="filter-btn">Close</button></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#closeConfirm').addEventListener('click', () => overlay.classList.remove('show'));
  }
  overlay.classList.add('show');
}

/* basic filter that toggles cards by data attributes */
function applyFilters(){
  const activeCategory = document.querySelector('.filter-btn[data-group="category"].active')?.dataset.value || 'all';
  const activeBudget = document.querySelector('.filter-btn[data-group="budget"].active')?.dataset.value || 'all';
  const activeCountry = document.querySelector('.filter-btn[data-group="country"].active')?.dataset.value || 'all';
  document.querySelectorAll('.dest-card').forEach(card=>{
    const cat = card.dataset.category;
    const bud = card.dataset.budget;
    const ctry = card.dataset.country;
    const match = (activeCategory==='all' || activeCategory===cat) &&
                  (activeBudget==='all' || activeBudget===bud) &&
                  (activeCountry==='all' || activeCountry===ctry);
    card.style.display = match ? '' : 'none';
  });
}

/* simple text filter */
function filterByText(text){
  const t = text.trim().toLowerCase();
  document.querySelectorAll('.dest-card').forEach(card=>{
    const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const country = (card.dataset.country || '').toLowerCase();
    const ok = title.includes(t) || country.includes(t);
    card.style.display = ok ? '' : 'none';
  });
}

/* Very small escape to avoid XSS in small mock output */
function escapeHtml(s){
  if(!s) return '';
  return String(s).replace(/[&<>"'`=\/]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#61;'}[c];});
}

