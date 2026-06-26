@echo off
setlocal

set "SOURCE=draft_icon_v1.svg"

for %%S in (16 32 48 64 128) do (
    echo Generating icon-%%S.png...

    magick "%SOURCE%" ^
        -resize %%Sx%%S ^
        -gravity center ^
        -background white ^
        -extent %%Sx%%S ^
        "icon-%%S.png"

    if errorlevel 1 (
        echo Failed to generate icon-%%S.png.
        pause
        exit /b 1
    )
)

echo.
echo Checking dimensions...
magick identify icon-16.png icon-32.png icon-48.png icon-64.png icon-128.png

echo.
echo Done.
pause
