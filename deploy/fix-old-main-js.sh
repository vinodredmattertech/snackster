#!/bin/bash
set -e
OLD='main.188a155c.js'
NEW='main.96794cea.js'
ROOT='/home/ubuntu/snackster'

mapfile -t files < <(grep -rl "$OLD" "$ROOT" --include='*.html' || true)
echo "Found ${#files[@]} files"

for f in "${files[@]}"; do
  sed -i "s|/static/js/${OLD}|/static/js/${NEW}|g" "$f"
  echo "UPDATED:$f"
done

echo "---VERIFY remaining---"
grep -rl "$OLD" "$ROOT" --include='*.html' | wc -l
echo "DONE"
