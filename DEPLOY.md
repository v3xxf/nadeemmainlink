# Deploy to GitHub & Vercel - Quick Guide

## Step 1: Install Git (if not already installed)

1. Download Git: https://git-scm.com/download/win
2. Install it (use default settings)
3. **Close and reopen PowerShell** after installation

## Step 2: Initialize Git and Push to GitHub

### Option A: Using PowerShell Script (Easiest)

1. Open PowerShell in this folder
2. Run:
```powershell
.\setup-github.ps1
```

### Option B: Manual Steps

1. **Initialize Git:**
```powershell
git init
git add .
git commit -m "Initial commit - Trading landing page"
```

2. **Configure Git (first time only):**
```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

3. **Create repository on GitHub:**
   - Go to: https://github.com/new
   - Repository name: `nadeemmainlink` (or your preferred name)
   - Choose Public or Private
   - **DO NOT** check any boxes (README, .gitignore, license)
   - Click "Create repository"

4. **Connect and push:**
```powershell
git remote add origin https://github.com/YOUR_USERNAME/nadeemmainlink.git
git branch -M main
git push -u origin main
```

**Note:** When prompted for password, use a **Personal Access Token** (not your GitHub password)
- Create token: https://github.com/settings/tokens
- Select scope: `repo`
- Copy and use as password

## Step 3: Deploy to Vercel

### Option A: Via Vercel Website (Easiest)

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository (`nadeemmainlink`)
5. Vercel will auto-detect settings:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`
6. Click "Deploy"
7. Your site will be live in ~30 seconds!

### Option B: Via Vercel CLI

1. Install Vercel CLI:
```powershell
npm install -g vercel
```

2. Deploy:
```powershell
vercel
```

3. Follow the prompts:
   - Link to existing project? No
   - Project name: nadeemmainlink
   - Directory: ./
   - Override settings? No

## Your Site Will Be Live At:
- Vercel will give you a URL like: `https://nadeemmainlink.vercel.app`
- You can add a custom domain later in Vercel settings

## Files Already Configured:
✅ `vercel.json` - Already set up for static site
✅ `.gitignore` - Already configured
✅ All project files ready

## Need Help?
- GitHub: https://docs.github.com
- Vercel: https://vercel.com/docs


