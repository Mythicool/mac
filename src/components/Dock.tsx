import { useState } from 'react'
import { motion } from 'framer-motion'
import { Folder, Terminal, Globe, Mail, Calendar, Camera, Music } from 'lucide-react'
import FinderApp from './apps/FinderApp'
import TerminalApp from './apps/TerminalApp'
import SafariApp from './apps/SafariApp'
import MailApp from './apps/MailApp'
import CalendarApp from './apps/CalendarApp'
import PhotosApp from './apps/PhotosApp'
import MusicApp from './apps/MusicApp'
import './Dock.css'

interface DockProps {
  onOpenApp: (id: string, title: string, component: React.ComponentType) => void
}

const Dock = ({ onOpenApp }: DockProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const apps = [
    { id: 'finder', name: 'Finder', icon: Folder, component: FinderApp },
    { id: 'terminal', name: 'Terminal', icon: Terminal, component: TerminalApp },
    { id: 'safari', name: 'Safari', icon: Globe, component: SafariApp },
    { id: 'mail', name: 'Mail', icon: Mail, component: MailApp },
    { id: 'calendar', name: 'Calendar', icon: Calendar, component: CalendarApp },
    { id: 'photos', name: 'Photos', icon: Camera, component: PhotosApp },
    { id: 'music', name: 'Music', icon: Music, component: MusicApp },
  ]

  return (
    <div className="dock-container">
      <div className="dock">
        {apps.map((app, index) => {
          const Icon = app.icon
          const isHovered = hoveredIcon === app.id
          const isAdjacent = hoveredIcon && Math.abs(apps.findIndex(a => a.id === hoveredIcon) - index) === 1
          
          return (
            <motion.div
              key={app.id}
              className="dock-icon"
              onMouseEnter={() => setHoveredIcon(app.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => onOpenApp(app.id, app.name, app.component)}
              animate={{
                scale: isHovered ? 1.5 : isAdjacent ? 1.2 : 1,
                y: isHovered ? -20 : isAdjacent ? -10 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="dock-icon-bg">
                <Icon size={32} />
              </div>
              {isHovered && (
                <motion.div 
                  className="dock-tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {app.name}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Dock