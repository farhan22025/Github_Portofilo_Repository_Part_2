@echo off
setlocal EnableExtensions

REM Always run from this script's folder.
cd /d "%~dp0"
title GitHub Portfolio V2 - local dev server

REM Prefer standard Windows Node install path.
if exist "C:\Program Files\nodejs\node.exe" (
  set "PATH=C:\Program Files\nodejs;%PATH%"
)

echo.
echo ============================================
echo   GitHub Portfolio V2 - Deploy and Run
echo ============================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js was not found in PATH.
  echo Install Node.js 20.x or 22.x from https://nodejs.org
  pause
  exit /b 1
)

where corepack >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Corepack is not available.
  echo Please install/update Node.js, then try again.
  pause
  exit /b 1
)

echo [1/4] Corepack enable...
call corepack enable >nul 2>&1

echo [2/4] Dependencies ^(pnpm install^)...
call corepack pnpm install --config.minimumReleaseAge=0 --ignore-scripts
if errorlevel 1 (
  echo [ERROR] Dependency install failed.
  pause
  exit /b 1
)

echo [3/4] Checking local URL state...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "try { Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/' -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if "%ERRORLEVEL%"=="0" (
  echo [INFO] A server is already responding on http://localhost:3000
  echo [INFO] Opening browser now...
  start "" powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "try { Start-Process 'http://localhost:3000/' } catch {}"
  exit /b 0
)

echo [4/4] Starting Portfolio dev server on port 3000...
echo        URL: http://localhost:3000/
echo        Close this window to stop the server.
echo.

REM Auto-open browser shortly after server launch.
start "" powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; try { Start-Process 'http://localhost:3000/' } catch {}"

set "PORT=3000"
call corepack pnpm --filter @workspace/portfolio dev -- --strictPort

echo.
pause
exit /b 0
