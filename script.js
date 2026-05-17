/* === TOAST === */
  function showToast(msg, type='success') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast toast-${type} show`;
    setTimeout(() => t.classList.remove('show'), 3200);
  }
 
  /* === TYPING EFFECT === */
  const texts = ['Data Analyst','BI Developer','Web Developer','Problem Solver'];
  let ti=0,ci=0,del=false;
  const typEl = document.getElementById('typing-text');
  function type() {
    const cur = texts[ti];
    if(!del){ typEl.textContent = cur.slice(0,++ci); if(ci===cur.length){del=true;setTimeout(type,1300);return;} }
    else { typEl.textContent = cur.slice(0,--ci); if(ci===0){del=false;ti=(ti+1)%texts.length;} }
    setTimeout(type, del?50:80);
  }
  type();
 
  /* === NAV TOGGLE === */
  document.getElementById('menu-toggle').addEventListener('click',()=>{
    document.getElementById('nav-links').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
    document.getElementById('nav-links').classList.remove('open');
  }));
 
  /* === SKILLS TABS === */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      skillCards.forEach(c => {
        c.classList.toggle('active', cat==='all' || c.dataset.cat===cat);
      });
      // re-animate bars
      setTimeout(animateBars, 100);
    });
  });
 
  /* === SKILL BARS === */
  function animateBars() {
    document.querySelectorAll('.skill-card.active .skill-fill').forEach(b => {
      b.style.width = '0';
      setTimeout(() => b.style.width = b.dataset.pct + '%', 50);
    });
  }
 
  /* === SCROLL REVEAL === */
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('visible');
        if(e.target.querySelector('.skill-fill')) animateBars();
      }
    });
  }, { threshold:0.12 });
  revealEls.forEach(el => obs.observe(el));
 
  /* === SKILLS OBSERVER (initial) === */
  const skillSec = document.getElementById('skills');
  const skillObs = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) { animateBars(); skillObs.disconnect(); }
  }, { threshold:0.2 });
  skillObs.observe(skillSec);
 
  /* === DOWNLOAD CV === */
  document.querySelectorAll('#download-cv, #download-cv-2').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); window.open('/src/Sandip-Yedage-Resume.pdf','_blank'); });
  });
 
  /* === CONTACT FORM === */
  document.getElementById('send-msg').addEventListener('click', () => {
    const n = document.getElementById('cf-name').value.trim();
    const e = document.getElementById('cf-email').value.trim();
    const m = document.getElementById('cf-msg').value.trim();
    if(!n||!e||!m){ showToast('Please fill in all fields.','error'); return; }
    if(!/\S+@\S+\.\S+/.test(e)){ showToast('Please enter a valid email.','error'); return; }
    showToast('Message sent! I\'ll get back to you soon. 🚀');
    document.getElementById('cf-name').value='';
    document.getElementById('cf-email').value='';
    document.getElementById('cf-msg').value='';
  });