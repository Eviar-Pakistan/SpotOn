import { useRef } from 'react'
import ScreenShell from '../components/ScreenShell'
import GoldButton from '../components/GoldButton'
import BrandHeader from '../components/BrandHeader'
import giftBox from '../assets/gift_box.png'

export default function EnterNameScreen({
  name,
  onChange,
  onClose,
  onSubmit,
  saving = false,
  error = '',
}) {
  const inputRef = useRef(null)
  const trimmed = name.trim()
  const canSubmit = trimmed.length >= 1

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit || saving) {
      inputRef.current?.focus()
      return
    }
    onSubmit()
  }

  return (
    <ScreenShell className="name-screen">
      <BrandHeader />

      <div className="name-main">
        <form className="name-modal" onSubmit={handleSubmit}>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6" />
            </svg>
          </button>

          <div className="gift-icon" aria-hidden="true">
            <img src={giftBox} alt="" />
          </div>

          <h1>Something special is waiting for you!</h1>
          <p>Please enter your name to continue</p>

          <input
            ref={inputRef}
            type="text"
            name="guestName"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Your Name"
            value={name}
            onChange={(event) => onChange(event.target.value)}
            maxLength={40}
            disabled={saving}
          />

          {error ? <p className="name-error">{error}</p> : null}

          <GoldButton type="submit" disabled={saving}>
            {saving ? 'Saving' : canSubmit ? 'Submit' : 'Enter Name'}
          </GoldButton>
        </form>
      </div>
    </ScreenShell>
  )
}
