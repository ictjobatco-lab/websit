const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20));

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