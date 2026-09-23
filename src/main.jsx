import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const el = document.getElementById('root')
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build-time prerender ships the full page already inside #root, so
// React has to hydrate onto that existing markup rather than replace it.
// Calling createRoot() on prerendered HTML throws the baked tree away and
// re-renders from scratch - a visible flash and a layout shift on every
// page load. The dev server serves an empty #root, which is why both
// branches exist.
if (el.hasChildNodes()) {
  hydrateRoot(el, tree)
} else {
  createRoot(el).render(tree)
}
