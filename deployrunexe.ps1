param(
  [switch]$BuildOnly
)

$ErrorActionPreference = "Stop"

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Missing required command: $Name"
  }
}

Write-Host ""
Write-Host "=== GitHub Portfolio V2 local runner ===" -ForegroundColor Cyan

Require-Command "node"
Require-Command "corepack"

$nodeVersion = (node -v).Trim()
Write-Host "Node detected: $nodeVersion"

Write-Host "Enabling Corepack (pnpm)..."
corepack enable | Out-Null

Write-Host "Installing dependencies (Windows-safe mode)..."
corepack pnpm install --config.minimumReleaseAge=0 --ignore-scripts

if ($BuildOnly) {
  Write-Host "Running production build for portfolio..."
  $env:BASE_PATH = "/"
  corepack pnpm --filter @workspace/portfolio build
  Write-Host "Build complete at artifacts/portfolio/dist/public" -ForegroundColor Green
  exit 0
}

Write-Host "Starting development server..."
Write-Host "Open: http://localhost:3000/" -ForegroundColor Yellow
corepack pnpm --filter @workspace/portfolio dev
