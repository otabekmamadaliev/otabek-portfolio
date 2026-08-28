import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
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
  const [picked, setPicked] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | pick

  const toggle = (value) => {
    setPicked((cur) =>
      cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
    )
    if (status === 'pick') setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(formRef.current)
    const name = (fd.get('from_name') || '').toString().trim()
    const email = (fd.get('reply_to') || '').toString().trim()
    const details = (fd.get('details') || '').toString().trim()

    // One chip is a complete request. Only block the truly empty submission,
    // where there would be nothing to reply to.
    if (picked.length === 0 && !details) {
      setStatus('pick')
      return
    }

    // Everything is composed into the template's {{message}} so the EmailJS
    // template needs no edit; the fields it already maps are passed too.
    const message = [
      `Wants: ${picked.length ? picked.join(', ') : '-'}`,
      '',
      details || '(no extra details)',
    ].join('\n')

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name || 'Website visitor',
          reply_to: email,
          message,
        },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('sent')
      setPicked([])
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHead
          label={t.sections.contact}
          title={t.contact.title}
          datum={t.sections.contactDatum}
        />
        <div className="contact">
          <Reveal>
            <div>
              <p className="contact-intro">{t.contact.intro}</p>
              <div className="contact-direct">
                <span className="legend">{t.contact.direct}</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="form-block">
                <div className="form-label">
                  <span className="legend">{t.contact.message}</span>
                  <span className="legend">{t.contact.optionsHint}</span>
                </div>
                <div className="chips">
                  {t.contact.options.map((label, i) => (
                    <button
                      key={OPTION_VALUES[i]}
                      type="button"
                      className="chip"
                      aria-pressed={picked.includes(OPTION_VALUES[i])}
                      onClick={() => toggle(OPTION_VALUES[i])}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-block form-row">
                <div>
                  <label className="form-label" htmlFor="from_name">
                    <span className="legend">
                      {t.contact.name} ({t.contact.optional})
                    </span>
                  </label>
                  <input
                    className="field"
                    id="from_name"
                    name="from_name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="reply_to">
                    <span className="legend">{t.contact.email} *</span>
                  </label>
                  <input
                    className="field"
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    autoComplete="email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div className="form-block">
                <label className="form-label" htmlFor="details">
                  <span className="legend">
                    {t.contact.details} ({t.contact.optional})
                  </span>
                </label>
                <textarea
                  className="field"
                  id="details"
                  name="details"
                  rows="3"
                  placeholder={t.contact.detailsPlaceholder}
                />
              </div>

              <div className="form-send">
                <button
                  className="btn btn-live"
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </button>
                {status === 'pick' && (
                  <p className="form-msg bad" role="alert">
                    {t.contact.pickOne}
                  </p>
                )}
                {status === 'sent' && (
                  <p className="form-msg ok" role="status">
                    {t.contact.success}
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-msg bad" role="alert">
                    {t.contact.errorPrefix}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
