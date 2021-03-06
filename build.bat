@ECHO OFF
SETLOCAL
CD %dp0%

SET PUB=..\..\..\cawoodm.github.io\tie-flighter

SET STR=%~1
IF "%STR%"=="" (SET STR=Build %date% %time%)

:: Compile JS into one file
TYPE functions.js >> app.js
TYPE utils.js >> app.js
TYPE pixi.js >> app.js
TYPE pixi-sound.js >> app.js
TYPE ticker.js >> app.js
TYPE init.js >> app.js
TYPE events.js >> app.js
TYPE background.js >> app.js
TYPE starfield.js >> app.js
TYPE player.js >> app.js
TYPE bullet.js >> app.js
TYPE enemies.js >> app.js
TYPE game.js >> app.js

:: Prepare release
COPY /Y app.js release\
DEL /Q app.js
DEL /Q /S release\*.png
DEL /Q /S release\*.json
DEL /Q /S release\*.mp3
XCOPY resources\* release\resources /Y /S
ECHO Ready to test in release\ folder
::PAUSE

:: Commit local changes
git add .
git commit -m "%STR%"
git push origin master

:: Copy to local cawoodm github site
DEL /Q /S %PUB%\*.png
DEL /Q /S %PUB%\*.json
DEL /Q /S %PUB%\*.mp3
XCOPY .\release\*.* %PUB% /Y /S
ECHO Ready to test in %PUB% folder
::PAUSE

:: Publish to github
CD %PUB%
git add .
git commit -m "%STR%""
git push origin master
ECHO "Ready to test at http://cawoodm.github.io/tie-flighter/"
START http://cawoodm.github.io/tie-flighter/
::PAUSE

ENDLOCAL