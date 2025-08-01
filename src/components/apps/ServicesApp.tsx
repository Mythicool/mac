import { Server, Cloud, Wrench, Headphones, Monitor, Wifi } from 'lucide-react'
import './ServicesApp.css'

const ServicesApp = () => {
  const services = [
    {
      icon: Server,
      title: 'Managed IT Services',
      description: 'Complete IT infrastructure management and support',
      features: [
        'Proactive monitoring & maintenance',
        'Help desk support',
        'Network management',
        'Server administration'
      ],
      pricing: 'Starting at $99/user/month'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Secure cloud migration and management services',
      features: [
        'Microsoft 365 deployment',
        'Cloud backup & recovery',
        'Hybrid cloud solutions',
        'Cloud security'
      ],
      pricing: 'Custom pricing available'
    },
    {
      icon: Wrench,
      title: 'IT Consulting',
      description: 'Strategic IT planning and technology roadmaps',
      features: [
        'Technology assessments',
        'Digital transformation',
        'Compliance consulting',
        'Vendor management'
      ],
      pricing: '$150/hour'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock technical support for your team',
      features: [
        'Phone & email support',
        'Remote assistance',
        'On-site visits',
        'Emergency response'
      ],
      pricing: 'Included with managed services'
    },
    {
      icon: Monitor,
      title: 'Hardware Solutions',
      description: 'Complete hardware procurement and lifecycle management',
      features: [
        'Workstation setup',
        'Server installation',
        'Network equipment',
        'Hardware warranties'
      ],
      pricing: 'Competitive pricing + support'
    },
    {
      icon: Wifi,
      title: 'Network Infrastructure',
      description: 'Design and implementation of robust network solutions',
      features: [
        'Network design & setup',
        'WiFi solutions',
        'VPN configuration',
        'Network security'
      ],
      pricing: 'Project-based pricing'
    }
  ]

  const industries = [
    { name: 'Healthcare', description: 'HIPAA-compliant IT solutions' },
    { name: 'Legal', description: 'Secure document management' },
    { name: 'Manufacturing', description: 'Industrial network solutions' },
    { name: 'Education', description: 'K-12 and higher education IT' },
    { name: 'Non-Profit', description: 'Cost-effective IT solutions' },
    { name: 'Professional Services', description: 'Scalable business IT' }
  ]

  return (
    <div className="services-app">
      <div className="services-header">
        <h1>Our IT Services</h1>
        <p>Comprehensive technology solutions for Oklahoma businesses</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div key={index} className="service-card">
              <div className="service-header">
                <div className="service-icon">
                  <Icon size={40} />
                </div>
                <div className="service-title">
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
              
              <div className="service-features">
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="service-footer">
                <div className="service-pricing">{service.pricing}</div>
                <button className="btn-outline">Learn More</button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="industries-section">
        <h2>Industries We Serve</h2>
        <p>Specialized IT solutions tailored to your industry's unique needs</p>
        
        <div className="industries-grid">
          {industries.map((industry, index) => (
            <div key={index} className="industry-card">
              <h4>{industry.name}</h4>
              <p>{industry.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="service-process">
        <h2>Our Service Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h4>Assessment</h4>
            <p>Comprehensive evaluation of your current IT infrastructure</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h4>Strategy</h4>
            <p>Custom IT roadmap aligned with your business goals</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h4>Implementation</h4>
            <p>Seamless deployment with minimal business disruption</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h4>Support</h4>
            <p>Ongoing monitoring, maintenance, and optimization</p>
          </div>
        </div>
      </div>

      <div className="services-cta">
        <h2>Ready to Transform Your IT?</h2>
        <p>Let's discuss how our services can help your Oklahoma business thrive.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Get Free Assessment</button>
          <button className="btn-secondary">View Case Studies</button>
        </div>
      </div>
    </div>
  )
}

export default ServicesApp