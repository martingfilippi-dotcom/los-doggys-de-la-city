(() => {
const $ = (s) => document.querySelector(s);
const config = window.DOGGYS_CONFIG || {};
const menu = $('#menu-toggle'), nav = $('#nav');
menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }));
$('#year').textContent = new Date().getFullYear();
const donate = $('#donate-link');
if (config.donationUrl && /^https:\/\//i.test(config.donationUrl)) { donate.href = config.donationUrl; donate.target='_blank'; donate.rel='noopener noreferrer'; donate.classList.remove('disabled'); donate.removeAttribute('aria-disabled'); donate.textContent = (config.donationLabel || 'Colaborá con la causa')+' ↗'; }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grid = $('#events-grid');
fetch('data/events.json').then(r => {if(!r.ok) throw Error(); return r.json();}).then(events => {
 const published = Array.isArray(events) ? events.filter(e => e.status === 'published') : [];
 if (!published.length) return;
 grid.innerHTML = '';
 published.forEach(e => {
  const card = document.createElement('article'); card.className='empty';
  const d = e.date ? new Date(e.date+'T12:00:00') : null;
  const date = d && !Number.isNaN(d.valueOf()) ? d.toLocaleDateString('es-PY',{day:'2-digit',month:'short',year:'numeric'}) : '';
  const link = e.ticketUrl && /^https:\/\//i.test(e.ticketUrl) ? '<a class="button" target="_blank" rel="noopener noreferrer" href="'+esc(e.ticketUrl)+'">Comprar tickets oficiales ↗</a>' : '<span class="small">Tickets próximamente</span>';
  card.innerHTML='<p class="eyebrow">'+esc(date)+' '+esc(e.venue || '')+'</p><h3>'+esc(e.title)+'</h3><p>'+esc(e.description || '')+'</p>'+link; grid.appendChild(card);
 });
}).catch(()=>{});
const form = $('#contact-form'), status = $('#form-status');
form?.addEventListener('submit', e => {
 e.preventDefault(); if (!form.reportValidity()) return;
 const email = String(config.contactEmail || '').trim();
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent='El formulario todavía no envía mensajes: falta configurar el correo oficial. Tu mensaje no fue almacenado ni enviado.'; return; }
 const d = new FormData(form), subject='[Los Doggys de la City] '+d.get('topic');
 const body='Nombre: '+d.get('name')+'\nEmail: '+d.get('email')+'\nTema: '+d.get('topic')+'\n\n'+d.get('message');
 location.href='mailto:'+encodeURIComponent(email)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 status.textContent='Se abrió tu aplicación de correo para que revises y envíes el mensaje.';
});
})();