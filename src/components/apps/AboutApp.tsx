import { Monitor, Cpu, HardDrive, Wifi } from 'lucide-react'
import './AboutApp.css'

const AboutApp = () => {
  return (
    <div className="about-app">
      <div className="about-header">
        <div className="macos-logo">
          <div className="logo-circle"></div>
        </div>
        <h1>macOS Sonoma</h1>
        <p>Version 14.0 (23A344)</p>
      </div>

      <div className="system-info">
        <div className="info-section">
          <h2>SoonerTech Solutions</h2>
          <p>Oklahoma's Premier Managed Service Provider</p>
        </div>

        <div className="specs-grid">
          <div className="spec-item">
            <Monitor size={24} />
            <div className="spec-details">
              <h3>Display</h3>
              <p>27-inch Retina 5K Display</p>
              <p>5120 × 2880 resolution</p>
            </div>
          </div>

          <div className="spec-item">
            <Cpu size={24} />
            <div className="spec-details">
              <h3>Processor</h3>
              <p>Apple M2 Pro</p>
              <p>12-core CPU, 19-core GPU</p>
            </div>
          </div>

          <div className="spec-item">
            <HardDrive size={24} />
            <div className="spec-details">
              <h3>Memory</h3>
              <p>32 GB Unified Memory</p>
              <p>1 TB SSD Storage</p>
            </div>
          </div>

          <div className="spec-item">
            <Wifi size={24} />
            <div className="spec-details">
              <h3>Connectivity</h3>
              <p>Wi-Fi 6E (802.11ax)</p>
              <p>Bluetooth 5.3</p>
            </div>
          </div>
        </div>

        <div className="company-info">
          <h2>About SoonerTech Solutions</h2>
          <div className="company-details">
            <div className="detail-row">
              <span className="label">Founded:</span>
              <span className="value">2015</span>
            </div>
            <div className="detail-row">
              <span className="label">Location:</span>
              <span className="value">Tulsa, Oklahoma</span>
            </div>
            <div className="detail-row">
              <span className="label">Clients Served:</span>
              <span className="value">500+ Oklahoma Businesses</span>
            </div>
            <div className="detail-row">
              <span className="label">Uptime Guarantee:</span>
              <span className="value">99.9%</span>
            </div>
            <div className="detail-row">
              <span className="label">Support:</span>
              <span className="value">24/7 Monitoring & Response</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-primary">System Report...</button>
          <button className="btn-secondary">Software Update...</button>
        </div>
      </div>
    </div>
  )
}

export default AboutApp