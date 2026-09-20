#!/bin/sh

set -eu

REPO_ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
VITE_BIN="$REPO_ROOT/artifacts/numatik/node_modules/.bin/vite"
INSTALL_LOCK_DIR="${NUMATIK_INSTALL_LOCK_DIR:-$REPO_ROOT/.numatik-install.lock}"

if [ -x "$VITE_BIN" ]; then
  exit 0
fi

while ! mkdir "$INSTALL_LOCK_DIR" 2>/dev/null; do
  if [ -x "$VITE_BIN" ]; then
    exit 0
  fi

  if [ -f "$INSTALL_LOCK_DIR/pid" ]; then
    owner_pid=$(cat "$INSTALL_LOCK_DIR/pid" 2>/dev/null || true)
    case "$owner_pid" in
      ''|*[!0-9]*) ;;
      *)
        if ! kill -0 "$owner_pid" 2>/dev/null; then
          rm -rf "$INSTALL_LOCK_DIR"
        fi
        ;;
    esac
  fi

  sleep 1
done

cleanup() {
  rm -rf "$INSTALL_LOCK_DIR"
}
trap cleanup EXIT INT TERM

printf '%s\n' "$$" > "$INSTALL_LOCK_DIR/pid"

if [ ! -x "$VITE_BIN" ]; then
  cd "$REPO_ROOT"
  pnpm install --frozen-lockfile --filter @workspace/numatik...
fi

if [ ! -x "$VITE_BIN" ]; then
  echo "Numatik dependencies were installed, but Vite is still unavailable at $VITE_BIN" >&2
  exit 1
fi
