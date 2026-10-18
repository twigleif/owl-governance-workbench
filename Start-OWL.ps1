param([int]$Port=4318)
$ErrorActionPreference='Stop'
$taskRoot=$PSScriptRoot
$taskNode=Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
if(-not(Test-Path -LiteralPath $taskNode)){ $taskNode=(Get-Command node -ErrorAction Stop).Source }
$env:OWL_PORT=[string]$Port
& $taskNode (Join-Path $taskRoot 'app\server.cjs') --docent-demo
