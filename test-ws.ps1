$uri = 'ws://192.168.13.175:3000/_next/webpack-hmr?id=test'
$ws = New-Object System.Net.WebSockets.ClientWebSocket
try {
    $t = $ws.ConnectAsync([Uri]$uri,[Threading.CancellationToken]::None)
    $t.Wait(5000)
    if ($ws.State -eq 'Open') { Write-Host 'OPEN' }
    else { Write-Host "STATE:$($ws.State)" }
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
}
# Dispose
$ws.Dispose()
