import ScreenShell from '../components/ScreenShell'
import GoldButton from '../components/GoldButton'
import dragon from '../assets/dragon_without_bg.png'
import spoton from '../assets/spoton.png'
import adstreet from '../assets/adstreet_logo.png'

export default function IntroScreen({ onStart }) {
  return (
    <ScreenShell className="intro-screen">
      <div className="intro-stack">
      <div className="intro-partners">
          <img src={spoton} alt="Spoton" className="intro-spoton" />
          <img src={adstreet} alt="Adstreet" className="intro-adstreet" />
        </div>
        <img src={dragon} alt="Golden dragon" className="intro-dragon" />
       
        <GoldButton onClick={onStart} className="intro-start">
          View Agenda
        </GoldButton>
      </div>
    </ScreenShell>
  )
}
