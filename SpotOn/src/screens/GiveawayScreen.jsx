import ScreenShell from '../components/ScreenShell'
import giftBox from '../assets/gift_box.png'
import BrandHeader from '../components/BrandHeader'
export default function GiveawayScreen({ name }) {
  return (
    <ScreenShell className="giveaway-screen" spark={false}>
      <BrandHeader />

      <div className="check-badge" aria-hidden="true">
        <svg viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" />
          <path d="M22 37.5 31.5 47 51 26" />
        </svg>
      </div>

      <h1>Thank you {name}!</h1>
      <p>Stay tuned, a special surprise is on its way!</p>

      <img src={giftBox} alt="Gold ribbon gift box" className="gift-box" />
    </ScreenShell>
  )
}
