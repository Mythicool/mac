# SoonerTech Solutions - macOS-Style Website

A React + Vite website for SoonerTech Solutions, an Oklahoma-based Managed Service Provider (MSP), designed with an authentic macOS interface.

## About SoonerTech Solutions

SoonerTech Solutions is Oklahoma's premier Managed Service Provider, offering comprehensive IT solutions, cybersecurity services, and 24/7 support to businesses across the state. Based in Tulsa, we've been protecting and empowering Oklahoma businesses since 2015.

## Website Features

🔹 **macOS-Style Interface:**
- Authentic macOS dock with hover animations
- Top menu bar with MSP-specific navigation
- Real-time clock and system indicators
- Translucent window effects and smooth animations

🔹 **Interactive Window System:**
- Draggable and resizable windows using react-rnd
- Multiple sections can be opened simultaneously
- macOS-style window controls (close, minimize, maximize)
- Smooth transitions with Framer Motion

🔹 **MSP Website Sections:**
- **Home**: Company overview, services highlight, and Oklahoma focus
- **Security**: Cybersecurity solutions, threat monitoring, and security stats
- **Services**: Complete IT service offerings with pricing
- **Contact**: Contact information, service request form, and office details
- **Schedule**: MSP calendar with client appointments and maintenance windows
- **Our Team**: Team member profiles, certifications, and company culture
- **Blog**: IT insights, security tips, and industry news for Oklahoma businesses

🔹 **Oklahoma Business Focus:**
- Local service areas throughout Oklahoma
- Industry-specific solutions (Healthcare, Legal, Manufacturing, etc.)
- HIPAA compliance and regulatory expertise
- Emergency support for Oklahoma businesses

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- **React 18** - UI framework with TypeScript
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **react-rnd** - Draggable and resizable windows
- **Lucide React** - Professional icon library

## Project Structure

```
src/
├── components/
│   ├── MenuBar.tsx          # MSP-branded menu bar
│   ├── Dock.tsx             # Service navigation dock
│   ├── Desktop.tsx          # Desktop background
│   ├── WindowManager.tsx    # Window management system
│   └── apps/                # Website sections as apps
│       ├── HomeApp.tsx      # Company homepage
│       ├── SecurityApp.tsx  # Cybersecurity services
│       ├── ServicesApp.tsx  # IT service offerings
│       ├── ContactApp.tsx   # Contact and location info
│       ├── CalendarApp.tsx  # Service scheduling
│       ├── TeamApp.tsx      # Team and company culture
│       └── BlogApp.tsx      # IT insights and news
├── App.tsx                  # Main application
└── main.tsx                 # Entry point
```

## Usage

1. **Navigation**: Click dock icons to explore different sections
2. **Windows**: Drag windows around, resize, minimize, or close them
3. **Contact**: Use the contact form to request services
4. **Services**: Browse comprehensive IT solutions
5. **Team**: Meet the Oklahoma-based IT professionals
6. **Blog**: Read the latest IT insights and security tips

## Service Areas

SoonerTech Solutions proudly serves businesses throughout Oklahoma:
- Tulsa Metro Area
- Oklahoma City
- Norman, Edmond, Stillwater
- Broken Arrow and surrounding areas
- Remote support available statewide

## Contact Information

- **Phone**: (918) 555-TECH
- **Email**: info@soonertech.com
- **Address**: 123 S Main Street, Tulsa, OK 74103
- **Emergency**: (918) 555-HELP (24/7)

---

*This website showcases how modern web technologies can create engaging, interactive experiences while maintaining professional MSP branding and functionality.*