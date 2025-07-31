import { Rnd } from 'react-rnd'
import { motion, AnimatePresence } from 'framer-motion'
import type { AppWindow } from '../App'
import './WindowManager.css'

interface WindowManagerProps {
  windows: AppWindow[]
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onFocus: (id: string) => void
}

const WindowManager = ({ windows, onClose, onMinimize, onFocus }: WindowManagerProps) => {
  return (
    <AnimatePresence>
      {windows.map((window) => {
        if (window.isMinimized) return null
        
        const Component = window.component
        
        return (
          <motion.div
            key={window.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ zIndex: window.zIndex }}
          >
            <Rnd
              default={{
                x: 100 + (windows.indexOf(window) * 30),
                y: 100 + (windows.indexOf(window) * 30),
                width: 800,
                height: 600,
              }}
              minWidth={400}
              minHeight={300}
              bounds="parent"
              dragHandleClassName="window-header"
              onMouseDown={() => onFocus(window.id)}
            >
              <div className="window">
                <div className="window-header">
                  <div className="window-controls">
                    <div 
                      className="window-control close"
                      onClick={() => onClose(window.id)}
                    />
                    <div 
                      className="window-control minimize"
                      onClick={() => onMinimize(window.id)}
                    />
                    <div className="window-control maximize" />
                  </div>
                  <div className="window-title">{window.title}</div>
                  <div style={{ width: '68px' }} /> {/* Spacer for centering */}
                </div>
                <div className="window-content">
                  <Component />
                </div>
              </div>
            </Rnd>
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}

export default WindowManager