# Pterowraptyl

A TypeScript wrapper for the Pterodactyl API, providing a simple and type-safe interface for interacting with Pterodactyl servers.

## ⚠️ Development Status

- ✅ **Application API** - Fully implemented and ready for production use
- ⚠️ **Client API** - Limited implementation (only a few methods available - this part is currently discontinued/on hold)

## Features

- 🔒 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🚀 **Easy to use** - Simple and intuitive API design
- 📦 **Modular** - Organized into logical modules for different API endpoints
- ⚡ **Rate limiting** - Built-in rate limit handling
- 🛡️ **Error handling** - Comprehensive error handling with custom error types
- 📚 **Well documented** - Complete API documentation

## Installation

```bash
npm i pterowraptyl
```

## API Modules

### ✅ Application API Modules (Fully Implemented)
- **🖥️ Servers** - Complete server management
- **👥 Users** - User management
- **🏗️ Nodes** - Node management
- **🥚 Eggs** - Egg management
- **🏠 Nests** - Nest management
- **📍 Locations** - Location management
- **🏷️ Allocations** - Allocation management

### ⚠️ Client API Modules (Limited Implementation)
- **🌐 Client Servers** - Only basic methods available
- **👤 Account** - Minimal implementation

> **Note**: The Client API implementation is incomplete and currently discontinued. We recommend using the Application API for full functionality.

## TypeScript Support

This package is written in TypeScript and includes complete type definitions. No additional `@types` packages are needed.

## Documentation

Complete API documentation is automatically generated from the source code. 

You can find it here:
- 🌎 **Docs**: [Documentation](https://docs.glydebyte.online)

## Support

- 📧 **Email**: jakub30cz@argonix.eu
- 🐛 **Issues**: [GitHub Issues](https://github.com/GlydeByte/ptero-wrapper/issues)

## Development

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/GlydeByte/ptero-wrapper.git
cd ptero-wrapper

# Install dependencies
npm install

# Build the project
npm run build

# Run dev mode
npm run dev
```

### Building

The project supports multiple output formats:

- **CommonJS** - `npm run build:cjs`
- **ES Modules** - `npm run build:esm`
- **Both** - `npm run build`

### Project Structure

```
src/
├── core/           # Core client functionality
├── modules/        # API endpoint modules
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Main entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Pterodactyl Panel](https://pterodactyl.io/) - The game server management panel this wrapper interfaces with
- [Axios](https://axios-http.com/) - HTTP client library used for API requests

---

Made with ❤️ by Jakub30cz
