import React, { useState } from 'react'
import { Wifi, Battery, Search } from 'lucide-react'
import './MenuBar.css'

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItems = [
    { id: 'apple', label: '🍎', items: ['About This Mac', 'System Preferences...', 'App Store...', '---', 'Recent Items', '---', 'Force Quit...', '---', 'Sleep', 'Restart...', 'Shut Down...'] },
    { id: 'file', label: 'File', items: ['New', 'Open...', 'Close', '---', 'Save', 'Save As...', '---', 'Print...'] },
    { id: 'edit', label: 'Edit', items: ['Undo', 'Redo', '---', 'Cut', 'Copy', 'Paste', 'Select All'] },
    { id: 'view', label: 'View', items: ['Show Toolbar', 'Customize Toolbar...', '---', 'Show Sidebar', 'Hide Sidebar'] },
    { id: 'window', label: 'Window', items: ['Minimize', 'Zoom', '---', 'Bring All to Front'] },
    { id: 'help', label: 'Help', items: ['Search', '---', 'macOS Help'] }
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
                    <div key={index} className="dropdown-item">
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