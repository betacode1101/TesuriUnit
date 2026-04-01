@echo off
echo ==================================== > git_log.txt
echo Kiem tra tien trinh Git... >> git_log.txt
echo ==================================== >> git_log.txt

echo 1. Init >> git_log.txt
git init >> git_log.txt 2>&1

echo 2. Remove cached node_modules >> git_log.txt
git rm -r --cached node_modules >> git_log.txt 2>&1

echo 3. Add files >> git_log.txt
git add . >> git_log.txt 2>&1

echo 4. Commit >> git_log.txt
git commit -m "Auto upload to GitHub" >> git_log.txt 2>&1

echo 5. Branch >> git_log.txt
git branch -M main >> git_log.txt 2>&1

echo 6. Config Remote >> git_log.txt
git remote add origin https://github.com/betacode1101/TesuriUnit.git >> git_log.txt 2>&1
git remote set-url origin https://github.com/betacode1101/TesuriUnit.git >> git_log.txt 2>&1

echo 7. Push to GitHub >> git_log.txt
git push -u origin main >> git_log.txt 2>&1

echo Hoan thanh! Hay quay lai chat voi AI.
pause
