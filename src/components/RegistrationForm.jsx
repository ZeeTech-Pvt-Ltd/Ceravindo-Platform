import { useId } from 'react'
import PhoneField from './PhoneField.jsx'
import { useLegal } from './LegalModal.jsx'
import { useLeadForm } from '../lib/useLeadForm.js'
import { Alert } from './icons.jsx'

/**
 * The lead form. Rendered in two places - the homepage #register section and
 * /contact - from this one component, so the two cannot drift.
 *
 * All four inputs carry the plain ids firstName, lastName, email and phone.
 * The browser verification harness in .arttmp/ selects on those, and so do
 * password managers, which key off both the id and the autoComplete value.
 *
 * The form is noValidate: the browser's own tooltips would fire on a
 * different schedule from the messages below and show two different sentences
 * for the same problem. The required attributes stay for assistive tech.
 */
export default function RegistrationForm({ variant = 'signup', submitLabel }) {
  const uid = useId()
  const { openLegal } = useLegal()
  const form = useLeadForm({ variant })

  const label = submitLabel ?? (variant === 'contact' ? 'Send message' : 'Create your Account')

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form.values[name],
    onChange: (e) => form.setField(name, e.target.value),
    onBlur: () => form.handleBlur(name),
    'aria-invalid': Boolean(form.errors[name]),
    'aria-describedby': form.errors[name] ? `${name}-error` : undefined,
  })

  const fieldError = (name) =>
    form.errors[name] ? (
      <p className="field__error" id={`${name}-error`}>
        {form.errors[name]}
      </p>
    ) : null

  return (
    <form className="reg" onSubmit={form.handleSubmit} noValidate>
      <div className="reg__grid">
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="Jordan"
            maxLength={60}
            required
            {...fieldProps('firstName')}
          />
          {fieldError('firstName')}
        </div>

        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            autoComplete="family-name"
            placeholder="Clarke"
            maxLength={60}
            required
            {...fieldProps('lastName')}
          />
          {fieldError('lastName')}
        </div>

        <div className="field reg__full">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={120}
            required
            {...fieldProps('email')}
          />
          {fieldError('email')}
        </div>

        <div className="reg__full">
          <PhoneField
            country={form.country}
            phone={form.values.phone}
            placeholder={form.placeholder}
            onCountryChange={form.onCountryChange}
            onPhoneChange={form.setPhone}
            onBlur={() => form.handleBlur('phone')}
            error={form.errors.phone}
            errorId="phone-error"
          />
        </div>
      </div>

      {/* Honeypot. Off-screen via CSS rather than display:none - some bots
          skip fields hidden outright, and the point is to be filled. Marked
          aria-hidden so it never reaches assistive tech, and kept out of the
          tab order. Its value is checked in useLeadForm, and a filled field
          stops the submission before any request is made. */}
      <div className="field-hp" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.values.company}
          onChange={(e) => form.setField('company', e.target.value)}
        />
      </div>

      <div className="field reg__consent">
        <label className="check" htmlFor="agree">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={Boolean(form.values.agree)}
            onChange={(e) => form.setField('agree', e.target.checked)}
            aria-invalid={Boolean(form.errors.agree)}
            aria-describedby={form.errors.agree ? 'agree-error' : undefined}
          />
          <span>
            I agree to the{' '}
            <button type="button" className="linklike" onClick={() => openLegal('privacy')}>
              Privacy Policy
            </button>{' '}
            and{' '}
            <button type="button" className="linklike" onClick={() => openLegal('terms')}>
              Terms of Use
            </button>
            .
          </span>
        </label>
        {form.errors.agree && (
          <p className="field__error" id="agree-error">
            {form.errors.agree}
          </p>
        )}
      </div>

      {form.serverError && (
        <div className="reg__server" role="alert">
          <Alert width={18} height={18} aria-hidden="true" />
          <p>{form.serverError}</p>
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block"
        disabled={form.submitting}
        aria-busy={form.submitting}
      >
        {form.submitting ? 'Creating your account…' : label}
      </button>

      <p className="reg__note">
        We collect your name, email and phone number to set up your account. No card details, bank
        details or passwords.
      </p>
    </form>
  )
}
