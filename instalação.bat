@echo off
title Hopeless Beta

if exist node_modules\ (
  echo Você ja tem tudo instalado
  echo Vá para pasta config para configurar sua aplicação, depois inicie o hopeless.bat em src
  pause
  exit
) else (
  call npm i >> NUL
  echo Instalado com sucesso
  echo Porfavor, reinicie a instalação
  pause
  exit
)