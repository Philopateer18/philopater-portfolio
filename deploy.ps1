<#
.SYNOPSIS
    Automated GitHub & GitHub.io Deployment Script
    Philopater Ashraf William - Portfolio
#>

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Philopater Ashraf Portfolio - Automated GitHub Deployer " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Ensure we are in the portfolio directory
Set-Location -Path $PSScriptRoot

# Step 1: Check Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git is not installed on this machine." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/ and try again." -ForegroundColor Yellow
    Pause
    Exit
}

# Step 2: Prompt for GitHub Username if not provided
$gitUser = (git config user.name)
Write-Host "Detected Git user: $gitUser" -ForegroundColor Gray
$username = Read-Host "Enter your exact GitHub username (e.g. philopater-ashraf)"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "[ERROR] Username cannot be empty." -ForegroundColor Red
    Pause
    Exit
}

$repoName = "$username.github.io"
Write-Host ""
Write-Host "Target Repository: $repoName" -ForegroundColor Green
Write-Host "Target Live Site:  https://$repoName" -ForegroundColor Green
Write-Host ""

# Step 3: Git Initialization & Commit
Write-Host "[1/4] Initializing local repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
}

Write-Host "[2/4] Staging files..." -ForegroundColor Cyan
git add .

Write-Host "[3/4] Committing portfolio files..." -ForegroundColor Cyan
git commit -m "Deploy Philopater Ashraf Developer Portfolio to GitHub Pages" -q 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No new changes to commit or commit created." -ForegroundColor Gray
}

git branch -M main

# Step 4: Check if GitHub CLI (gh) is available for auto-creation
$hasGh = Get-Command gh -ErrorAction SilentlyContinue
$createdWithGh = $false

if ($hasGh) {
    Write-Host "GitHub CLI detected. Attempting automatic repo creation..." -ForegroundColor Cyan
    gh repo create "$repoName" --public --source=. --remote=origin --push 2>$null
    if ($LASTEXITCODE -eq 0) {
        $createdWithGh = $true
        Write-Host "[SUCCESS] Repository created and pushed via GitHub CLI!" -ForegroundColor Green
    }
}

if (-not $createdWithGh) {
    # Set remote URL
    $remoteUrl = "https://github.com/$username/$repoName.git"
    Write-Host "[4/4] Setting remote to: $remoteUrl" -ForegroundColor Cyan
    
    git remote remove origin 2>$null
    git remote add origin $remoteUrl

    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    Write-Host "NOTE: If prompted, log in to your GitHub account in the browser or popup window." -ForegroundColor Yellow
    git push -u origin main
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " DEPLOYMENT COMMAND COMPLETED!                            " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your website will be live in 1-2 minutes at:" -ForegroundColor Yellow
Write-Host "   https://$repoName" -ForegroundColor Cyan
Write-Host ""
Write-Host "If it's your first time creating this repo, ensure GitHub Pages is enabled:" -ForegroundColor Gray
Write-Host "1. Go to: https://github.com/$username/$repoName/settings/pages" -ForegroundColor Gray
Write-Host "2. Set Source: 'Deploy from a branch' -> main -> /(root) -> Save" -ForegroundColor Gray
Write-Host ""
Pause
