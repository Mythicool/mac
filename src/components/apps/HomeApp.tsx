import { Shield, Zap, Clock, Award, ArrowRight } from 'lucide-react'
import './HomeApp.css'

const HomeApp = () => {
  return (
    <div className="home-app">
      <div className="hero-section">
        <div className="hero-content">
          <h1>SoonerTech Solutions</h1>
          <p className="hero-subtitle">Oklahoma's Premier Managed Service Provider</p>
          <p className="hero-description">
            Protecting and empowering Oklahoma businesses with comprehensive IT solutions, 
            cybersecurity, and 24/7 support since 2015.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="oklahoma-outline">🏢</div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose SoonerTech?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Shield size={48} color="#007AFF" />
            <h3>Advanced Security</h3>
            <p>Multi-layered cybersecurity protection tailored for Oklahoma businesses</p>
          </div>
          <div className="feature-card">
            <Zap size={48} color="#007AFF" />
            <h3>Lightning Fast</h3>
            <p>Optimized networks and systems for maximum performance and uptime</p>
          </div>
          <div className="feature-card">
            <Clock size={48} color="#007AFF" />
            <h3>24/7 Support</h3>
            <p>Round-the-clock monitoring and support from our Tulsa-based team</p>
          </div>
          <div className="feature-card">
            <Award size={48} color="#007AFF" />
            <h3>Local Expertise</h3>
            <p>Deep understanding of Oklahoma business needs and regulations</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Oklahoma Businesses Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime Guarantee</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Coverage</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Secure Your Business?</h2>
        <p>Join hundreds of Oklahoma businesses that trust SoonerTech with their IT infrastructure.</p>
        <button className="btn-primary">
          Schedule Free Consultation <ArrowRight size={16} />
        </button>
      </div>

      <div className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"SoonerTech transformed our IT infrastructure. Their proactive approach prevented countless issues."</p>
            <div className="testimonial-author">- Sarah Johnson, CEO of TulsaCorp</div>
          </div>
          <div className="testimonial-card">
            <p>"Outstanding cybersecurity solutions. We sleep better knowing our data is protected."</p>
            <div className="testimonial-author">- Mike Davis, CFO of OKC Industries</div>
          </div>
          <div className="testimonial-card">
            <p>"24/7 support that actually works. Response times are incredible."</p>
            <div className="testimonial-author">- Lisa Chen, IT Director at Norman Tech</div>
          </div>
        </div>
      </div>

      <div className="services-preview">
        <h2>Our Core Services</h2>
        <div className="services-list">
          <div className="service-item">
            <h3>Managed IT Services</h3>
            <p>Complete IT infrastructure management and monitoring</p>
          </div>
          <div className="service-item">
            <h3>Cybersecurity Solutions</h3>
            <p>Advanced threat protection and compliance management</p>
          </div>
          <div className="service-item">
            <h3>Cloud Migration</h3>
            <p>Seamless transition to cloud-based solutions</p>
          </div>
          <div className="service-item">
            <h3>Backup & Recovery</h3>
            <p>Comprehensive data protection and disaster recovery</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeApp