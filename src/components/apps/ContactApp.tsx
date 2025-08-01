import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import './ContactApp.css'

const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.')
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['(918) 555-TECH', '(918) 555-8324'],
      description: 'Call us during business hours'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@soonertech.com', 'support@soonertech.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['123 S Main Street', 'Tulsa, OK 74103'],
      description: 'Visit our downtown office'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 8AM-6PM', 'Sat: 9AM-2PM'],
      description: '24/7 emergency support available'
    }
  ]

  return (
    <div className="contact-app">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Ready to secure and optimize your Oklahoma business? Let's talk!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="contact-cards">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="contact-card">
                  <div className="contact-icon">
                    <Icon size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="contact-detail">{detail}</p>
                    ))}
                    <p className="contact-description">{info.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="emergency-contact">
            <h3>Emergency Support</h3>
            <p>For critical IT emergencies outside business hours:</p>
            <div className="emergency-number">
              <Phone size={20} />
              <span>(918) 555-HELP</span>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Interest</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
              >
                <option value="">Select a service...</option>
                <option value="managed-it">Managed IT Services</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="cloud">Cloud Solutions</option>
                <option value="consulting">IT Consulting</option>
                <option value="support">24/7 Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your IT needs, challenges, or questions..."
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              <Send size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="service-areas">
        <h2>Service Areas</h2>
        <p>We proudly serve businesses throughout Oklahoma, with a focus on:</p>
        <div className="areas-grid">
          <div className="area-item">Tulsa Metro</div>
          <div className="area-item">Oklahoma City</div>
          <div className="area-item">Norman</div>
          <div className="area-item">Broken Arrow</div>
          <div className="area-item">Edmond</div>
          <div className="area-item">Stillwater</div>
        </div>
        <p className="remote-note">Remote support available statewide</p>
      </div>
    </div>
  )
}

export default ContactApp