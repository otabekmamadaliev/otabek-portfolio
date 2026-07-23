import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/lang.jsx'

const SERVICE_ID = 'service_3o04ar1'
const TEMPLATE_ID = 'template_v3sej96'
const PUBLIC_KEY = 'C_whB4tAE2ZQWGiHA'
const CONTACT_EMAIL = 'contact@otabekmamadaliev.com'

function Contact() {
  const { t } = useLang()
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
          <div className="cta-banner">
            <div>
              <h3>{t.cta.title}</h3>
              <p>{t.cta.subtitle}</p>
            </div>
            <a className="btn btn-primary" href="#contact-form">
              {t.cta.button} ↓
            </a>
          </div>
        </Reveal>
        <Reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <span className="title-underline" aria-hidden="true" />
          <p className="contact-intro">{t.contact.intro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            className="contact-form"
            id="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label htmlFor="from_name">{t.contact.name} *</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                placeholder={t.contact.namePlaceholder}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="reply_to">{t.contact.email} *</label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                placeholder={t.contact.emailPlaceholder}
                required
              />
            </div>
            <div className="field field-full">
              <label htmlFor="preferred_time">{t.contact.time}</label>
              <input
                id="preferred_time"
                name="preferred_time"
                type="text"
                placeholder={t.contact.timePlaceholder}
              />
            </div>
            <div className="field field-full">
              <label htmlFor="message">{t.contact.message} *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder={t.contact.messagePlaceholder}
                required
              />
            </div>
            <div className="form-footer">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t.contact.sending : t.contact.send}
              </button>
              {status === 'sent' && (
                <p className="form-msg success" role="status">
                  {t.contact.success}
                </p>
              )}
              {status === 'error' && (
                <p className="form-msg error" role="alert">
                  {t.contact.errorPrefix}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
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
