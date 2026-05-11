$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportDirectory = Join-Path $repoRoot "reports\\responsive"
$reportPath = Join-Path $reportDirectory "responsive-report-$timestamp.md"
$devOutLog = Join-Path $repoRoot ".codex-responsive-dev.out.log"
$devErrLog = Join-Path $repoRoot ".codex-responsive-dev.err.log"

if (-not (Test-Path $reportDirectory)) {
  New-Item -ItemType Directory -Path $reportDirectory | Out-Null
}

function Invoke-Step {
  param(
    [string]$Title,
    [string]$Command
  )

  Write-Host "Running: $Title"
  $output = & powershell -NoProfile -Command $Command 2>&1
  $exitCode = $LASTEXITCODE

  [pscustomobject]@{
    Title = $Title
    Command = $Command
    ExitCode = $exitCode
    Output = ($output | Out-String).Trim()
    Status = if ($exitCode -eq 0) { "Pass" } else { "Fail" }
  }
}

$results = @()
$results += Invoke-Step -Title "Lint" -Command "npm run lint"
$results += Invoke-Step -Title "Build" -Command "npm run build"

$existingDev = Get-CimInstance Win32_Process | Where-Object {
  $_.CommandLine -like "*next dev --port 3001*"
}

if (-not $existingDev) {
  Write-Host "Starting dev server on port 3001"
  Start-Process powershell -ArgumentList '-NoProfile', '-Command', "cd '$repoRoot'; npm run dev *> '$devOutLog' 2> '$devErrLog'" -WindowStyle Hidden
  Start-Sleep -Seconds 8
}

$routes = @("/", "/menu", "/gallery", "/find-us")
$routeResults = @()

foreach ($route in $routes) {
  try {
    $response = Invoke-WebRequest -Uri ("http://localhost:3001" + $route) -UseBasicParsing -TimeoutSec 20
    $routeResults += [pscustomobject]@{
      Route = $route
      StatusCode = [int]$response.StatusCode
      Status = if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) { "Pass" } else { "Fail" }
    }
  } catch {
    $routeResults += [pscustomobject]@{
      Route = $route
      StatusCode = "Error"
      Status = "Fail"
    }
  }
}

$report = @()
$report += "# USCO Responsive Automated Report"
$report += ""
$report += "- Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$report += "- Repo: `"$repoRoot`""
$report += ""
$report += "## Command Results"
$report += ""
$report += "| Check | Status | Exit Code |"
$report += "| --- | --- | --- |"
foreach ($result in $results) {
  $report += "| $($result.Title) | $($result.Status) | $($result.ExitCode) |"
}
$report += ""
$report += "## Route Results"
$report += ""
$report += "| Route | Status | HTTP |"
$report += "| --- | --- | --- |"
foreach ($routeResult in $routeResults) {
  $report += "| $($routeResult.Route) | $($routeResult.Status) | $($routeResult.StatusCode) |"
}
$report += ""
$report += "## Raw Command Output"
$report += ""
foreach ($result in $results) {
  $report += "### $($result.Title)"
  $report += ""
  $report += '```text'
  $report += $result.Output
  $report += '```'
  $report += ""
}

Set-Content -Path $reportPath -Value $report
Write-Host "Report written to $reportPath"
