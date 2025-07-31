import { Mail, Star, Archive, Trash2 } from 'lucide-react'
import './MailApp.css'

const MailApp = () => {
  const emails = [
    { id: 1, from: 'Apple', subject: 'Welcome to macOS', preview: 'Thank you for choosing macOS...', time: '10:30 AM', unread: true },
    { id: 2, from: 'GitHub', subject: 'Your weekly digest', preview: 'Here are the highlights from your repositories...', time: '9:15 AM', unread: true },
    { id: 3, from: 'Team', subject: 'Project Update', preview: 'The latest updates on our current project...', time: 'Yesterday', unread: false },
    { id: 4, from: 'Newsletter', subject: 'Tech News Weekly', preview: 'This week in technology...', time: 'Yesterday', unread: false },
  ]

  return (
    <div className="mail-app">
      <div className="mail-sidebar">
        <div className="mail-section">
          <div className="mail-folder active">
            <Mail size={16} />
            <span>Inbox</span>
            <span className="mail-count">2</span>
          </div>
          <div className="mail-folder">
            <Star size={16} />
            <span>Starred</span>
          </div>
          <div className="mail-folder">
            <Archive size={16} />
            <span>Archive</span>
          </div>
          <div className="mail-folder">
            <Trash2 size={16} />
            <span>Trash</span>
          </div>
        </div>
      </div>
      
      <div className="mail-content">
        <div className="mail-list">
          {emails.map((email) => (
            <div key={email.id} className={`mail-item ${email.unread ? 'unread' : ''}`}>
              <div className="mail-from">{email.from}</div>
              <div className="mail-subject">{email.subject}</div>
              <div className="mail-preview">{email.preview}</div>
              <div className="mail-time">{email.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MailApp