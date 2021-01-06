@echo off
echo %~dp0inject.js
for /r %%f in (*.txt) do (
set name=%%~nf
)
set /p content=<"%name%.txt"
title %name% Package Batch
cd %HOMEPATH%/Downloads
nativefier --name "%name%" --full-screen --inject "%~dp0inject.js" "%content%"
