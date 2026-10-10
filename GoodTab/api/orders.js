module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, package: selectedPackage, budget = '', details } = req.body || {};
  if (!name || !email || !selectedPackage || !details || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please complete the required fields with a valid email.' });
  }
  if (String(name).length > 120 || String(email).length > 254 || String(details).length > 5000) {
    return res.status(400).json({ error: 'One of the fields is too long.' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: 'Order storage is not configured yet.' });
  }

  let savedOrder;
  try {
    const dbResponse = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({ name, email, package: selectedPackage, budget, details })
    });
    const body = await dbResponse.json().catch(() => ({}));
    if (!dbResponse.ok) {
      console.error('Order database insert failed:', body);
      return res.status(502).json({ error: 'The order could not be saved. Please try again.' });
    }
    savedOrder = Array.isArray(body) ? body[0] : body;
  } catch (error) {
    console.error('Order database request failed:', error);
    return res.status(502).json({ error: 'The order could not be saved. Please try again.' });
  }

  let emailSent = false;
  const { RESEND_API_KEY, ORDER_NOTIFICATION_EMAIL, RESEND_FROM = 'onboarding@resend.dev' } = process.env;
  if (RESEND_API_KEY && ORDER_NOTIFICATION_EMAIL) {
    const safe = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [ORDER_NOTIFICATION_EMAIL],
        reply_to: email,
        subject: `New website inquiry: ${selectedPackage}`,
        html: `<h2>New project inquiry</h2><p><b>Name:</b> ${safe(name)}</p><p><b>Email:</b> ${safe(email)}</p><p><b>Package:</b> ${safe(selectedPackage)}</p><p><b>Budget:</b> ${safe(budget || 'Not provided')}</p><p><b>Details:</b><br>${safe(details).replace(/\n/g, '<br>')}</p>`
      })
    }).catch(error => {
      console.error('Resend request failed:', error);
      return null;
    });
    emailSent = Boolean(emailResponse?.ok);
    if (!emailSent) console.error('Resend did not accept the notification:', await emailResponse?.text().catch(() => 'No response'));
  }

  return res.status(200).json({ saved: true, emailSent, orderId: savedOrder?.id || null });
};
