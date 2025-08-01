import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Shield, Wrench, Mail, Calendar, Users, FileText } from 'lucide-react'
import HomeApp from './apps/HomeApp'
import SecurityApp from './apps/SecurityApp'
import ServicesApp from './apps/ServicesApp'
import ContactApp from './apps/ContactApp'
import CalendarApp from './apps/CalendarApp'
import TeamApp from './apps/TeamApp'
import BlogApp from './apps/BlogApp'
import './Dock.css'

interface DockProps {
  onOpenApp: (id: string, title: string, component: React.ComponentType) => void
}

const Dock = ({ onOpenApp }: DockProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const apps = [
    { id: 'home', name: 'Home', icon: Home, component: HomeApp },
    { id: 'security', name: 'Security', icon: Shield, component: SecurityApp },
    { id: 'services', name: 'Services', icon: Wrench, component: ServicesApp },
    { id: 'contact', name: 'Contact', icon: Mail, component: ContactApp },
    { id: 'calendar', name: 'Schedule', icon: Calendar, component: CalendarApp },
    { id: 'team', name: 'Our Team', icon: Users, component: TeamApp },
    { id: 'blog', name: 'Blog', icon: FileText, component: BlogApp },
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