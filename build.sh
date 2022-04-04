#!/bin/bash

ng build --configuration production

FILENAMEZIP="./totvsdevelopers-poui-demo.zip"
FILENAMEAPP="./totvsdevelopers-poui-demo.app"

cd dist && zip -FSr $FILENAMEZIP ./totvsdevelopers-poui-demo

mv $FILENAMEZIP $FILENAMEAPP

cd ..