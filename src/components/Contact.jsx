import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/lang.jsx'

const SERVICE_ID = 'service_3o04ar1'
const TEMPLATE_ID = 'template_v3sej96'
const PUBLIC_KEY = 'C_whB4tAE2ZQWGiHA'
const CONTACT_EMAIL = 'contact@otabekmamadaliev.com'

// Stable English values submitted regardless of the visitor's display language,
// so every request lands in the inbox in one language. The visible labels come
// from i18n (t.contact.options) and must stay in the same order.
const OPTION_VALUES = [
  'Website / Landing page',
  'Web app',
  'Online store',
  'Booking system',
  'AI chatbot / feature',
  'Fixes & maintenance',
  'Something else',
]

function Contact() {
  const { t } = useLang()
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | pick

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(formRef.current)
    const name = (fd.get('from_name') || '').toString().trim()
    const email = (fd.get('reply_to') || '').toString().trim()
    const time = (fd.get('preferred_time') || '').toString().trim()
    const details = (fd.get('details') || '').toString().trim()
    const types = fd.getAll('project').map((v) => v.toString())

    // Lazy-friendly: a single checkbox is a valid request. Only block the truly
    // empty submission where we'd have no idea what they want.
    if (types.length === 0 && !details) {
      setStatus('pick')
      return
    }

    // Compose everything into the template's {{message}} so no template edit is
    // needed; still pass the individual fields it already uses.
    const lines = [`Wants: ${types.length ? types.join(', ') : '—'}`]
    if (time) lines.push(`Preferred time: ${time}`)
    lines.push('', details || '(no extra details)')

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name || 'Website visitor',
          reply_to: email,
          preferred_time: time,
          message: lines.join('\n'),
        },
        { publicKey: PUBLIC_KEY },
      )
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
            noValidate
          >
            {/* What to build — pick-one-click chips, no typing required */}
            <div className="field field-full">
              <label className="field-label">{t.contact.message}</label>
              <p className="field-hint">{t.contact.optionsHint}</p>
              <div className="chip-group">
                {t.contact.options.map((label, i) => (
                  <label className="chip" key={OPTION_VALUES[i]}>
                    <input
                      type="checkbox"
                      name="project"
                      value={OPTION_VALUES[i]}
                      onChange={() => status === 'pick' && setStatus('idle')}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="from_name">
                {t.contact.name}{' '}
                <span className="opt">({t.contact.optional})</span>
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                placeholder={t.contact.namePlaceholder}
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
              <label htmlFor="details">
                {t.contact.details}{' '}
                <span className="opt">({t.contact.optional})</span>
              </label>
              <textarea
                id="details"
                name="details"
                rows="3"
                placeholder={t.contact.detailsPlaceholder}
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
              {status === 'pick' && (
                <p className="form-msg error" role="alert">
                  {t.contact.pickOne}
                </p>
              )}
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
