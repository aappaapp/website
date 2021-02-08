@echo off
for /r %%f in (*.txt) do (
set name=%%~nf
)
set /p content=<"%name%.txt"
title %name% Package Batch
cd %HOMEPATH%/Downloads
nativefier --name "%name%" --full-screen "%content%" -platform "linux"-a x64
