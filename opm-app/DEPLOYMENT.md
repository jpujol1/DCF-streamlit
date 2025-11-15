# Deployment Guide

Your OPM Equity Valuation app can be deployed to any static hosting platform. Here are the easiest single-click options:

## Option 1: Vercel (Recommended - Fastest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `jpujol1/DCF-streamlit`
4. Set root directory to: `opm-app`
5. Click "Deploy"

**That's it!** Vercel will auto-detect the Vite project and deploy it.

Your app will be live at: `https://your-project.vercel.app`

## Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select: `jpujol1/DCF-streamlit`
4. Set base directory to: `opm-app`
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

Your app will be live at: `https://your-project.netlify.app`

## Option 3: GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow is already set up (`.github/workflows/deploy.yml`)
5. Push any change to trigger deployment

Your app will be live at: `https://jpujol1.github.io/DCF-streamlit/`

## Option 4: Local Preview Server

To serve the built app locally:

```bash
cd opm-app
npm run build
npm run preview
```

Then open: http://localhost:4173

## Quick Deploy Script

For instant local deployment, run:

```bash
cd opm-app
npm install
npm run build
npm run preview
```

The production build is already created in `opm-app/dist/` and ready to deploy!

## Deployment Files Included

- `vercel.json` - Vercel configuration
- `netlify.toml` - Netlify configuration
- `.github/workflows/deploy.yml` - GitHub Pages workflow

All platforms will automatically rebuild on every push to your repository.
