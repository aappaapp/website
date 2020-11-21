@echo off
title Install
start "" %0\..\nodejs.msi
pause
npm install -g localhost
