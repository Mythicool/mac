import React, { useState } from 'react'
import { Wifi, Battery, Search } from 'lucide-react'
import './MenuBar.css'

interface MenuBarProps {
  onMenuAction?: (action: string) => void
}

const MenuBar = ({ onMenuAction }: MenuBarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItems = [
    { id: 'soonertech', label: '🏢', items: ['About SoonerTech', 'Our Services', 'Contact Us', '---', 'Client Portal', '---', 'Emergency Support', '---', 'Schedule Consultation'] },
    { id: 'services', label: 'Services', items: ['Managed IT', 'Cybersecurity', 'Cloud Solutions', '---', 'IT Consulting', '24/7 Support', '---', 'View All Services'] },
    { id: 'solutions', label: 'Solutions', items: ['Small Business', 'Enterprise', 'Healthcare', 'Legal', '---', 'Industry Solutions'] },
    { id: 'resources', label: 'Resources', items: ['Blog', 'Case Studies', 'White Papers', '---', 'Security Alerts', 'Best Practices'] },
    { id: 'support', label: 'Support', items: ['Help Desk', 'Remote Assistance', 'Knowledge Base', '---', 'Submit Ticket', 'Emergency Line'] },
    { id: 'about', label: 'About', items: ['Our Team', 'Careers', 'Testimonials', '---', 'Oklahoma Locations'] }
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="menu-bar">
      <div className="menu-left">
        {menuItems.map((menu) => (
          <div 
            key={menu.id}
            className={`menu-item ${activeMenu === menu.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveMenu(menu.id)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="menu-label">{menu.label}</span>
            {activeMenu === menu.id && (
              <div className="dropdown-menu">
                {menu.items.map((item, index) => (
                  item === '---' ? (
                    <div key={index} className="menu-separator" />
                  ) : (
                    <div 
                      key={index} 
                      className="dropdown-item"
                      onClick={() => onMenuAction?.(item)}
                    >
                      {item}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="menu-right">
        <div className="menu-icon">
          <Search size={16} />
        </div>
        <div className="menu-icon">
          <Wifi size={16} />
        </div>
        <div className="menu-icon">
          <Battery size={16} />
        </div>
        <div className="menu-time">
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}

export default MenuBar