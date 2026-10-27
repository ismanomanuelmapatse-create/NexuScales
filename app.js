const form = document.getElementById('lead');
const msg = document.getElementById('msg');
const btn = form.querySelector('button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  btn.disabled = true;
  try {
    const r = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      form.reset();
      msg.textContent = 'Recebemos o seu pedido. Vamos contactá-lo pelo WhatsApp.';
    } else {
      msg.textContent = d.error || 'Não foi possível enviar. Tente novamente.';
    }
  } catch {
    msg.textContent = 'Sem ligação à internet. Tente novamente ou fale connosco pelo WhatsApp.';
  }
  btn.disabled = false;
});
