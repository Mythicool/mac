import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, Share, Bookmark } from 'lucide-react'
import './SafariApp.css'

const SafariApp = () => {
  const [url, setUrl] = useState('https://www.apple.com')

  return (
    <div className="safari-app">
      <div className="safari-toolbar">
        <div className="safari-nav">
          <button className="safari-btn"><ArrowLeft size={16} /></button>
          <button className="safari-btn"><ArrowRight size={16} /></button>
          <button className="safari-btn"><RotateCcw size={16} /></button>
        </div>
        
        <div className="safari-address-bar">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="address-input"
          />
        </div>
        
        <div className="safari-actions">
          <button className="safari-btn"><Share size={16} /></button>
          <button className="safari-btn"><Bookmark size={16} /></button>
        </div>
      </div>
      
      <div className="safari-content">
        <div className="webpage-mockup">
          <div className="webpage-header">
            <h1>Welcome to Safari</h1>
            <p>This is a mockup of a web browser</p>
          </div>
          
          <div className="webpage-body">
            <div className="webpage-section">
              <h2>Features</h2>
              <ul>
                <li>Fast and secure browsing</li>
                <li>Privacy protection</li>
                <li>Seamless sync across devices</li>
                <li>Intelligent tracking prevention</li>
              </ul>
            </div>
            
            <div className="webpage-section">
              <h2>Latest News</h2>
              <div className="news-item">
                <h3>New Safari Update Available</h3>
                <p>Enhanced performance and security features</p>
              </div>
              <div className="news-item">
                <h3>Privacy Report</h3>
                <p>See how Safari protects your privacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SafariApp