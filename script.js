/* === TOAST === */
  function showToast(msg, type='success') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast toast-${type} show`;
    setTimeout(() => t.classList.remove('show'), 3200);
  }
 
  /* === NAV TOGGLE === */
  document.getElementById('menu-toggle').addEventListener('click',()=>{
    document.getElementById('nav-links').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
    document.getElementById('nav-links').classList.remove('open');
  }));
 
  /* === SCROLL REVEAL === */
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold:0.12 });
  revealEls.forEach(el => obs.observe(el));
 
  /* === CONTACT FORM === */
  const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('send-msg');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  const res = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (res.ok) {
    showToast("Message sent! I'll get back to you soon.");
    form.reset();
  } else {
    showToast('Something went wrong. Try emailing directly.', 'error');
  }

  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  btn.disabled = false;
});