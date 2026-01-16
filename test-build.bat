@echo off
echo ========================================
echo Testing GlassLux Salon Build
echo ========================================
echo.

echo [1/4] Cleaning previous builds...
cd client
if exist dist rmdir /s /q dist
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo Done!
echo.

echo [2/4] Installing dependencies...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Done!
echo.

echo [3/4] Building client...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo Done!
echo.

echo [4/4] Checking build output...
if exist dist (
    echo SUCCESS: Build completed!
    echo Build location: client\dist
    dir dist
) else (
    echo ERROR: dist folder not created
    pause
    exit /b 1
)
echo.

echo ========================================
echo Build test completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Test locally: cd server ^&^& npm run dev
echo 2. Or deploy with Docker: docker compose up --build
echo.
pause
