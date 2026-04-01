@echo off
echo ==========================================
echo Bat dau tien trinh Build va Deploy len GitHub Pages...
echo Qua trinh nay mat khoang 1-2 phut. Vui long cho nhe!
echo ==========================================

echo [1/2] Cai dat thu vien GitHub Pages...
call npm install gh-pages --save-dev

echo [2/2] Chuan bi va Tai web len GitHub Pages...
call npm run deploy

echo ==========================================
echo HOAN THANH DEPLOY! 
echo Website da duoc gui toi may chu GitHub Pages.
echo Ban hay vao link duoi day sau vai phut nua nhe:
echo https://betacode1101.github.io/BetaTesuri/
echo ==========================================
pause
