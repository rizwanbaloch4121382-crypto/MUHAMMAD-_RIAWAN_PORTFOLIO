const state={industries:[]};
const grid=document.querySelector('#industryGrid');
const search=document.querySelector('#industrySearch');
const modal=document.querySelector('#industryModal');
const modalContent=document.querySelector('#modalContent');

async function loadIndustries(){
  const res=await fetch('/api/industries');
  state.industries=await res.json();
  renderIndustries(state.industries);
}
function renderIndustries(items){
  grid.innerHTML=items.length?items.map(x=>`<article class="industry-card" data-id="${x.id}" style="--accent:${x.accent}"><div class="icon">${x.icon}</div><h3>${x.name}</h3><p>${x.summary}</p><div class="learn"><span>VIEW PROFILE</span><span>↗</span></div></article>`).join(''):`<p style="color:#c8d7d6">No industry matched your search.</p>`;
  document.querySelectorAll('.industry-card').forEach(card=>card.addEventListener('click',()=>openIndustry(card.dataset.id)));
}
function openIndustry(id){
  const x=state.industries.find(i=>i.id===id); if(!x)return;
  modalContent.innerHTML=`<div class="modal-title-row"><span>${x.icon}</span><div><small>PAKISTAN INDUSTRY PROFILE</small><h2 id="modalTitle">${x.name}</h2></div></div><p>${x.summary}</p><h4>Industry history & context</h4><p>${x.history}</p><h4>How the industry works</h4><p>${x.work}</p><h4>Main products / outputs</h4><ul>${x.products.map(p=>`<li>${p}</li>`).join('')}</ul><h4>Where AI can help</h4><ul>${x.ai.map(p=>`<li>${p}</li>`).join('')}</ul><section class="company-section"><h3>Leading companies in Pakistan</h3><div class="company-grid">${(x.companies||[]).map(c=>`<a href="${c.url}" target="_blank" rel="noopener"><span>${c.name}</span><small>Official website ↗</small></a>`).join('')}</div></section><a class="source-link" target="_blank" rel="noopener" href="${x.url}">Official / public source: ${x.source} ↗</a>`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
search.addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();renderIndustries(state.industries.filter(x=>[x.name,x.summary,x.work,...x.products,...x.ai,...(x.companies||[]).map(c=>c.name)].join(' ').toLowerCase().includes(q)))});
document.querySelector('#clearSearch').addEventListener('click',()=>{search.value='';renderIndustries(state.industries);search.focus()});
document.querySelectorAll('[data-close="modal"]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.topbar nav').classList.toggle('open'));
document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.topbar nav').classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
loadIndustries();

// Full-screen profile photo preview
const profileOpen=document.querySelector('#profileOpen');
const profileModal=document.querySelector('#profileModal');
function openProfile(){
  if(!profileModal)return;
  profileModal.classList.add('open');
  profileModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeProfile(){
  if(!profileModal)return;
  profileModal.classList.remove('open');
  profileModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
profileOpen?.addEventListener('click',openProfile);
document.querySelectorAll('[data-close="profile"]').forEach(el=>el.addEventListener('click',closeProfile));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && profileModal?.classList.contains('open'))closeProfile();});

