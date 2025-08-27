const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a file to stream archive data to
const output = fs.createWriteStream('gemini-flash-image-project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('✅ Project packaged successfully!');
  console.log(`📦 Total size: ${archive.pointer()} bytes`);
  console.log('📁 File: gemini-flash-image-project.zip');
  console.log('\n🚀 You can now download the zip file and extract it locally.');
});

// Handle warnings
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

// Handle errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Define the files to include
const filesToInclude = [
  // Root files
  { src: 'package.json', dest: 'package.json' },
  { src: 'next.config.js', dest: 'next.config.js' },
  { src: 'tailwind.config.ts', dest: 'tailwind.config.ts' },
  { src: 'tsconfig.json', dest: 'tsconfig.json' },
  { src: 'postcss.config.js', dest: 'postcss.config.js' },
  { src: 'components.json', dest: 'components.json' },
  { src: '.eslintrc.json', dest: '.eslintrc.json' },
  
  // App directory
  { src: 'app/layout.tsx', dest: 'app/layout.tsx' },
  { src: 'app/page.tsx', dest: 'app/page.tsx' },
  { src: 'app/globals.css', dest: 'app/globals.css' },
  { src: 'app/api/edit-image/route.ts', dest: 'app/api/edit-image/route.ts' },
  { src: 'app/privacy-policy/page.tsx', dest: 'app/privacy-policy/page.tsx' },
  { src: 'app/terms-of-service/page.tsx', dest: 'app/terms-of-service/page.tsx' },
  
  // Components directory
  { src: 'components/Header.tsx', dest: 'components/Header.tsx' },
  { src: 'components/HeroSection.tsx', dest: 'components/HeroSection.tsx' },
  { src: 'components/ImageEditor.tsx', dest: 'components/ImageEditor.tsx' },
  { src: 'components/ImageUpload.tsx', dest: 'components/ImageUpload.tsx' },
  { src: 'components/PromptButton.tsx', dest: 'components/PromptButton.tsx' },
  { src: 'components/FeatureSection.tsx', dest: 'components/FeatureSection.tsx' },
  { src: 'components/FeatureDetail.tsx', dest: 'components/FeatureDetail.tsx' },
  { src: 'components/Footer.tsx', dest: 'components/Footer.tsx' },
  { src: 'components/CookieConsentBanner.tsx', dest: 'components/CookieConsentBanner.tsx' },
  { src: 'components/CookieSettings.tsx', dest: 'components/CookieSettings.tsx' },
  
  // Lib directory
  { src: 'lib/utils.ts', dest: 'lib/utils.ts' }
];

console.log('📦 Packaging Gemini Flash Image project...\n');

// Add files to archive
filesToInclude.forEach(file => {
  const srcPath = path.join(process.cwd(), file.src);
  if (fs.existsSync(srcPath)) {
    archive.file(srcPath, { name: file.dest });
    console.log(`✓ Added: ${file.dest}`);
  } else {
    console.log(`⚠ Skipped (not found): ${file.dest}`);
  }
});

// Add a README file with setup instructions
const readmeContent = `# Gemini Flash Image

AI-powered image editing tool with natural language instructions.

## Setup Instructions

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Natural language image editing
- Before/after comparison views
- EU GDPR compliant cookie consent
- Responsive design with Tailwind CSS
- Next.js 13 with App Router
- TypeScript support

## Tech Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide React icons

## Project Structure

- \`app/\` - Next.js app router pages and API routes
- \`components/\` - React components
- \`lib/\` - Utility functions
- \`public/\` - Static assets

## Deployment

This project is configured for static export and can be deployed to any static hosting service.

\`\`\`bash
npm run build
\`\`\`

Built with ❤️ using Next.js and AI
`;

archive.append(readmeContent, { name: 'README.md' });
console.log('✓ Added: README.md');

// Add .gitignore file
const gitignoreContent = `# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

# OS
Thumbs.db
`;

archive.append(gitignoreContent, { name: '.gitignore' });
console.log('✓ Added: .gitignore');

// Finalize the archive
archive.finalize();