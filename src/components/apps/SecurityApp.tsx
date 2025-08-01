import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import './SecurityApp.css'

const SecurityApp = () => {
  const securityServices = [
    {
      icon: Shield,
      title: 'Endpoint Protection',
      description: 'Advanced threat detection and response for all devices',
      features: ['Real-time malware scanning', 'Behavioral analysis', 'Zero-day protection']
    },
    {
      icon: Lock,
      title: 'Network Security',
      description: 'Comprehensive firewall and intrusion prevention',
      features: ['Next-gen firewalls', 'VPN solutions', 'Network monitoring']
    },
    {
      icon: Eye,
      title: 'Security Monitoring',
      description: '24/7 SOC monitoring and incident response',
      features: ['SIEM integration', 'Threat hunting', 'Incident response']
    }
  ]

  const threatStats = [
    { label: 'Threats Blocked This Month', value: '12,847', status: 'success' },
    { label: 'Security Incidents', value: '3', status: 'warning' },
    { label: 'System Vulnerabilities', value: '0', status: 'success' },
    { label: 'Compliance Score', value: '98%', status: 'success' }
  ]

  const recentAlerts = [
    { type: 'blocked', message: 'Malware attempt blocked on OKLA-PC-001', time: '2 minutes ago' },
    { type: 'warning', message: 'Unusual login activity detected', time: '15 minutes ago' },
    { type: 'success', message: 'Security patch deployed successfully', time: '1 hour ago' },
    { type: 'blocked', message: 'Phishing email quarantined', time: '2 hours ago' }
  ]

  return (
    <div className="security-app">
      <div className="security-header">
        <div className="header-content">
          <h1>Cybersecurity Solutions</h1>
          <p>Protecting Oklahoma businesses from evolving cyber threats</p>
        </div>
        <div className="security-status">
          <div className="status-indicator success">
            <CheckCircle size={24} />
            <span>All Systems Secure</span>
          </div>
        </div>
      </div>

      <div className="security-stats">
        <div className="stats-grid">
          {threatStats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.status}`}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="security-services">
        <h2>Our Security Services</h2>
        <div className="services-grid">
          {securityServices.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <Icon size={48} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      <div className="security-alerts">
        <h2>Recent Security Activity</h2>
        <div className="alerts-list">
          {recentAlerts.map((alert, index) => (
            <div key={index} className={`alert-item ${alert.type}`}>
              <div className="alert-icon">
                {alert.type === 'success' && <CheckCircle size={20} />}
                {alert.type === 'warning' && <AlertTriangle size={20} />}
                {alert.type === 'blocked' && <XCircle size={20} />}
              </div>
              <div className="alert-content">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-time">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="security-cta">
        <h2>Need a Security Assessment?</h2>
        <p>Get a comprehensive security audit of your Oklahoma business infrastructure.</p>
        <button className="btn-primary">Schedule Security Assessment</button>
      </div>
    </div>
  )
}

export default SecurityApp