# David Heckhoff Portfolio Clone

This is a clone of the David Heckhoff portfolio website (https://david-hckh.com/).

## Structure

```
website/
├── index.html          # Main HTML file
├── css/               # Stylesheets
│   └── BoPt0IX0.css
├── js/                # JavaScript files
│   └── index-XNYmtKME.js
├── fonts/             # Web fonts
│   ├── urbanist-400.woff2
│   ├── urbanist-700.woff2
│   ├── urbanist-900.woff2
│   ├── pro-font-windows-400.woff2
│   └── pro-font-windows-700.woff2
└── images/            # Images and icons
    ├── favicon-96x96.png
    ├── favicon.ico
    ├── favicon.svg
    └── og-image.webp
```

## How to Use

### Option 1: Open Directly
Simply open `index.html` in your web browser. The website should work with all local assets.

### Option 2: Use a Local Server
For better compatibility and to avoid CORS issues:

**Using Python:**
```bash
cd website
python -m http.server 8000
# Then visit http://localhost:8000
```

**Using Node.js (http-server):**
```bash
cd website
npx http-server -p 8000
# Then visit http://localhost:8000
```

**Using PHP:**
```bash
cd website
php -S localhost:8000
# Then visit http://localhost:8000
```

## Features

This is a WebGL-powered portfolio website for David Heckhoff, a web developer specializing in:
- Interactive 3D web experiences
- Real-time applications
- WebGL development
- TypeScript & Node.js

## Technical Stack

- HTML5
- CSS3 (with custom properties and modern layout)
- JavaScript (bundled)
- WebGL for 3D graphics
- Custom fonts (Urbanist & ProFontWindows)

## Notes

- All assets are self-contained and load from relative paths
- The website is optimized for modern browsers
- Includes responsive design for mobile and desktop
- Features smooth animations and transitions
- Uses WebGL for interactive 3D elements

## License

This is a clone for educational/demonstration purposes. All rights to the original design and content belong to David Heckhoff.
