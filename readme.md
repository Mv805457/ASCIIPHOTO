# MadAscii 🎨

> Transform images, GIFs, and live webcam feeds into stunning ASCII art in real-time

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://clever-pasca-48fe08.netlify.app/)
[![Figma](https://img.shields.io/badge/figma-showcase-purple)](https://tawny-badger-21464891.figma.site/)
MadAscii is a powerful web-based ASCII art generator that brings your images to life through the magic of text characters. Built with vanilla JavaScript and HTML5 Canvas, it offers real-time conversion with extensive customization options.

## ✨ Features

### Web Application
- **🖼️ Image to ASCII** - Convert static images into ASCII art with drag-and-drop support
- **🎞️ Animated GIF Support** - Transform GIFs into animated ASCII sequences
- **📹 Live Webcam Rendering** - Real-time ASCII art from your webcam feed
- **🎨 Colorized Output** - Preserve original colors or go monochrome
- **⚙️ Character Density Control** - Adjust detail level with customizable character sets
- **✏️ Custom Characters** - Define your own ASCII character palettes
- **💾 PNG Export** - Download your ASCII art as high-quality images
- **🖥️ Terminal Mode Export** - Generate terminal-compatible colored ASCII output
- **🌓 Theme Toggle** - Switch between dark and light themes
- **📱 Responsive Design** - Works seamlessly across devices

### CLI Version
- **⚡ Fast Conversion** - Process images directly from the command line
- **🎨 Colored Terminal Output** - View ASCII art with preserved colors in your terminal
- **🔧 Flexible Options** - Customize character sets, dimensions, and output format
- **📦 Lightweight** - Minimal dependencies for quick installation

## 🚀 Demo

**[🌐 Live Web App](https://clever-pasca-48fe08.netlify.app/)**

**[🎨 Figma Design Showcase](https://tawny-badger-21464891.figma.site/)**

## 📸 Screenshots

> Screenshots coming soon

## 🛠️ Tech Stack

### Web Application
- **JavaScript (ES6+)** - Core application logic
- **HTML5 Canvas** - Image processing and rendering
- **CSS3** - Responsive styling and animations
- **Web APIs** - MediaDevices, FileReader, Drag & Drop

### CLI Tool
- **Node.js** - Runtime environment
- **Canvas (node-canvas)** - Image processing for Node.js
- **Commander.js** - CLI argument parsing
- **Chalk** - Terminal color output

## 📦 Installation

### Web Application

1. Clone the repository:
```bash
git clone https://github.com/yourusername/madascii.git
cd madascii
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

3. Navigate to `http://localhost:8000` (or your server's URL)

### CLI Version

1. Navigate to the CLI directory:
```bash
cd madascii/cli
```

2. Install dependencies:
```bash
npm install
```

3. Link the CLI globally (optional):
```bash
npm link
```

## 💻 CLI Usage

### Basic Usage

```bash
# Convert an image to ASCII
node cli.js input.jpg

# Specify output file
node cli.js input.jpg -o output.txt

# Custom width
node cli.js input.jpg -w 100

# Use custom character set
node cli.js input.jpg -c "@%#*+=-:. "

# Colored output
node cli.js input.jpg --color
```

### CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--output <file>` | `-o` | Output file path | `stdout` |
| `--width <number>` | `-w` | Output width in characters | `80` |
| `--charset <string>` | `-c` | Character set (dense to light) | `@%#*+=-:. ` |
| `--color` | | Enable colored output | `false` |
| `--invert` | `-i` | Invert character density | `false` |

### Examples

```bash
# Create a detailed ASCII portrait
madascii portrait.jpg -w 120 -o portrait.txt

# Generate colored ASCII art for terminal
madascii landscape.png --color -w 100

# Use custom characters for artistic effect
madascii photo.jpg -c "█▓▒░ " -w 80 -o art.txt
```

## 🎯 Usage Guide

### Web Application

1. **Upload an Image**
   - Click "Upload Image" or drag and drop a file
   - Supported formats: JPG, PNG, GIF, WebP

2. **Start Webcam** (optional)
   - Click "Start Webcam" to use live camera feed
   - Allow camera permissions when prompted

3. **Customize ASCII Output**
   - Adjust character density with the slider
   - Enter custom character sets in the input field
   - Toggle between color and monochrome output

4. **Export Your Art**
   - Click "Download PNG" to save as an image
   - Use "Export Terminal" for colored terminal output

5. **Switch Themes**
   - Toggle between dark and light modes for comfortable viewing

## 🔮 Future Improvements

- [ ] Video file support for longer ASCII animations
- [ ] Real-time filters and effects (blur, sharpen, edge detection)
- [ ] ASCII art gallery for sharing creations
- [ ] Browser extension for converting images on any webpage
- [ ] Mobile app versions (iOS/Android)
- [ ] SVG export with selectable text
- [ ] Batch processing for multiple images
- [ ] AI-powered character set optimization
- [ ] Social media sharing integration
- [ ] Custom font support for different ASCII styles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic ASCII art generators
- Thanks to all contributors and users
- Built with ❤️ by [Your Name]

---

<div align="center">

**[⬆ Back to Top](#madascii-)**

Made with ☕ and JavaScript

</div>
