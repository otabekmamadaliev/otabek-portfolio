import { useLang } from '../i18n/lang.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const NAV = [
  { num: '01', key: 'home', href: '#top' },
  { num: '02', key: 'projects', href: '#projects' },
  { num: '03', key: 'skills', href: '#skills' },
  { num: '04', key: 'about', href: '#about' },
  { num: '05', key: 'contact', href: '#contact' },
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/otabekmamadaliev',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/otabekmamadaliev/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/48573986686',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.9c0 5.44-4.44 9.87-9.89 9.87Zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41Z" />
      </svg>
    ),
  },
]

function SocialRow({ className }) {
  return (
    <div className={className}>
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          className="social-link"
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}

function Sidebar() {
  const { t } = useLang()
  return (
    <>
      <aside className="sidebar">
        <a href="#top" className="sidebar-logo" aria-label="Home">
          {'</>'}
        </a>
        <p className="sidebar-tagline">
          {t.sidebar.tagline.map((line, i) => (
            <span key={i}>
              {line}
              {i < t.sidebar.tagline.length - 1 && <br />}
            </span>
          ))}
        </p>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV.map((link) => (
            <a key={link.num} className="sidebar-link" href={link.href}>
              <span className="num">{link.num}</span>
              {t.nav[link.key]}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <LanguageSwitcher />
          <SocialRow className="social-row" />
          <a className="btn btn-primary btn-sm" href="#contact">
            {t.bookCall}
          </a>
        </div>
      </aside>
      <header className="topbar">
        <a href="#top" className="topbar-logo" aria-label="Home">
          {'</>'} OTABEK
        </a>
        <div className="topbar-right">
          <LanguageSwitcher />
          <a className="btn btn-primary btn-sm" href="#contact">
            {t.bookCall}
          </a>
        </div>
      </header>
    </>
  )
}

export { SocialRow }
export default Sidebar
