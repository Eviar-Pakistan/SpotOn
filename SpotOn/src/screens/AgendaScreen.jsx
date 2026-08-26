import { useCallback, useEffect, useRef, useState } from 'react'
import ScreenShell from '../components/ScreenShell'
import GoldButton from '../components/GoldButton'
import BrandHeader from '../components/BrandHeader'
const AGENDA = [
  { time: '06:30 PM', title: 'Registration, Cocktail Reception & Networking', icon: 'people' },
  { time: '07:30 PM', title: 'Welcome by MOC and intro', icon: 'mic' },
  { time: '07:35 PM', title: 'Opening Video of Dragons of Pakistan Entries', icon: 'music' },
  { time: '07:40 PM', title: 'Opening remarks by MOC and AdStreet', icon: 'mic' },
  { time: '07:45 PM', title: 'Welcome remarks by Mike Da Silva', icon: 'mic' },
  { time: '08:00 PM', title: 'Presentation of Dragons Pakistan Awards 2026', icon: 'trophy' },
  { time: '09:00 PM', title: 'Gap and announcements', icon: 'people' },
  { time: '09:10 PM', title: 'Presentation continues', icon: 'trophy' },
  { time: '10:00 PM', title: 'Evening Concludes & Photo Session', icon: 'gift' },
  { time: '10:15 PM', title: 'Dinner', icon: 'dinner' },
]

function AgendaIcon({ type }) {
  return (
    <span className={`agenda-icon${type === 'gift' ? ' is-square' : ''}`} aria-hidden="true">
      {type === 'people' && (
        <svg viewBox="0 0 24 24">
          <circle cx="8.2" cy="7.4" r="3.1" />
          <path d="M2.4 19.2c.5-3.6 2.8-5.6 5.8-5.6s5.3 2 5.8 5.6H2.4Z" />
          <circle cx="16.7" cy="8.1" r="2.5" />
          <path d="M12.4 19.2c.4-2.7 1.9-4.3 4.3-4.3 2.5 0 4.1 1.6 4.4 4.3H12.4Z" />
        </svg>
      )}
      {type === 'mic' && (
        <svg viewBox="0 0 24 24">
          <path d="M3.8 9.2c-.8 0-1.5.7-1.5 1.5v2.6c0 .8.7 1.5 1.5 1.5h1.4v3.6h2.2v-3.6h1.2L15.8 18V6L7.1 9.2H3.8Z" />
          <path d="M17.2 9.4a3.4 3.4 0 0 1 0 5.2 1 1 0 1 0 1.2 1.6 5.4 5.4 0 0 0 0-8.4 1 1 0 1 0-1.2 1.6Z" />
        </svg>
      )}
      {type === 'trophy' && (
        <svg viewBox="0 0 24 24">
          <path d="M7 3.6h10v1.7h1.8c1 0 1.8.8 1.8 1.8V8c0 2.2-1.6 4-3.7 4.4-.6 1.4-1.8 2.4-3.3 2.8v2.6h3.2V20H7.2v-1.6h3.2v-2.6c-1.5-.4-2.7-1.4-3.3-2.8C5 12 3.4 10.2 3.4 8V7.1c0-1 .8-1.8 1.8-1.8H7V3.6Zm-1.8 3.5V8c0 1.1.7 2 1.8 2.4V7.1H5.2Zm13.6 0h-1.8v3.3c1.1-.4 1.8-1.3 1.8-2.4V7.1Z" />
        </svg>
      )}
      {type === 'music' && (
        <svg viewBox="0 0 24 24">
          <path d="M11 3.2v10.2a4.1 4.1 0 1 0 2.2 3.7V7.2H19V3.2h-8Z" />
        </svg>
      )}
      {type === 'dinner' && (
        <svg viewBox="0 0 24 24">
          <path d="M11 4.2h2v2.4h-2V4.2ZM5.2 14.2a6.8 6.8 0 0 1 13.6 0H5.2ZM4 15.4h16v1.8H4v-1.8ZM8.8 18h6.4v1.8H8.8V18Z" />
        </svg>
      )}
      {type === 'gift' && (
        <svg viewBox="0 0 24 24">
          <path d="M9.2 3.4c-1.3 0-2.4 1-2.4 2.4 0 .4.1.8.3 1.1H4.6C3.7 6.9 3 7.6 3 8.6V11h8.1V8.6H12v2.4H21V8.6c0-1-.7-1.7-1.6-1.7h-2.5c.2-.3.3-.7.3-1.1 0-1.4-1.1-2.4-2.4-2.4-1 0-1.8.5-2.2 1.3L12 5.4l-.6-.7c-.4-.8-1.2-1.3-2.2-1.3Zm0 1.8c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6Zm5.6 0c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6ZM3 12.4V19c0 1 .8 1.8 1.8 1.8H11V12.4H3Zm10 0V20.8h6.2c1 0 1.8-.8 1.8-1.8v-6.6H13Z" />
        </svg>
      )}
    </span>
  )
}

export default function AgendaScreen({ onProceed }) {
  const listRef = useRef(null)
  const [canScrollMore, setCanScrollMore] = useState(false)

  const updateScrollHint = useCallback(() => {
    const el = listRef.current
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    setCanScrollMore(remaining > 16)
  }, [])

  useEffect(() => {
    updateScrollHint()
    const el = listRef.current
    if (!el) return undefined

    const observer = new ResizeObserver(updateScrollHint)
    observer.observe(el)
    window.addEventListener('resize', updateScrollHint)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScrollHint)
    }
  }, [updateScrollHint])

  return (
    <ScreenShell className="agenda-screen">
      <BrandHeader />

      <div className="agenda-copy">
        <h1>Adstreet Awards</h1>
        <h2>
          <span />
          Event Agenda
          <span />
        </h2>
      </div>

      <div className={`agenda-list-wrap${canScrollMore ? '' : ' is-end'}`}>
        <ul className="agenda-list" ref={listRef} onScroll={updateScrollHint}>
          {AGENDA.map((item) => (
            <li key={item.time}>
              <div className="agenda-track">
                <AgendaIcon type={item.icon} />
              </div>
              <div className="agenda-text">
                <strong>{item.time}</strong>
                <span>{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
        <span className="agenda-scroll-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M6 8.5 12 14.5 18 8.5" />
          </svg>
        </span>
      </div>

      <p className="agenda-footer">We look forward to an unforgettable night!</p>
      <GoldButton onClick={onProceed}>GET AWARD</GoldButton>
    </ScreenShell>
  )
}
