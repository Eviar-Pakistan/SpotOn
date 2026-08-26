import { useEffect, useState } from 'react'
import ScreenShell from '../components/ScreenShell'
import BrandHeader from '../components/BrandHeader'
import GoldButton from '../components/GoldButton'
import QrCode from '../components/QrCode'

export default function QrScanScreen({ onScanned }) {
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    if (!scanning) return undefined
    const timer = window.setTimeout(() => {
      onScanned()
    }, 5000)
    return () => window.clearTimeout(timer)
  }, [scanning, onScanned])

  return (
    <ScreenShell className="qr-screen">
      <BrandHeader />

      <div className="qr-main">
        <div className="qr-copy">
          <h1>Adstreet Awards</h1>
          <p>Scan the QR code on your table</p>
        </div>

        <div className={`qr-frame ${scanning ? 'is-scanning' : ''}`}>
          <span className="qr-corner tl" />
          <span className="qr-corner tr" />
          <span className="qr-corner bl" />
          <span className="qr-corner br" />
          <QrCode />
          {scanning && (
            <>
              <div className="scan-line" />
              <div className="scan-overlay">
                <span>Scanning...</span>
              </div>
            </>
          )}
        </div>

        <GoldButton onClick={() => setScanning(true)} disabled={scanning}>
          {scanning ? 'Scanning' : 'Scan Code'}
        </GoldButton>
      </div>

    
    </ScreenShell>
  )
}
