#!/bin/bash
set -e
ROOT=/home/ubuntu/snackster
NEW=$(grep -oE 'main\.[a-f0-9]+\.js' "$ROOT/index.html" | head -1)
echo "NEW:$NEW"
while IFS= read -r f; do
  sed -i "s|/static/js/main\.[a-f0-9]*\.js|/static/js/$NEW|g" "$f"
  echo "UPDATED:$f"
done < <(grep -rlE 'main\.[a-f0-9]+\.js' "$ROOT" --include='*.html' || true)
echo "---404 check---"
curl -sI --path-as-is https://www.snackster.co.in/this-page-does-not-exist-xyz | head -15
echo ---
curl -sI --path-as-is https://www.snackster.co.in/404.html | head -15
echo DONE
