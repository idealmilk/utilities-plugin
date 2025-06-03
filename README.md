# Utilities Plugin Frontend

A WordPress plugin that provides a React-based utilities interface that works seamlessly with Elementor.

## Description

This plugin creates a shortcode `[ntherm_utilities]` that renders a React application within Elementor pages. The application is designed to display utility rates and plans, allowing users to:

- View available utility rates
- Select plans
- View plan details
- Fill out forms for selected plans

## Prerequisites

- Node.js and npm
- PHP 7.4 or higher

## Development Setup

1. Clone this repository to your local machine
2. Install dependencies:
```bash
npm install
```

### Local WordPress Integration

1. Set up a local WordPress site (e.g., using MAMP, Local, etc.)
2. Create a symbolic link from your plugin directory to WordPress plugins folder:
```bash
ln -s /path/to/your/utilities-plugin /path/to/wordpress/wp-content/plugins/utilities-plugin
```
3. Activate the plugin in WordPress admin panel
4. Navigate to Settings > Utilities Plugin and add your API key
5. Navigate to a page and drag the plugin in

### Development Workflow

1. Start the development server:
```bash
npm run start
```

The React app will automatically hydrate and render, and your local changes will be reflected immediately. If not refresh the page.

### File Structure

```
utilities-plugin/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── views/             # React views
│   ├── frontend.js        # Main React entry point
│   └── style.css          # Global styles
├── build/                  # Compiled files
├── index.php              # Plugin main file
└── api.php                # WordPress API endpoints
```

### Development Notes

- The plugin uses Tailwind CSS for styling
- React components are hydrated using the `.tailwind-update-me` class
- Data can be passed to components via pre tags within the wrapper div
- The plugin automatically handles Elementor integration

## Production Deployment

1. Build the production version:
```bash
npm run package-plugin
```

2. This will create a distributable version in your Desktop folder

3. Upload to production:
   - FTP into the WordPress site
   - Navigate to `wp-content/plugins/`
   - Replace the existing `utilities-plugin` directory with the new version from your Desktop

4. After deployment:
   - Verify the plugin is still activated
   - Confirm the API key is still set in Settings > Utilities Plugin
   - Test the functionality in Elementor 