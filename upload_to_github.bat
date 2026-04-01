@echo off
echo ==========================================
echo Bat dau tien trinh EP (FORCE) tai code...
echo ==========================================

git init >nul 2>&1
git add . >nul 2>&1
git commit -m "Auto upload to GitHub" >nul 2>&1
git branch -M main >nul 2>&1
git remote add origin https://github.com/betacode1101/BetaTesuri.git >nul 2>&1
git remote set-url origin https://github.com/betacode1101/BetaTesuri.git >nul 2>&1

echo ==========================================
echo Dang day code len repo BetaTesuri...
git push -u origin main --force
echo ==========================================
echo Hoan thanh! Ban hay thu Kiem tra lai tren GitHub nhe!
pause
