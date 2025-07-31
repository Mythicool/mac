import { Folder, File, ArrowLeft, ArrowRight, Home } from 'lucide-react'
import './FinderApp.css'

const FinderApp = () => {
  const folders = [
    { name: 'Applications', type: 'folder' },
    { name: 'Desktop', type: 'folder' },
    { name: 'Documents', type: 'folder' },
    { name: 'Downloads', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Music', type: 'folder' },
    { name: 'Movies', type: 'folder' },
  ]

  const files = [
    { name: 'README.txt', type: 'file' },
    { name: 'project.zip', type: 'file' },
    { name: 'image.jpg', type: 'file' },
  ]

  return (
    <div className="finder-app">
      <div className="finder-toolbar">
        <div className="finder-nav">
          <button className="nav-btn"><ArrowLeft size={16} /></button>
          <button className="nav-btn"><ArrowRight size={16} /></button>
        </div>
        <div className="finder-path">
          <Home size={16} />
          <span>Home</span>
        </div>
      </div>
      
      <div className="finder-content">
        <div className="finder-sidebar">
          <div className="sidebar-section">
            <h4>Favorites</h4>
            <div className="sidebar-item">
              <Folder size={16} />
              <span>Applications</span>
            </div>
            <div className="sidebar-item">
              <Folder size={16} />
              <span>Desktop</span>
            </div>
            <div className="sidebar-item">
              <Folder size={16} />
              <span>Documents</span>
            </div>
            <div className="sidebar-item">
              <Folder size={16} />
              <span>Downloads</span>
            </div>
          </div>
        </div>
        
        <div className="finder-main">
          <div className="finder-grid">
            {folders.map((item) => (
              <div key={item.name} className="finder-item">
                <Folder size={48} color="#007AFF" />
                <span>{item.name}</span>
              </div>
            ))}
            {files.map((item) => (
              <div key={item.name} className="finder-item">
                <File size={48} color="#666" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinderApp