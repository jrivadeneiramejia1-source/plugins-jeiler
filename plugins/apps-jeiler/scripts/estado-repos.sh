#!/usr/bin/env bash
# Solo lee. Uso: estado-repos.sh [carpeta-con-repos]   (por defecto, la carpeta actual)
base="${1:-.}"
printf '%-34s %-30s %-8s %-8s\n' REPO RAMA CAMBIOS SIN-SUBIR
for d in "$base"/*/; do
  [ -d "$d/.git" ] || [ -f "$d/.git" ] || continue
  nombre=$(basename "$d")
  rama=$(git -C "$d" branch --show-current 2>/dev/null)
  cambios=$(git -C "$d" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  if git -C "$d" rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
    sinsubir=$(git -C "$d" rev-list --count '@{u}..HEAD' 2>/dev/null)
  else
    sinsubir='sin-remota'
  fi
  printf '%-34s %-30s %-8s %-8s\n' "$nombre" "${rama:-?}" "$cambios" "$sinsubir"
done
