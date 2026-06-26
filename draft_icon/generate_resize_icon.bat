@echo off
setlocal

set "SOURCE=icon-512.png"

for %%S in (16 32 48 64 128) do (
    echo Generating icon-%%S.png...
    magick "%SOURCE%" -resize %%Sx%%S "icon-%%S.png"
)

echo.
echo Done.
pause
