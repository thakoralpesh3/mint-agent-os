#!/usr/bin/env bash
# Downloads official Linux Mint 22.3 ISO (Cinnamon or XFCE)
set -euo pipefail

EDITION="${1:-cinnamon}" # 'cinnamon' or 'xfce'
WORK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cache"
mkdir -p "$WORK_DIR"

if [ "$EDITION" = "xfce" ]; then
    ISO_NAME="linuxmint-22.1-xfce-64bit.iso"
    URL="https://mirrors.kernel.org/linuxmint/stable/22.1/$ISO_NAME"
else
    ISO_NAME="linuxmint-22.1-cinnamon-64bit.iso"
    URL="https://mirrors.kernel.org/linuxmint/stable/22.1/$ISO_NAME"
fi

TARGET="$WORK_DIR/$ISO_NAME"

echo "================================================================"
echo "🍃 Linux Mint Base ISO Downloader"
echo "Target Edition: $EDITION"
echo "Download URL:   $URL"
echo "Save Location:  $TARGET"
echo "================================================================"

if [ -f "$TARGET" ]; then
    echo "✓ Base ISO already exists at $TARGET. Skipping download."
    exit 0
fi

echo "Downloading official Linux Mint base ISO (this may take a few minutes)..."
curl -L -C - --progress-bar "$URL" -o "$TARGET"

echo "✓ Download complete: $TARGET"
