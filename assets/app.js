/* ===================== NETWORK PARTICLE AMBIENT BACKGROUND (every page) ===================== */
(function(){
  const canvas = document.getElementById('aurora'); // reusing the same canvas id used across pages
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const CYAN = '77,181,255';
  const COUNT = Math.min(55, Math.floor(window.innerWidth / 22));
  let W, H, pts;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  
  function makePoint(){
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.5 + 0.5
    };
  }

  function init(){
    resize();
    pts = Array.from({length: COUNT}, makePoint);
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > W) p.vx *= -1;
      if(p.y < 0 || p.y > H) p.vy *= -1;
    });
    for(let i = 0; i < pts.length; i++){
      for(let j = i+1; j < pts.length; j++){
        const dx   = pts[i].x - pts[j].x;
        const dy   = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const MAX  = 140;
        if(dist < MAX){
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${CYAN},${(1 - dist/MAX) * 0.6})`;
          ctx.lineWidth   = 1.2;
          ctx.stroke();
        }
      }
    }
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CYAN},0.9)`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', ()=>{ resize(); pts = Array.from({length: COUNT}, makePoint); });
  init();
  draw();
})();

/* ===================== NAV SCROLL + MOBILE MENU ===================== */
(function(){
  const header = document.getElementById('siteHeader');
  if(header){
    window.addEventListener('scroll', ()=>{ header.classList.toggle('scrolled', window.scrollY > 30); });
  }
  window.toggleMobile = function(){
    const b = document.getElementById('burger');
    const m = document.getElementById('mobileMenu');
    if(b) b.classList.toggle('open');
    if(m) m.classList.toggle('open');
  };
})();

/* ===================== LIQUID GLASS CURSOR HIGHLIGHT ===================== */
document.querySelectorAll('.glass').forEach(el=>{
  el.addEventListener('mousemove', e=>{
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    el.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});

/* ===================== REVEAL ON SCROLL ===================== */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12});
  window.observeReveals = function(){ document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el)); };
  observeReveals();
})();

/* ===================== TERMINAL BOOT LINE (home only) ===================== */
(function(){
  const el = document.getElementById('bootLine');
  if(!el) return;
  const full = el.getAttribute('data-text') || '';
  let i = 0;
  el.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'caret';
  function type(){
    if(i <= full.length){
      el.textContent = full.slice(0,i);
      el.appendChild(caret);
      i++;
      setTimeout(type, 18);
    }
  }
  type();
})();

/* ===================== SHARE BUTTON (every page) ===================== */
document.querySelectorAll('[data-share]').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const shareData = {
      title: 'AWS Student Builder Community Day @ Rungta University',
      text: 'Free hands-on AWS community day for students — Sep 12, 2026 at Rungta University, Bhilai.',
      url: window.location.href
    };
    try{
      if(navigator.share){
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        btn.setAttribute('data-copied','1');
        const original = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
        setTimeout(()=>{ btn.innerHTML = original; btn.removeAttribute('data-copied'); }, 1600);
      }
    }catch(err){ /* user cancelled share, ignore */ }
  });
});

/* ===================== COUNTDOWN (any page with #cd-days etc) ===================== */
(function(){
  if(!document.getElementById('cd-days')) return;
  const EVENT_DATE = new Date('2026-09-12T09:00:00+05:30').getTime();
  function tick(){
    let diff = EVENT_DATE - Date.now();
    if(diff < 0) diff = 0;
    document.getElementById('cd-days').textContent = String(Math.floor(diff/(1000*60*60*24))).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(Math.floor((diff/(1000*60*60))%24)).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(Math.floor((diff/(1000*60))%60)).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(Math.floor((diff/1000)%60)).padStart(2,'0');
  }
  tick(); setInterval(tick, 1000);
})();

/* ===================== MARQUEE (home) ===================== */
(function(){
  const marquee = document.getElementById('marquee');
  if(!marquee) return;
  const services = ['Amazon Bedrock','AWS Lambda','Amazon S3','Amazon EC2','Amazon SageMaker','AWS Amplify','Amazon DynamoDB','AWS CDK','Amazon Q','AWS IAM','Amazon CloudFront','AWS Step Functions'];
  [...services, ...services].forEach(s=>{
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = s;
    marquee.appendChild(chip);
  });
})();

