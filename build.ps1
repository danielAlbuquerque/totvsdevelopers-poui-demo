ng build --configuration production

$FileZipName = ".\dist\ged-metax-v5.zip"
$FileAppName = ".\dist\ged-metax-v5.app"

$compress = @{
    LiteralPath= ".\dist\ged-metax-v5\"
    CompressionLevel = "Fastest"
    DestinationPath = $FileZipName
}

Compress-Archive -Update @compress 

Move-Item -Force -Path $FileZipName $FileAppName