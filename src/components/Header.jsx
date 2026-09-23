import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { NAV } from '../data/content.js'
import { Menu, Close } from './icons.jsx'

/**
 * Sticky header.
 *
 * The sign-up CTA is a plain "#register" href. App.jsx intercepts it, so with
 * JS the visitor scrolls without a fragment ever reaching the URL bar, and
 * from a route page it goes home first. Without JS the browser's own anchor
 * handling takes over, which degrades to the right behaviour rather than to
 * a dead link.
 *
 * The drawer closes on Escape, on a nav click, and when the viewport grows
 * past the breakpoint; while it is open the body is scroll-locked so the page
 * behind it cannot drift.
 */
export default function Header({ route, onCta }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [route])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 900px)')
    const onWide = () => {
      if (mq.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="header">
      <div className="wrap header__inner">
        <a className="header__brand" href="/" aria-label="Ceravindo home">
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`header__link${route === routeOf(item.href) ? ' is-active' : ''}`}
              aria-current={route === routeOf(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="btn btn--primary header__cta" href="#register" onClick={onCta}>
            Get started
          </a>
          <button
            type="button"
            className="header__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close width={22} height={22} /> : <Menu width={22} height={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`header__drawer${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <nav className="header__drawer-nav" aria-label="Primary, mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__drawer-link">
              {item.label}
            </a>
          ))}
          <a className="btn btn--primary btn--block" href="#register">
            Get started
          </a>
        </nav>
      </div>
    </header>
  )
}

/** '/about' -> 'about'; '/' -> 'home'. */
function routeOf(href) {
  const clean = href.replace(/\/+$/, '')
  return clean === '' ? 'home' : clean.slice(1)
}
