# GitHub Setup Script
# This script helps you push your code to GitHub

Write-Host "=== GitHub Setup Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
    } else {
        throw "Git not found"
    }
} catch {
    Write-Host "✗ Git is not installed or not in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Close and reopen PowerShell (or restart computer)" -ForegroundColor Yellow
    Write-Host "2. Run this script again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "If still not working, install Git from:" -ForegroundColor Yellow
    Write-Host "https://git-scm.com/download/win" -ForegroundColor White
    exit
}

Write-Host ""
Write-Host "Checking Git repository status..." -ForegroundColor Cyan

# Check if already a git repo
if (Test-Path .git) {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repository initialized" -ForegroundColor Green
}

# Check if files are staged
$status = git status --porcelain 2>&1
if ($status -and $status.Count -gt 0) {
    Write-Host ""
    Write-Host "Adding all files..." -ForegroundColor Yellow
    git add .
    Write-Host "✓ Files added" -ForegroundColor Green
} else {
    Write-Host "✓ All files already staged or committed" -ForegroundColor Green
}

# Check if there are commits
$commits = git log --oneline 2>&1
if ($LASTEXITCODE -ne 0 -or -not $commits) {
    Write-Host ""
    Write-Host "Creating initial commit..." -ForegroundColor Yellow
    git commit -m "Initial commit - Trading landing page with matrix money rain"
    Write-Host "✓ Initial commit created" -ForegroundColor Green
} else {
    Write-Host "✓ Repository has commits" -ForegroundColor Green
}

# Check for remote
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0 -and $remote) {
    Write-Host ""
    Write-Host "✓ Remote already configured: $remote" -ForegroundColor Green
    Write-Host ""
    Write-Host "To push your code, run:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "=== Next Steps ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Create a repository on GitHub:" -ForegroundColor Yellow
    Write-Host "   https://github.com/new" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Repository settings:" -ForegroundColor Yellow
    Write-Host "   - Name: nadeemmainlink (or your choice)" -ForegroundColor White
    Write-Host "   - Public or Private (your choice)" -ForegroundColor White
    Write-Host "   - DO NOT check any boxes (README, .gitignore, license)" -ForegroundColor White
    Write-Host ""
    Write-Host "3. After creating, run these commands:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/nadeemmainlink.git" -ForegroundColor White
    Write-Host "   git branch -M main" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor White
    Write-Host ""
    Write-Host "4. When prompted for password, use a Personal Access Token:" -ForegroundColor Yellow
    Write-Host "   Create token: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "   Select scope: repo" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "=== After Pushing to GitHub ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deploy to Vercel:" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Click 'Add New Project'" -ForegroundColor White
Write-Host "4. Import your repository" -ForegroundColor White
Write-Host "5. Click 'Deploy' (settings are already configured!)" -ForegroundColor White
Write-Host ""
Write-Host "Done! Your site will be live in ~30 seconds!" -ForegroundColor Green
Write-Host ""
