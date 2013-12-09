@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\jpegtran-bin\bin\jpegtran.js" %*
) ELSE (
  node  "%~dp0\..\jpegtran-bin\bin\jpegtran.js" %*
)