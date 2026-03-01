# Script para atualizar o repositório no GitHub
# Uso: .\push.ps1 "mensagem do commit"

param(
    [string]$mensagem = "Atualização do projeto"
)

Set-Location $PSScriptRoot

git add .
git commit -m $mensagem
git push origin main

Write-Host "`n✅ Projeto atualizado no GitHub!" -ForegroundColor Green
