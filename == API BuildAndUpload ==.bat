echo off
start cmd.exe @cmd /k "call Scripts/BackendBuildAPIRelease.bat"
rem start cmd.exe @cmd /k "call Scripts/FrontendNgBuild.bat"