/* ===================== TRACK FILTER TABS (tracks page) ===================== */
(function(){
  const tabs = document.querySelectorAll('.tab[data-filter]');
  if(!tabs.length) return;
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.getAttribute('data-filter');
      document.querySelectorAll('.track-card').forEach(card=>{
        const cats = (card.getAttribute('data-cat')||'').split(' ');
        card.classList.toggle('hidden', f !== 'all' && !cats.includes(f));
      });
    });
  });
})();

/* ===================== SPEAKERS (speakers page) ===================== */
(function(){
  const grid = document.getElementById('speakerGrid');
  if(!grid) return;
  const speakers = [
    {name:'Ananya Verma', role:'AWS Community Builder', org:'Generative AI', i:'AV'},
    {name:'Rohit Deshmukh', role:'Cloud Architect', org:'Rungta Alumnus', i:'RD'},
    {name:'Priya Sinha', role:'DevOps Engineer', org:'CI/CD & Containers', i:'PS'},
    {name:'Kartik Nair', role:'Security Researcher', org:'Cloud IAM', i:'KN'},
    {name:'Sneha Iyer', role:'ML Engineer', org:'Applied AI', i:'SI'},
    {name:'Aditya Rathore', role:'Open Source Maintainer', org:'Community Lead', i:'AR'},
    {name:'Dr. Meera Joshi', role:'Faculty Lead, CS Dept', org:'Rungta University', i:'MJ'},
    {name:'Devansh Patil', role:'Student Organizer', org:'AWS Cloud Club Lead', i:'DP'}
  ];
  speakers.forEach(s=>{
    const hue1 = Math.random()>0.5 ? '#1E88E5' : '#0B4F9E';
    const card = document.createElement('div');
    card.className = 'team-card glass glass-tight reveal';
    card.innerHTML = `
      <div class="avatar" style="background:linear-gradient(150deg, ${hue1}, #22D3EE);">${s.i}</div>
      <h4>${s.name}</h4>
      <div class="role">${s.role}</div>
      <div class="org">${s.org}</div>
    `;
    grid.appendChild(card);
  });
  observeReveals();
})();

/* ===================== ORG TEAM (about page) ===================== */
(function(){
  const grid = document.getElementById('teamGrid');
  if(!grid) return;
  const team = [
    {name:'Cloud Lead', role:'AWS SBG Chapter Lead', org:'Founding organizer', i:'CL'},
    {name:'Tech Lead', role:'Workshops & Curriculum', org:'Session design', i:'TL'},
    {name:'Media Lead', role:'Media & Coverage', org:'Photography, reels', i:'ML'},
    {name:'Ops Lead', role:'Logistics & Venue', org:'On-ground coordination', i:'OL'}
  ];
  team.forEach(s=>{
    const hue1 = Math.random()>0.5 ? '#1E88E5' : '#0B4F9E';
    const card = document.createElement('div');
    card.className = 'team-card glass glass-tight reveal';
    card.innerHTML = `
      <div class="avatar" style="background:linear-gradient(150deg, ${hue1}, #22D3EE);">${s.i}</div>
      <h4>${s.name}</h4>
      <div class="role">${s.role}</div>
      <div class="org">${s.org}</div>
    `;
    grid.appendChild(card);
  });
  observeReveals();
})();

/* ===================== FAQ ACCORDION (venue/faq page) ===================== */
(function(){
  const faqList = document.getElementById('faqList');
  if(!faqList) return;
  const faqs = [
    {q:'Who can attend?', a:'Any student, from any college — no prior AWS or cloud experience required. Tracks are built for beginners through builders already shipping side projects.'},
    {q:'Is it really free?', a:'Yes, entirely free, including lunch and refreshments. There is no ticket tier and no hidden cost.'},
    {q:'Do I need to bring a laptop?', a:'Yes. You will need one for the track sessions and the afternoon build sprint. Power strips will be available in both halls.'},
    {q:'Will there be a certificate?', a:'Yes — every registered attendee who checks in receives a digital certificate of participation plus AWS Cloud Club swag.'},
    {q:'Is there a dress code?', a:'No. Casual or campus wear is completely fine.'},
    {q:'Can students from outside Rungta University join?', a:'Absolutely. This is a regional gathering open to students from any college across Chhattisgarh and beyond, subject to the 500-seat cap.'}
  ];
  faqs.forEach(f=>{
    const item = document.createElement('div');
    item.className = 'faq-item reveal';
    item.innerHTML = `<button class="faq-q" aria-expanded="false"><span>${f.q}</span><span class="plus"></span></button><div class="faq-a"><p>${f.a}</p></div>`;
    faqList.appendChild(item);
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    btn.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other=>{
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
  observeReveals();
})();

/* ===================== QUICK-REGISTER MODAL (nav CTA on non-register pages) ===================== */
(function(){
  const overlay = document.getElementById('modalOverlay');
  if(!overlay) return;
  window.openModal = function(){ overlay.classList.add('open'); document.body.style.overflow='hidden'; };
  window.closeModal = function(){ overlay.classList.remove('open'); document.body.style.overflow=''; };
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
})();

/* ===================== REGISTRATION WIZARD (register page) ===================== */
(function(){
  const wizard = document.getElementById('regWizard');
  if(!wizard) return;

  let current = 1;
  const total = 3;
  const data = {};

  function updateSteps(){
    document.querySelectorAll('.wstep').forEach(el=>{
      const n = parseInt(el.getAttribute('data-step'));
      el.classList.toggle('active', n === current);
      el.classList.toggle('done', n < current);
    });
    document.querySelectorAll('.step-panel').forEach(el=>{
      el.classList.toggle('active', parseInt(el.getAttribute('data-panel')) === current);
    });
  }

  function validateStep1(){
    const fields = {
      'f-name': document.getElementById('i-name').value.trim().length > 1,
      'f-email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('i-email').value.trim()),
      'f-college': document.getElementById('i-college').value.trim().length > 1,
      'f-year': document.getElementById('i-year').value !== ''
    };
    let valid = true;
    Object.keys(fields).forEach(id=>{
      document.getElementById(id).classList.toggle('invalid', !fields[id]);
      if(!fields[id]) valid = false;
    });
    return valid;
  }

  function validateStep2(){
    const fields = { 'f-track': document.getElementById('i-track').value !== '' };
    let valid = true;
    Object.keys(fields).forEach(id=>{
      document.getElementById(id).classList.toggle('invalid', !fields[id]);
      if(!fields[id]) valid = false;
    });
    return valid;
  }

  function fillReview(){
    document.getElementById('rv-name').textContent = document.getElementById('i-name').value.trim();
    document.getElementById('rv-email').textContent = document.getElementById('i-email').value.trim();
    document.getElementById('rv-college').textContent = document.getElementById('i-college').value.trim();
    document.getElementById('rv-year').textContent = document.getElementById('i-year').value;
    document.getElementById('rv-track').textContent = document.getElementById('i-track').value;
    document.getElementById('rv-phone').textContent = document.getElementById('i-phone').value.trim() || '—';
  }

  document.querySelectorAll('[data-next]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(current === 1 && !validateStep1()) return;
      if(current === 2 && !validateStep2()) return;
      current = Math.min(total, current+1);
      if(current === 3) fillReview();
      updateSteps();
      wizard.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
  document.querySelectorAll('[data-back]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      current = Math.max(1, current-1);
      updateSteps();
      wizard.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  document.getElementById('finalSubmit').addEventListener('click', ()=>{
    const name = document.getElementById('i-name').value.trim();
    const email = document.getElementById('i-email').value.trim();

    document.getElementById('succName').textContent = name.split(' ')[0] || 'builder';
    document.getElementById('succEmail').textContent = email;

    const ics = [
      'BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT',
      'SUMMARY:AWS Student Builder Community Day @ Rungta University',
      'DTSTART:20260912T033000Z',
      'DTEND:20260912T123000Z',
      'LOCATION:Rungta University\\, Kohka-Kurud Road\\, Bhilai\\, Chhattisgarh 490024',
      'DESCRIPTION:A one-day AWS student community gathering — workshops\\, build sprint\\, and demo night.',
      'END:VEVENT','END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], {type:'text/calendar'});
    document.getElementById('icsLink').href = URL.createObjectURL(blob);

    document.getElementById('wizardBody').style.display = 'none';
    document.getElementById('successView').classList.add('show');
  });

  updateSteps();
})();
