import spoton from '../assets/spoton.png'
import dragon from '../assets/dragon_without_bg.png'
import adstreet from '../assets/adstreet_logo.png'

export default function BrandHeader() {
  return (
    <header className="brand-header">
       <img src={spoton} alt="Spoton" className="brand-logo brand-logo-spoton" />
      <img src={dragon} alt="Dragon" className="brand-logo brand-logo-dragon" />
      <img src={adstreet} alt="Adstreet" className="brand-logo brand-logo-adstreet" />
     
     
    </header>
  )
}
