// server/utils/mailer.js
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = process.env.SMTP_PORT || '';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Salon <no-reply@yourdomain.com>';

let transporter = null;

if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  transporter.verify().then(() => {
    console.log('Mailer: SMTP transporter ready');
  }).catch((err) => {
    console.warn('Mailer: SMTP verify failed:', err?.message || err);
    transporter = null;
  });
} else {
  console.warn('Mailer: SMTP not configured. Emails disabled.');
}

export async function sendEmail(to, subject, html) {
  if (!transporter) {
    console.warn('sendEmail: transporter not configured — dropping email to', to);
    return;
  }
  if (!to) {
    console.warn('sendEmail: no recipient provided');
    return;
  }
  const info = await transporter.sendMail({ from: EMAIL_FROM, to, subject, html });
  return info;
}

export async function sendBookingEmailToCustomer(booking, customerEmail) {
  if (!customerEmail) return;
  const html = `
    <h2>Your booking is confirmed</h2>
    <p>Booking ID: ${booking._id}</p>
    <p>Total: ₹${booking.totalAmount}</p>
    <p>Status: ${booking.status}</p>
  `;
  return sendEmail(customerEmail, `Booking confirmed — ${booking._id}`, html);
}

export async function sendStylistNotificationEmail(stylistEmail, stylistName, booking, item) {
  if (!stylistEmail) return;
  const serviceName = item?.name || 'Service';
  const scheduledAt = item?.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : 'Not scheduled';
  const customer = booking.user?.name || booking.userEmail || 'Customer';
  const bookingLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/bookings/${booking._id}`;

  const html = `
    <h2>New booking for you</h2>
    <p>Hi ${stylistName || 'Stylist'},</p>
    <p>You have a new booking for <strong>${serviceName}</strong>.</p>
    <ul>
      <li><strong>Customer:</strong> ${customer}</li>
      <li><strong>When:</strong> ${scheduledAt}</li>
      <li><strong>Booking ID:</strong> ${booking._id}</li>
      <li><strong>Total:</strong> ₹${booking.totalAmount}</li>
    </ul>
    <p><a href="${bookingLink}">Open booking</a></p>
    <p>— Salon App</p>
  `;

  return sendEmail(stylistEmail, `New booking — ${serviceName} — ${scheduledAt}`, html);
}
