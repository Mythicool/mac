# macOS Web Interface

A React + Vite application that replicates the look and feel of macOS in the browser.

## Features

🔹 **Core macOS Elements:**
- Bottom Dock with bounce/scale animations on hover
- Top menu bar with Apple logo, dropdown menus, and system icons
- Real-time clock display
- Authentic macOS visual design

🔹 **Window System:**
- Draggable and resizable windows using react-rnd
- Multiple windows can be opened simultaneously
- Window controls (close, minimize, maximize)
- Smooth animations with Framer Motion
- Proper window layering and focus management

🔹 **Sample Applications:**
- **Finder**: File browser with sidebar navigation
- **Terminal**: Interactive command-line interface
- **Safari**: Web browser mockup
- **Mail**: Email client with inbox view
- **Calendar**: Monthly calendar with events
- **Photos**: Photo gallery grid
- **Music**: Music player with controls and playlist

🔹 **Visual Design:**
- San Francisco font family
- Translucent window effects with backdrop-filter
- Rounded corners and soft shadows
- macOS-style color scheme and spacing
- Desktop wallpaper background

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

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations and transitions
- **react-rnd** - Draggable and resizable components
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── MenuBar.tsx          # Top menu bar
│   ├── Dock.tsx             # Bottom dock with app icons
│   ├── Desktop.tsx          # Desktop background
│   ├── WindowManager.tsx    # Window management system
│   └── apps/                # Individual app components
│       ├── FinderApp.tsx
│       ├── TerminalApp.tsx
│       ├── SafariApp.tsx
│       ├── MailApp.tsx
│       ├── CalendarApp.tsx
│       ├── PhotosApp.tsx
│       └── MusicApp.tsx
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## Usage

1. Click on dock icons to open applications
2. Drag windows around the desktop
3. Use window controls to close or minimize windows
4. Interact with the menu bar and system icons
5. Try the terminal app with basic commands (ls, pwd, echo, clear)

The interface provides an immersive macOS-like experience entirely within the browser!