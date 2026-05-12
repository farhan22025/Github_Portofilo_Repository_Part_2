@echo off
setlocal
powershell -ExecutionPolicy Bypass -File "%~dp0deployrunexe.ps1"
endlocal
