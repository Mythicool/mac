import { useState, useEffect, useRef } from 'react'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import Desktop from './components/Desktop'
import WindowManager from './components/WindowManager'
import HomeApp from './components/apps/HomeApp'
import SecurityApp from './components/apps/SecurityApp'
import ServicesApp from './components/apps/ServicesApp'
import ContactApp from './components/apps/ContactApp'
import CalendarApp from './components/apps/CalendarApp'
import TeamApp from './components/apps/TeamApp'
import BlogApp from './components/apps/BlogApp'
import AboutApp from './components/apps/AboutApp'
import './App.css'

export interface AppWindow {
  id: string
  title: string
  component: React.ComponentType
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
  previousState?: {
    x: number
    y: number
    width: number
    height: number
  }
  isDragging?: boolean
  lastValidPosition?: { x: number; y: number }
}

function App() {
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)
  const minimizeTimeouts = useRef<Map<string, number>>(new Map())
  const maximizeTimeouts = useRef<Map<string, number>>(new Map())

  // Enhanced window position calculation with validation
  const getNextWindowPosition = (width: number = 800, height: number = 600) => {
    const visibleWindows = windows.filter(w => !w.isMinimized)
    const baseX = 100
    const baseY = 100
    const offsetX = 50 // Reduced spacing for better stacking
    const offsetY = 50  // Vertical offset for stacking
    
    let position = {
      x: baseX + (visibleWindows.length * offsetX),
      y: baseY + (visibleWindows.length * offsetY)
    }
    
    // Validate the calculated position
    const validated = validateWindowPosition(position.x, position.y, width, height)
    
    // If the calculated position is invalid, try alternative positions
    if (!validated.isValid) {
      // Try a few alternative positions
      const alternatives = [
        { x: baseX, y: baseY },
        { x: baseX + 50, y: baseY + 50 },
        { x: baseX + 100, y: baseY + 100 },
        { x: 50, y: 50 }
      ]
      
      for (const alt of alternatives) {
        const altValidated = validateWindowPosition(alt.x, alt.y, width, height)
        if (altValidated.isValid) {
          position = { x: altValidated.x, y: altValidated.y }
          break
        }
      }
    } else {
      position = { x: validated.x, y: validated.y }
    }
    
    return position
  }

  const openWindow = (id: string, title: string, component: React.ComponentType) => {
    const existingWindow = windows.find(w => w.id === id)
    
    if (existingWindow) {
      // Clear any existing minimize timeout for this window
      const timeout = minimizeTimeouts.current.get(id)
      if (timeout) {
        clearTimeout(timeout)
        minimizeTimeouts.current.delete(id)
      }
      
      // Restore window from minimized state with proper position/size restoration
      setWindows(prev => prev.map(w => {
        if (w.id === id) {
          const restoredWindow = { 
            ...w, 
            isMinimized: false, 
            zIndex: nextZIndex 
          }
          
          // If window was minimized and has previousState, restore it
          if (w.isMinimized && w.previousState && !w.isMaximized) {
            restoredWindow.x = w.previousState.x
            restoredWindow.y = w.previousState.y
            restoredWindow.width = w.previousState.width
            restoredWindow.height = w.previousState.height
            restoredWindow.previousState = undefined
          }
          
          return restoredWindow
        }
        return w
      }))
      setNextZIndex(prev => prev + 1)
      return
    }

    // Get position for new window with dimensions
    const windowWidth = 800
    const windowHeight = 600
    const position = getNextWindowPosition(windowWidth, windowHeight)
    
    const newWindow: AppWindow = {
      id,
      title,
      component,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      x: position.x,
      y: position.y,
      width: windowWidth,
      height: windowHeight,
      lastValidPosition: { x: position.x, y: position.y }
    }
    
    // Minimize previous windows after 5 seconds
    const currentVisibleWindows = windows.filter(w => !w.isMinimized)
    currentVisibleWindows.forEach(window => {
      const timeout = setTimeout(() => {
        setWindows(prev => prev.map(w => 
          w.id === window.id ? { ...w, isMinimized: true } : w
        ))
        minimizeTimeouts.current.delete(window.id)
      }, 5000)
      
      minimizeTimeouts.current.set(window.id, timeout)
    })
    
    // Auto-maximize new window after 6 seconds
    const maximizeTimeout = setTimeout(() => {
      setWindows(prev => prev.map(w => {
        if (w.id === id && !w.isMinimized && !w.isMaximized) {
          return {
            ...w,
            isMaximized: true,
            previousState: {
              x: w.x,
              y: w.y,
              width: w.width,
              height: w.height
            },
            x: 0,
            y: 24, // Account for menu bar
            width: window.innerWidth,
            height: window.innerHeight - 104 // 24px menu bar + 80px dock = 104px total
          }
        }
        return w
      }))
      maximizeTimeouts.current.delete(id)
    }, 6000)
    
    maximizeTimeouts.current.set(id, maximizeTimeout)
    
    setWindows(prev => [...prev, newWindow])
    setNextZIndex(prev => prev + 1)
  }

  const closeWindow = (id: string) => {
    // Clear any minimize timeout for this window
    const timeout = minimizeTimeouts.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      minimizeTimeouts.current.delete(id)
    }
    
    // Clear any maximize timeout for this window
    const maximizeTimeout = maximizeTimeouts.current.get(id)
    if (maximizeTimeout) {
      clearTimeout(maximizeTimeout)
      maximizeTimeouts.current.delete(id)
    }
    
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    // Clear any minimize timeout for this window
    const timeout = minimizeTimeouts.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      minimizeTimeouts.current.delete(id)
    }
    
    // Clear any maximize timeout for this window
    const maximizeTimeout = maximizeTimeouts.current.get(id)
    if (maximizeTimeout) {
      clearTimeout(maximizeTimeout)
      maximizeTimeouts.current.delete(id)
    }
    
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        // Store current state before minimizing if not already stored
        const updatedWindow = { ...w, isMinimized: true }
        
        // If window is maximized, we already have previousState
        // If not maximized and no previousState, store current position/size
        if (!w.isMaximized && !w.previousState) {
          updatedWindow.previousState = {
            x: w.x,
            y: w.y,
            width: w.width,
            height: w.height
          }
        }
        
        return updatedWindow
      }
      return w
    }))
  }

  const focusWindow = (id: string) => {
    // Clear any minimize timeout for this window when it's focused
    const timeout = minimizeTimeouts.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      minimizeTimeouts.current.delete(id)
    }
    
    // Clear any maximize timeout for this window when it's focused (user interaction cancels auto-maximize)
    const maximizeTimeout = maximizeTimeouts.current.get(id)
    if (maximizeTimeout) {
      clearTimeout(maximizeTimeout)
      maximizeTimeouts.current.delete(id)
    }
    
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const focusedWindow = { ...w, zIndex: nextZIndex }
        
        // If window is minimized, restore it when focused
        if (w.isMinimized) {
          focusedWindow.isMinimized = false
          
          // Restore previous state if available and not maximized
          if (w.previousState && !w.isMaximized) {
            focusedWindow.x = w.previousState.x
            focusedWindow.y = w.previousState.y
            focusedWindow.width = w.previousState.width
            focusedWindow.height = w.previousState.height
            focusedWindow.previousState = undefined
          }
        }
        
        return focusedWindow
      }
      return w
    }))
    setNextZIndex(prev => prev + 1)
  }

  // Enhanced position validation and tracking
  const validateWindowPosition = (x: number, y: number, width: number, height: number) => {
    const menuBarHeight = 24
    const dockHeight = 80
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight - dockHeight
    
    // Ensure window doesn't go beyond right edge
    let validX = Math.min(x, viewportWidth - width)
    // Ensure window doesn't go beyond bottom edge
    let validY = Math.min(y, viewportHeight - height)
    
    // Keep at least 100px visible on the left side
    validX = Math.max(validX, -width + 100)
    // Ensure window doesn't go above menu bar
    validY = Math.max(validY, menuBarHeight)
    
    return { x: validX, y: validY, isValid: validX === x && validY === y }
  }

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const validated = validateWindowPosition(x, y, w.width, w.height)
        return { 
          ...w, 
          x: validated.x, 
          y: validated.y,
          lastValidPosition: { x: validated.x, y: validated.y }
        }
      }
      return w
    }))
  }

  // Enhanced window position validation for viewport changes
  const validateWindowPositions = () => {
    const menuBarHeight = 24
    const dockHeight = 80
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight - dockHeight

    setWindows(prev => prev.map(window => {
      if (window.isMinimized) return window
      
      // If window is maximized, update its dimensions to match new viewport
      if (window.isMaximized) {
        return {
          ...window,
          x: 0,
          y: menuBarHeight,
          width: viewportWidth,
          height: viewportHeight - menuBarHeight,
          lastValidPosition: { x: 0, y: menuBarHeight }
        }
      }

      // Validate current position with current dimensions
      const validated = validateWindowPosition(window.x, window.y, window.width, window.height)
      
      // If position changed, update with fallback positioning
      if (!validated.isValid) {
        // Try to use last valid position if available
        let fallbackX = validated.x
        let fallbackY = validated.y
        
        if (window.lastValidPosition) {
          const lastValidated = validateWindowPosition(
            window.lastValidPosition.x, 
            window.lastValidPosition.y, 
            window.width, 
            window.height
          )
          if (lastValidated.isValid) {
            fallbackX = lastValidated.x
            fallbackY = lastValidated.y
          }
        }
        
        // If still invalid, use safe fallback position
        if (!validateWindowPosition(fallbackX, fallbackY, window.width, window.height).isValid) {
          const safePosition = getNextWindowPosition(window.width, window.height)
          fallbackX = safePosition.x
          fallbackY = safePosition.y
        }
        
        return {
          ...window,
          x: fallbackX,
          y: fallbackY,
          lastValidPosition: { x: fallbackX, y: fallbackY }
        }
      }

      // Update last valid position if current position is valid
      return {
        ...window,
        lastValidPosition: { x: window.x, y: window.y }
      }
    }))
  }

  const updateWindowSize = (id: string, width: number, height: number, x?: number, y?: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        // Use provided position or current position
        const currentX = x !== undefined ? x : w.x
        const currentY = y !== undefined ? y : w.y
        
        // Validate position with new dimensions
        const validated = validateWindowPosition(currentX, currentY, width, height)
        
        return { 
          ...w, 
          width, 
          height,
          x: validated.x,
          y: validated.y,
          lastValidPosition: { x: validated.x, y: validated.y }
        }
      }
      return w
    }))
  }

  const maximizeWindow = (id: string) => {
    // Clear any maximize timeout for this window (manual maximize cancels auto-maximize)
    const maximizeTimeout = maximizeTimeouts.current.get(id)
    if (maximizeTimeout) {
      clearTimeout(maximizeTimeout)
      maximizeTimeouts.current.delete(id)
    }
    
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (w.isMaximized) {
          // Restore from maximized state
          return {
            ...w,
            isMaximized: false,
            x: w.previousState?.x || 100,
            y: w.previousState?.y || 100,
            width: w.previousState?.width || 800,
            height: w.previousState?.height || 600,
            previousState: undefined
          }
        } else {
          // Maximize window - position at (0, 24) with full width and height minus 104px
          return {
            ...w,
            isMaximized: true,
            previousState: {
              x: w.x,
              y: w.y,
              width: w.width,
              height: w.height
            },
            x: 0,
            y: 24, // Account for menu bar
            width: window.innerWidth,
            height: window.innerHeight - 104 // 24px menu bar + 80px dock = 104px total
          }
        }
      }
      return w
    }))
  }

  const handleMenuAction = (action: string) => {
    // Map menu actions to app openings
    const menuActionMap: Record<string, { id: string, title: string, component: React.ComponentType }> = {
      'About SoonerTech': { id: 'about', title: 'About This Mac', component: AboutApp },
      'System Preferences...': { id: 'home', title: 'SoonerTech Solutions', component: HomeApp },
      'Our Services': { id: 'services', title: 'Our Services', component: ServicesApp },
      'Contact Us': { id: 'contact', title: 'Contact Us', component: ContactApp },
      'Client Portal': { id: 'security', title: 'Security Portal', component: SecurityApp },
      'Schedule Consultation': { id: 'calendar', title: 'Schedule', component: CalendarApp },
      'Managed IT': { id: 'services', title: 'Our Services', component: ServicesApp },
      'Cybersecurity': { id: 'security', title: 'Security', component: SecurityApp },
      'Cloud Solutions': { id: 'services', title: 'Our Services', component: ServicesApp },
      'Our Team': { id: 'team', title: 'Our Team', component: TeamApp },
      'Blog': { id: 'blog', title: 'Blog', component: BlogApp },
      'Small Business': { id: 'services', title: 'Our Services', component: ServicesApp },
      'Enterprise': { id: 'services', title: 'Our Services', component: ServicesApp },
      'Healthcare': { id: 'services', title: 'Our Services', component: ServicesApp },
      'Legal': { id: 'services', title: 'Our Services', component: ServicesApp },
    }

    const mappedAction = menuActionMap[action]
    if (mappedAction) {
      openWindow(mappedAction.id, mappedAction.title, mappedAction.component)
    }
  }

  // Recovery function for windows that get stuck in invalid positions
  const recoverWindowPositions = () => {
    setWindows(prev => prev.map((window, index) => {
      if (window.isMinimized || window.isMaximized) return window
      
      const validated = validateWindowPosition(window.x, window.y, window.width, window.height)
      if (!validated.isValid) {
        // Force a safe position using the index for stacking
        const safeX = 100 + (index * 50)
        const safeY = 100 + (index * 50)
        const safeValidated = validateWindowPosition(safeX, safeY, window.width, window.height)
        
        return {
          ...window,
          x: safeValidated.x,
          y: safeValidated.y,
          lastValidPosition: { x: safeValidated.x, y: safeValidated.y }
        }
      }
      return window
    }))
  }

  // Expose recovery function for debugging (can be called from console)
  useEffect(() => {
    (window as any).recoverWindowPositions = recoverWindowPositions
    return () => {
      delete (window as any).recoverWindowPositions
    }
  }, [recoverWindowPositions])

  // Enhanced browser resize handling with debouncing
  useEffect(() => {
    let resizeTimeout: number

    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      
      // Debounce resize handling to prevent excessive updates
      resizeTimeout = setTimeout(() => {
        validateWindowPositions()
      }, 100)
    }

    // Initial validation on mount
    validateWindowPositions()

    window.addEventListener('resize', handleResize)
    
    // Add visibility change handler to recover windows if needed
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // When page becomes visible again, validate positions
        setTimeout(validateWindowPositions, 100)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      minimizeTimeouts.current.forEach(timeout => clearTimeout(timeout))
      minimizeTimeouts.current.clear()
      maximizeTimeouts.current.forEach(timeout => clearTimeout(timeout))
      maximizeTimeouts.current.clear()
    }
  }, [])

  return (
    <div className="macos-desktop">
      <MenuBar onMenuAction={handleMenuAction} />
      <Desktop />
      <WindowManager 
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onFocus={focusWindow}
        onUpdatePosition={updateWindowPosition}
        onUpdateSize={updateWindowSize}
      />
      <Dock onOpenApp={openWindow} />
    </div>
  )
}

export default App
