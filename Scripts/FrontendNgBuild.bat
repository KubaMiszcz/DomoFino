cd "DomoFino.FrontAngular\src\app"
rem copy api-path-remote.ts api-path.ts /v /y

REM cd "DomoFino.FrontAngular\src\app" 
call ng build --base-href=/ --prod --optimization  --progress   --verbose
REM call ng build --base-href=/DomoFino/ --optimization  --progress   --verbose

REM cd "DomoFino.FrontAngular\src\app"
rem copy api-path-local.ts api-path.ts /v /y

call "..\..\..\Scripts\uploadFrontend.bat"