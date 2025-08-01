import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import './BlogApp.css'

const BlogApp = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Cybersecurity Threats Every Oklahoma Business Should Know',
      excerpt: 'Learn about the most common cyber threats targeting small and medium businesses in Oklahoma and how to protect your organization.',
      author: 'Sarah Johnson',
      date: '2024-01-25',
      category: 'Cybersecurity',
      readTime: '5 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Cloud Migration Success Story: Local Law Firm Saves 40% on IT Costs',
      excerpt: 'Discover how we helped a Tulsa law firm migrate to the cloud, improving security while reducing costs and increasing productivity.',
      author: 'Jennifer Chen',
      date: '2024-01-20',
      category: 'Cloud Solutions',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 3,
      title: 'The Complete Guide to HIPAA Compliance for Oklahoma Healthcare',
      excerpt: 'Everything healthcare providers in Oklahoma need to know about HIPAA compliance, from technical safeguards to staff training.',
      author: 'Mike Rodriguez',
      date: '2024-01-18',
      category: 'Compliance',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 4,
      title: 'Why Your Business Needs 24/7 IT Monitoring',
      excerpt: 'Learn how proactive monitoring can prevent costly downtime and keep your Oklahoma business running smoothly around the clock.',
      author: 'David Thompson',
      date: '2024-01-15',
      category: 'Managed IT',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Disaster Recovery Planning: Lessons from Recent Oklahoma Weather',
      excerpt: 'How recent severe weather events highlight the importance of comprehensive disaster recovery planning for local businesses.',
      author: 'Lisa Williams',
      date: '2024-01-12',
      category: 'Business Continuity',
      readTime: '8 min read',
      featured: false
    },
    {
      id: 6,
      title: 'Microsoft 365 vs Google Workspace: Which is Right for Your Business?',
      excerpt: 'A comprehensive comparison of the two leading productivity suites, with recommendations based on business size and industry.',
      author: 'Robert Martinez',
      date: '2024-01-10',
      category: 'Productivity',
      readTime: '9 min read',
      featured: false
    }
  ]

  const categories = ['All', 'Cybersecurity', 'Cloud Solutions', 'Compliance', 'Managed IT', 'Business Continuity', 'Productivity']
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="blog-app">
      <div className="blog-header">
        <h1>SoonerTech Blog</h1>
        <p>IT insights, tips, and news for Oklahoma businesses</p>
      </div>

      {featuredPost && (
        <div className="featured-post">
          <div className="featured-content">
            <div className="featured-badge">Featured Article</div>
            <h2>{featuredPost.title}</h2>
            <p className="featured-excerpt">{featuredPost.excerpt}</p>
            
            <div className="post-meta">
              <div className="meta-item">
                <User size={16} />
                <span>{featuredPost.author}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
              </div>
              <div className="meta-item">
                <Tag size={16} />
                <span>{featuredPost.category}</span>
              </div>
            </div>
            
            <button className="read-more-btn">
              Read Full Article <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="blog-content">
        <div className="blog-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map((category, index) => (
                <button key={index} className={`category-btn ${index === 0 ? 'active' : ''}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Recent Posts</h3>
            <div className="recent-posts">
              {regularPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="recent-post">
                  <h4>{post.title}</h4>
                  <div className="recent-meta">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Newsletter</h3>
            <p>Get the latest IT insights delivered to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="blog-posts">
          <h2>Latest Articles</h2>
          <div className="posts-grid">
            {regularPosts.map((post) => (
              <article key={post.id} className="blog-post">
                <div className="post-category">{post.category}</div>
                <h3>{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                
                <div className="post-footer">
                  <div className="post-meta">
                    <div className="meta-item">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="read-time">{post.readTime}</div>
                </div>
                
                <button className="post-read-more">
                  Read More <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogApp