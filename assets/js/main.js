const SUPA_URL = 'https://dytuvhphtqiummybzzgd.supabase.co';
const SUPA_KEY = 'sb_publishable_vmMPKsvYsXZFKdoCRjRo1A_kgsXsPcC';
const db = supabase.createClient(SUPA_URL, SUPA_KEY);

const isFA = document.documentElement.lang === 'fa';

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('[type=submit]');
  const msg = document.getElementById('formMsg');
  const data = Object.fromEntries(new FormData(this));

  btn.disabled = true;
  msg.className = 'form-msg';
  msg.textContent = isFA ? 'در حال ارسال...' : 'Sending...';

  const { error } = await db.from('contact_requests').insert([data]);

  if (error) {
    msg.className = 'form-msg err';
    msg.textContent = isFA ? 'خطا در ارسال. لطفاً دوباره امتحان کنید.' : 'Something went wrong. Please try again.';
    btn.disabled = false;
  } else {
    msg.className = 'form-msg ok';
    msg.textContent = isFA ? 'درخواست شما با موفقیت ارسال شد! ✓' : 'Request sent successfully! ✓';
    this.reset();
    btn.disabled = false;
    setTimeout(() => closeModal(), 2200);
  }
});

const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20));

const navLinks=document.querySelectorAll('.nav-links a:not(.lang)');
const sections=document.querySelectorAll('section[id], header');
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(a=>a.classList.remove('active'));
      const id=e.target.id||'';
      const active=document.querySelector(`.nav-links a[href="#${id}"]`);
      if(active)active.classList.add('active');
    }
  });
},{threshold:.4});
sections.forEach(s=>sectionObserver.observe(s));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// living agent graph
const nodes=[...document.querySelectorAll('.node')];
const seq=[[0],[1,2],[3]];
const edgeSeq=[['e1','e2'],['e3','e4']];
let s=0;
function tick(){
  nodes.forEach(n=>n.classList.remove('active'));
  ['e1','e2','e3','e4'].forEach(id=>document.getElementById(id).classList.remove('live'));
  seq[s].forEach(i=>nodes[i].classList.add('active'));
  if(s>0)edgeSeq[s-1].forEach(id=>document.getElementById(id).classList.add('live'));
  s=(s+1)%seq.length;
}
tick();setInterval(tick,1500);

document.querySelectorAll('.svc').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');
    c.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});