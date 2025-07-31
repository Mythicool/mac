import { useState } from 'react'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import Desktop from './components/Desktop'
import WindowManager from './components/WindowManager'
import './App.css'

export interface AppWindow {
  id: string
  title: string
  component: React.ComponentType
  isMinimized: boolean
  zIndex: number
}

function App() {
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)

  const openWindow = (id: string, title: string, component: React.ComponentType) => {
    const existingWindow = windows.find(w => w.id === id)
    if (existingWindow) {
      // Bring to front and unminimize
      setWindows(prev => prev.map(w => 
        w.id === id 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      ))
      setNextZIndex(prev => prev + 1)
      return
    }

    const newWindow: AppWindow = {
      id,
      title,
      component,
      isMinimized: false,
      zIndex: nextZIndex
    }
    
    setWindows(prev => [...prev, newWindow])
    setNextZIndex(prev => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ))
  }

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  return (
    <div className="macos-desktop">
      <MenuBar />
      <Desktop />
      <WindowManager 
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onFocus={focusWindow}
      />
      <Dock onOpenApp={openWindow} />
    </div>
  )
}

export default App
