@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel%==0 (
  echo Starting Journalism Academy at http://localhost:8000
  start "Journalism Academy" http://localhost:8000
  python -m http.server 8000
  pause
) else (
  echo Python was not found. Install Python 3, then double-click this file again.
  pause
)
