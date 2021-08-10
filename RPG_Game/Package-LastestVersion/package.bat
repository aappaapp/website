@echo off
for /r %%f in (*.txt) do (
set name=%%~nf
)
set /p content=<"%name%.txt"
set icopath="C:\Users\user\OneDrive\���\GitHub\adenpun.github.io\RPG_Game\favicon.ico"
title %name% Package Batch
cd %HOMEPATH%/Downloads
nativefier --name "%name%" --full-screen --icon "%icopath%" --disable-dev-tools --disable-context-menu "%content%"
