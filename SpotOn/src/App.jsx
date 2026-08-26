import { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import IntroScreen from './screens/IntroScreen'
import AgendaScreen from './screens/AgendaScreen'
import EnterNameScreen from './screens/EnterNameScreen'
import GiveawayScreen from './screens/GiveawayScreen'
import UserEntriesScreen from './screens/UserEntriesScreen'
import { getTableFromUrl, saveGuest } from './api'
import './App.css'

function GuestApp() {
  const [screen, setScreen] = useState('intro')
  const [guestName, setGuestName] = useState('')
  const [table] = useState(() => getTableFromUrl())
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const goAgenda = useCallback(() => setScreen('agenda'), [])
  const goName = useCallback(() => {
    setSaveError('')
    setScreen('name')
  }, [])
  const goGiveaway = useCallback(() => setScreen('giveaway'), [])

  async function handleSubmitName() {
    const name = guestName.trim()
    if (!table) {
      setSaveError('This link is missing a table number.')
      return
    }

    setSaving(true)
    setSaveError('')

    try {
      await saveGuest(table, name)
      goGiveaway()
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Could not save your name')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="app-phone">
      {screen === 'intro' && <IntroScreen onStart={goAgenda} />}
      {screen === 'agenda' && <AgendaScreen onProceed={goName} />}
      {screen === 'name' && (
        <EnterNameScreen
          name={guestName}
          onChange={setGuestName}
          onClose={goAgenda}
          onSubmit={handleSubmitName}
          saving={saving}
          error={saveError}
        />
      )}
      {screen === 'giveaway' && <GiveawayScreen name={guestName.trim()} />}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/userEnteries" element={<UserEntriesScreen />} />
      <Route path="*" element={<GuestApp />} />
    </Routes>
  )
}
