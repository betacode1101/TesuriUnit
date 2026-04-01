@echo off
echo Dang don dep cac file rac (node_modules)...
git rm -r --cached node_modules >nul 2>&1
echo.

echo Dang them file (bo qua file rac)...
git add .
echo.

echo Dang tao commit...
git commit -m "Auto upload to GitHub"
echo.

echo Dang tao nhanh main...
git branch -M main
echo.

echo Dang lien ket voi kho chua: https://github.com/betacode1101/TesuriUnit.git...
git remote add origin https://github.com/betacode1101/TesuriUnit.git >nul 2>&1
git remote set-url origin https://github.com/betacode1101/TesuriUnit.git >nul 2>&1
echo.

echo Dang day code len GitHub...
git push -u origin main
echo.

echo ==============================================
echo Hoan thanh viec day code len GitHub! 
echo ==============================================
pause
