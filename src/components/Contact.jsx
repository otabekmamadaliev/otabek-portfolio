import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Reveal from './Reveal.jsx'

// TODO: paste your real EmailJS keys here (dashboard.emailjs.com)
const SERVICE_ID = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Book a call</h2>
          <p className="contact-intro">
            Tell me what you need built and when you&apos;re free to talk.
            Your request lands in my inbox and I&apos;ll reply by email.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="from_name">Name *</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="reply_to">Email *</label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
            <div className="field field-full">
              <label htmlFor="preferred_time">Preferred date / time</label>
              <input
                id="preferred_time"
                name="preferred_time"
                type="text"
                placeholder="e.g. Tuesday afternoon (CET)"
              />
            </div>
            <div className="field field-full">
              <label htmlFor="message">What do you need built? *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="A short description of your project…"
                required
              />
            </div>
            <div className="form-footer">
              <button
                className="btn btn-gold"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send request'}
              </button>
              {status === 'sent' && (
                <p className="form-msg success" role="status">
                  Request sent. I&apos;ll reply to your email shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="form-msg error" role="alert">
                  Something went wrong — please email me directly at{' '}
                  <a href="mailto:otabekmamadaliyev09@gmail.com">
                    otabekmamadaliyev09@gmail.com
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
