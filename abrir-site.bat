@echo off
REM Abre o site VERS no navegador com um servidor local (necessario para o Three.js carregar as fotos).
cd /d "%~dp0"
start "" http://localhost:8000/index.html
python -m http.server 8000
