import { Rnd } from 'react-rnd'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import type { AppWindow } from '../App'
import './WindowManager.css'

interface WindowManagerProps {
  windows: AppWindow[]
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onFocus: (id: string) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
  onUpdateSize: (id: string, width: number, height: number, x?: number, y?: number) => void
}

interface ViewportBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
}

const WindowManager = ({ windows, onClose, onMinimize, onMaximize, onFocus, onUpdatePosition, onUpdateSize }: WindowManagerProps) => {
  const [viewportBounds, setViewportBounds] = useState<ViewportBounds>({
    minX: 0,
    minY: 24, // Account for menu bar
    maxX: window.innerWidth,
    maxY: window.innerHeight - 80, // Account for dock
    width: window.innerWidth,
    height: window.innerHeight - 104 // Total usable height (24px menu + 80px dock)
  })
  
  // Track dragging state for enhanced visual feedback
  const [draggingWindows, setDraggingWindows] = useState<Set<string>>(new Set())
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null)

  // Calculate viewport bounds
  const calculateViewportBounds = useCallback((): ViewportBounds => {
    const menuBarHeight = 24
    const dockHeight = 80
    
    return {
      minX: 0,
      minY: menuBarHeight,
      maxX: window.innerWidth,
      maxY: window.innerHeight - dockHeight,
      width: window.innerWidth,
      height: window.innerHeight - menuBarHeight - dockHeight
    }
  }, [])

  // Update viewport bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportBounds(calculateViewportBounds())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateViewportBounds])

  // Validate and constrain window position within viewport bounds
  const validatePosition = useCallback((x: number, y: number, width: number, height: number): { x: number; y: number } => {
    const bounds = viewportBounds
    
    // Ensure window doesn't go beyond right edge
    const constrainedX = Math.min(x, bounds.maxX - width)
    // Ensure window doesn't go beyond bottom edge
    const constrainedY = Math.min(y, bounds.maxY - height)
    
    // Ensure window doesn't go beyond left edge (keep at least 100px visible)
    const finalX = Math.max(constrainedX, bounds.minX - width + 100)
    // Ensure window doesn't go above menu bar
    const finalY = Math.max(constrainedY, bounds.minY)
    
    return { x: finalX, y: finalY }
  }, [viewportBounds])

  // Enhanced drag handling with visual feedback
  const handleDragStart = useCallback((windowId: string) => {
    setDraggingWindows(prev => new Set(prev).add(windowId))
    onFocus(windowId) // Focus window when drag starts
  }, [onFocus])

  const handleDragStop = useCallback((windowId: string, x: number, y: number, width: number, height: number) => {
    const validatedPosition = validatePosition(x, y, width, height)
    onUpdatePosition(windowId, validatedPosition.x, validatedPosition.y)
    setDraggingWindows(prev => {
      const newSet = new Set(prev)
      newSet.delete(windowId)
      return newSet
    })
  }, [validatePosition, onUpdatePosition])

  // Enhanced resize handling with position validation
  const handleResizeStop = useCallback((windowId: string, width: number, height: number, x: number, y: number) => {
    const validatedPosition = validatePosition(x, y, width, height)
    // Pass both size and position updates together for atomic update
    onUpdateSize(windowId, width, height, validatedPosition.x, validatedPosition.y)
  }, [validatePosition, onUpdateSize])

  // Handle window focus with visual feedback
  const handleWindowFocus = useCallback((windowId: string) => {
    setFocusedWindow(windowId)
    onFocus(windowId)
  }, [onFocus])

  // Enhanced minimize animation
  const handleMinimize = useCallback((windowId: string) => {
    // Add a slight delay to show the minimize animation
    setTimeout(() => {
      onMinimize(windowId)
    }, 150)
  }, [onMinimize])

  // Enhanced maximize with smooth transition
  const handleMaximize = useCallback((windowId: string) => {
    onMaximize(windowId)
  }, [onMaximize])

  // Handle continuous drag for smooth feedback
  const handleDrag = useCallback((windowId: string, _x: number, _y: number, _width: number, _height: number) => {
    // During drag, we allow temporary invalid positions for smooth dragging
    // Validation happens on drag stop
    // This prevents snapping during drag operations
    
    // Ensure dragging state is maintained
    setDraggingWindows(prev => new Set(prev).add(windowId))
  }, [])

  return (
    <AnimatePresence mode="popLayout">
      {windows.map((window) => {
        if (window.isMinimized) return null
        
        const Component = window.component
        const isDragging = draggingWindows.has(window.id)
        const isFocused = focusedWindow === window.id
        
        // Enhanced animation variants for different states
        const windowVariants = {
          initial: { 
            scale: 0.8, 
            opacity: 0,
            y: 50,
            rotateX: 10
          },
          animate: { 
            scale: 1, 
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8
            }
          },
          exit: { 
            scale: 0.8, 
            opacity: 0,
            y: -20,
            rotateX: -5,
            transition: {
              duration: 0.2,
              ease: "easeInOut"
            }
          },
          maximize: {
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.4
            }
          },
          minimize: {
            scale: 0.1,
            opacity: 0,
            y: window.innerHeight,
            transition: {
              duration: 0.3,
              ease: "easeIn"
            }
          },
          dragging: {
            scale: 1.02,
            rotateZ: isDragging ? 1 : 0,
            boxShadow: isDragging 
              ? "0 30px 60px rgba(0, 0, 0, 0.4)" 
              : "0 20px 40px rgba(0, 0, 0, 0.3)",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30
            }
          },
          focused: {
            scale: isFocused ? 1.01 : 1,
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          }
        }
        
        return (
          <motion.div
            key={window.id}
            variants={windowVariants}
            initial="initial"
            animate={[
              "animate",
              window.isMaximized ? "maximize" : "",
              isDragging ? "dragging" : "",
              isFocused ? "focused" : ""
            ].filter(Boolean)}
            exit="exit"
            style={{ 
              zIndex: window.zIndex,
              position: 'absolute',
              transformOrigin: 'center center'
            }}
            layout
            layoutId={window.id}
          >
            <Rnd
              position={{ x: window.x, y: window.y }}
              size={{ width: window.width, height: window.height }}
              minWidth={400}
              minHeight={300}
              bounds="parent"
              dragHandleClassName="window-header"
              onMouseDown={() => handleWindowFocus(window.id)}
              onDragStart={() => {
                handleDragStart(window.id)
              }}
              onDrag={(_e, d) => {
                handleDrag(window.id, d.x, d.y, window.width, window.height)
              }}
              onDragStop={(_e, d) => {
                handleDragStop(window.id, d.x, d.y, window.width, window.height)
              }}
              onResizeStart={() => {
                // Focus window when resize starts
                handleWindowFocus(window.id)
              }}
              onResizeStop={(_e, _direction, ref, _delta, position) => {
                handleResizeStop(window.id, ref.offsetWidth, ref.offsetHeight, position.x, position.y)
              }}
              enableResizing={!window.isMaximized ? {
                top: false,
                right: true,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false,
              } : false}
              disableDragging={window.isMaximized}
              dragAxis="both"
              cancel=".window-controls,.window-content"
            >
              <div 
                className={`window ${isDragging ? 'dragging' : ''} ${isFocused ? 'focused' : ''} ${window.isMaximized ? 'maximized' : ''}`}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <motion.div 
                  className="window-header"
                  animate={{
                    backgroundColor: isFocused 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="window-controls">
                    <motion.div 
                      className="window-control close"
                      onClick={() => onClose(window.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <motion.div 
                      className="window-control minimize"
                      onClick={() => handleMinimize(window.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <motion.div 
                      className="window-control maximize"
                      onClick={() => handleMaximize(window.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </div>
                  <motion.div 
                    className="window-title"
                    animate={{
                      opacity: isFocused ? 1 : 0.7
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {window.title}
                  </motion.div>
                  <div style={{ width: '68px' }} /> {/* Spacer for centering */}
                </motion.div>
                <motion.div 
                  className="window-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  style={{ 
                    height: 'calc(100% - 28px)',
                    overflow: 'auto',
                    position: 'relative'
                  }}
                >
                  <Component />
                </motion.div>
              </div>
            </Rnd>
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}

export default WindowManager