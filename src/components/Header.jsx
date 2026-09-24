import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { NAV } from '../data/content.js'
import { Menu, Close } from './icons.jsx'

/**
 * Sticky header, with the mobile menu as an overlay.
 *
 * The menu used to be an inline drawer inside the <header>: opening it grew
 * the header from 73px to 399px, which pushed the whole page down. Locking
 * the body to stop that made it worse - the scroll container changed to
 * <body>, so the sticky header resolved against the body's own top and slid
 * thousands of pixels above the viewport. Measured at 375px, opening the menu
 * mid-page put the header at top: -6500px.
 *
 * It is now a fixed panel below the header with a scrim behind it, rendered
 * as a sibling rather than a child. That has to be a sibling: the header
 * carries backdrop-filter, which makes it a containing block for fixed
 * descendants, so a fixed drawer inside it would position against the header
 * instead of the viewport.
 *
 * The sign-up CTA is a plain "#register" href. App.jsx intercepts it, so with
 * JS the visitor scrolls without a fragment reaching the URL bar, and from a
 * route page it goes home first. Without JS the browser's own anchor handling
 * takes over, which degrades to the right behaviour rather than a dead link.
 */
export default function Header({ route, onCta }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const drawerRef = useRef(null)

  const close = () => setOpen(false)

  // A route change closes the menu. On its own that is not enough: tapping
  // "Home" while already on the homepage changes nothing, so the effect never
  // fires and the menu stays open over the page it just scrolled to. The
  // drawer's own links call close() directly for that case.
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

    // Scroll lock on <html>, never on <body>. The scrolling element is <html>
    // and the sticky header resolves against it; locking <body> makes body the
    // scroll container and moves the header with it. See the note above.
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
      root.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="wrap header__inner">
          <a className="header__brand" href="/" aria-label="Ceravindo home" onClick={close}>
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
      </header>

      {/* Sits between the page and the menu, and closes it on tap. The header
          and drawer are both above it, so tapping either does not dismiss. */}
      {open && <div className="header__scrim" onPointerDown={close} aria-hidden="true" />}

      <div
        id="mobile-menu"
        ref={drawerRef}
        className="header__drawer"
        hidden={!open}
      >
        <nav className="header__drawer-nav" aria-label="Primary, mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__drawer-link" onClick={close}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--primary btn--block" href="#register" onClick={close}>
            Get started
          </a>
        </nav>
      </div>
    </>
  )
}

/** '/about' -> 'about'; '/' -> 'home'. */
function routeOf(href) {
  const clean = href.replace(/\/+$/, '')
  return clean === '' ? 'home' : clean.slice(1)
}
