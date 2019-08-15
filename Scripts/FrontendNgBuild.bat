cd "./DomoFino.FrontAngular"
call ng build --base-href=/ --prod --optimization  --progress   --verbose --source-map=false --service-worker
call "../Scripts/uploadFrontend.bat"