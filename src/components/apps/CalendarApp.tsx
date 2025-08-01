import { ChevronLeft, ChevronRight } from 'lucide-react'
import './CalendarApp.css'

const CalendarApp = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const days = []
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  const events = [
    { day: 5, title: 'Security Assessment - ABC Corp', time: '9:00 AM' },
    { day: 12, title: 'Cloud Migration Planning', time: '2:00 PM' },
    { day: 18, title: 'Quarterly Business Review', time: '10:00 AM' },
    { day: 22, title: 'Network Maintenance Window', time: '11:00 PM' },
    { day: 25, title: 'Staff Training - Cybersecurity', time: '1:00 PM' },
    { day: 28, title: 'Client Onboarding Meeting', time: '3:00 PM' },
  ]

  return (
    <div className="calendar-app">
      <div className="calendar-header">
        <button className="calendar-nav-btn">
          <ChevronLeft size={20} />
        </button>
        <h2 className="calendar-title">{currentMonth}</h2>
        <button className="calendar-nav-btn">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-days-header">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-days">
          {days.map((day, index) => {
            const hasEvent = day && events.some(event => event.day === day)
            const isToday = day === currentDate.getDate()
            
            return (
              <div 
                key={index} 
                className={`calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
              >
                {day && (
                  <>
                    <span className="day-number">{day}</span>
                    {hasEvent && (
                      <div className="event-indicator">
                        {events
                          .filter(event => event.day === day)
                          .map((event, i) => (
                            <div key={i} className="event-dot" title={`${event.title} - ${event.time}`} />
                          ))
                        }
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CalendarApp