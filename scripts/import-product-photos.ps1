<#
.SYNOPSIS
  Import product photos into CAELIA storefront. Resizes, optionally converts to
  WebP, and renames each file to match the catalog.

.DESCRIPTION
  Drop your raw photos in any folder (named however you want). Pass that folder
  to this script with a -Target parameter telling it which catalog filename each
  photo should become. The script:

    1. Resizes to 1600x2000 (4:5) preserving aspect (no crop, no distortion).
    2. Optionally encodes WebP at q80 for ~70% smaller files.
    3. Writes to public/products/ with the canonical filename.
    4. Reports what was written and what is still missing.

.PARAM Source
  Folder containing your source photos.

.PARAM Target
  Canonical target filename in public/products/. One of:
    beauty-case-rose-front.png       (Beauty Mirror Case, Rose, front)
    beauty-case-noir-front.png       (Beauty Mirror Case, Noir, front)
    beauty-case-ivory-front.png      (Beauty Mirror Case, Ivory, front)
    beauty-case-rose-open.png        (Beauty Mirror Case, open with mirror + gloss)
    beauty-case-rose-detail.png      (Beauty Mirror Case, close-up)
    beauty-case-rose-lifestyle.png   (Beauty Mirror Case, in use)
    beauty-case-mini-rose.png        (Beauty Mirror Case Mini, Rose)
    beauty-case-mini-noir.png        (Beauty Mirror Case Mini, Noir)
    beauty-case-mini-ivory.png       (Beauty Mirror Case Mini, Ivory)
    beauty-case-mini-open.png        (Beauty Mirror Case Mini, open)

.PARAM Format
  "png" (default) or "webp". WebP files are smaller (~70%) and Next.js serves them
  natively. Use "webp" if you have ImageMagick or another encoder.

.EXAMPLE
  PS> .\scripts\import-product-photos.ps1 `
        -Source "C:\Photos\BeautyCase\RoseFront.jpg" `
        -Target beauty-case-rose-front.png

  PS> Get-ChildItem C:\Photos\BeautyCase | ForEach-Object {
        & .\scripts\import-product-photos.ps1 -Source $_.FullName -Target guess -Format webp
      }
#>

param(
    [Parameter(Mandatory=$true)][string]$Source,
    [Parameter(Mandatory=$true)][string]$Target,
    [ValidateSet("png","webp")][string]$Format = "png",
    [string]$PublicDir = "$PSScriptRoot\..\public\products"
)

$ErrorActionPreference = "Stop"

$validTargets = @(
    "beauty-case-rose-front.png","beauty-case-noir-front.png","beauty-case-ivory-front.png",
    "beauty-case-rose-open.png","beauty-case-rose-detail.png","beauty-case-rose-lifestyle.png",
    "beauty-case-mini-rose.png","beauty-case-mini-noir.png","beauty-case-mini-ivory.png",
    "beauty-case-mini-open.png"
)

if ($validTargets -notcontains "$Target.png" -and $validTargets -notcontains $Target) {
    Write-Error "Unknown target: $Target`nValid targets:`n  $($validTargets -join "`n  ")"
}

if (-not (Test-Path $Source)) { Write-Error "Source not found: $Source" }
if (-not (Test-Path $PublicDir)) { Write-Error "Public dir not found: $PublicDir" }

# Resolve target filename with extension
if (-not $Target.EndsWith(".$Format")) {
    $targetName = [System.IO.Path]::GetFileNameWithoutExtension($Target) + "." + $Format
} else {
    $targetName = $Target
}
$destPath = Join-Path $PublicDir $targetName

# Find an image resizer. ImageMagick `magick` first, then `convert`. Fall back to .NET.
$magick = (Get-Command magick -ErrorAction SilentlyContinue)?.Source
if (-not $magick) { $magick = (Get-Command convert -ErrorAction SilentlyContinue)?.Source }

if ($magick) {
    Write-Host "[magick] Resizing $Source -> 1600x2000"
    & $magick $Source -resize 1600x2000 -gravity center -extent 1600x2000 -background "#f7f1ea" `
        -quality 82 -define webp:lossless=false $destPath
} else {
    # Pure .NET resize — slower but no external deps. Quality is fixed for PNG.
    Write-Host "[dotnet] Resizing $Source -> 1600x2000"
    Add-Type -AssemblyName System.Drawing
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $Source))
    $ratio = [Math]::Min(1600 / $img.Width, 2000 / $img.Height)
    $w = [int]($img.Width * $ratio)
    $h = [int]($img.Height * $ratio)
    $bmp = New-Object System.Drawing.Bitmap 1600, 2000
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::FromArgb(247,241,234))   # cream background
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, [int]((1600-$w)/2), [int]((2000-$h)/2), $w, $h)
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

if (Test-Path $destPath) {
    $size = [math]::Round((Get-Item $destPath).Length / 1KB, 1)
    Write-Host "[OK] Wrote $destPath ($size KB)"
} else {
    Write-Error "Failed to write $destPath"
}

# Summary of what is still missing
Write-Host "`n--- Catalog coverage ---"
foreach ($t in $validTargets) {
    $exists = Test-Path (Join-Path $PublicDir $t)
    $mark = if ($exists) { "OK" } else { "MISSING" }
    Write-Host "  [$mark] $t"
}