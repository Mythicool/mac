import { Mail, Linkedin, Award, MapPin } from 'lucide-react'
import './TeamApp.css'

const TeamApp = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Technology Officer',
      bio: 'With 15+ years in IT leadership, Sarah guides our technical strategy and ensures we stay ahead of emerging threats.',
      certifications: ['CISSP', 'CISM', 'PMP'],
      email: 'sarah@soonertech.com',
      linkedin: 'sarah-johnson-cto',
      image: '👩‍💼'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Senior Security Engineer',
      bio: 'Mike specializes in cybersecurity architecture and has protected Oklahoma businesses from over 10,000 cyber threats.',
      certifications: ['CISSP', 'CEH', 'GCIH'],
      email: 'mike@soonertech.com',
      linkedin: 'mike-rodriguez-security',
      image: '👨‍💻'
    },
    {
      name: 'Jennifer Chen',
      role: 'Cloud Solutions Architect',
      bio: 'Jennifer leads our cloud transformation initiatives, helping businesses migrate to secure, scalable cloud platforms.',
      certifications: ['AWS Solutions Architect', 'Azure Expert', 'Google Cloud Professional'],
      email: 'jennifer@soonertech.com',
      linkedin: 'jennifer-chen-cloud',
      image: '👩‍💻'
    },
    {
      name: 'David Thompson',
      role: 'Network Infrastructure Manager',
      bio: 'David designs and maintains robust network infrastructures that keep Oklahoma businesses connected and secure.',
      certifications: ['CCNP', 'CCIE', 'CompTIA Network+'],
      email: 'david@soonertech.com',
      linkedin: 'david-thompson-network',
      image: '👨‍🔧'
    },
    {
      name: 'Lisa Williams',
      role: 'Client Success Manager',
      bio: 'Lisa ensures our clients get maximum value from their IT investments and maintains our 98% client satisfaction rate.',
      certifications: ['ITIL v4', 'PMP', 'CSM'],
      email: 'lisa@soonertech.com',
      linkedin: 'lisa-williams-success',
      image: '👩‍💼'
    },
    {
      name: 'Robert Martinez',
      role: 'Help Desk Supervisor',
      bio: 'Robert leads our 24/7 support team, ensuring rapid response times and first-call resolution for our clients.',
      certifications: ['CompTIA A+', 'HDI Support Center Manager', 'ITIL Foundation'],
      email: 'robert@soonertech.com',
      linkedin: 'robert-martinez-support',
      image: '👨‍💼'
    }
  ]

  const companyStats = [
    { label: 'Years of Combined Experience', value: '75+' },
    { label: 'Industry Certifications', value: '40+' },
    { label: 'Client Satisfaction Rate', value: '98%' },
    { label: 'Team Members', value: '12' }
  ]

  return (
    <div className="team-app">
      <div className="team-header">
        <h1>Meet Our Team</h1>
        <p>Oklahoma's most experienced IT professionals, dedicated to your success</p>
      </div>

      <div className="team-stats">
        <div className="stats-container">
          {companyStats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="member-photo">
              <span className="member-avatar">{member.image}</span>
            </div>
            
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
              
              <div className="member-certifications">
                <div className="cert-label">
                  <Award size={16} />
                  <span>Certifications:</span>
                </div>
                <div className="cert-list">
                  {member.certifications.map((cert, i) => (
                    <span key={i} className="cert-badge">{cert}</span>
                  ))}
                </div>
              </div>
              
              <div className="member-contact">
                <a href={`mailto:${member.email}`} className="contact-link">
                  <Mail size={16} />
                </a>
                <a href={`https://linkedin.com/in/${member.linkedin}`} className="contact-link">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="team-culture">
        <h2>Our Culture & Values</h2>
        <div className="culture-grid">
          <div className="culture-item">
            <h3>Oklahoma First</h3>
            <p>We're proud to be based in Oklahoma, serving our local business community with personalized, hometown service.</p>
          </div>
          <div className="culture-item">
            <h3>Continuous Learning</h3>
            <p>Technology evolves rapidly. Our team maintains cutting-edge certifications and stays current with industry trends.</p>
          </div>
          <div className="culture-item">
            <h3>Client Partnership</h3>
            <p>We don't just provide services – we become your trusted technology partner, invested in your long-term success.</p>
          </div>
          <div className="culture-item">
            <h3>Proactive Approach</h3>
            <p>We prevent problems before they occur, keeping your business running smoothly with minimal downtime.</p>
          </div>
        </div>
      </div>

      <div className="team-location">
        <div className="location-info">
          <MapPin size={24} />
          <div>
            <h3>Visit Our Tulsa Office</h3>
            <p>123 S Main Street, Tulsa, OK 74103</p>
            <p>We're located in the heart of downtown Tulsa, serving businesses across Oklahoma.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamApp