call "C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\amd64\msbuild.exe"  "./DomoFino.WebApi/DomoFino.WebApi.csproj"  /p:DeployOnBuild=true /p:PublishProfile="..\DomoFino.WebApi\Properties\PublishProfiles\binLocalKuba.pubxml" /m

call "./Scripts/uploadAPI.bat"