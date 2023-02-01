#!/usr/bin/sh

compile() {
  echo "Compiling $1"

  tsc -p tsconfig.build.$1.json && npx tsc-alias -p tsconfig.build.$1.json

  echo "Done"
}

emit_declarations() {
  echo "Emitting declarations..."

  tsc -p tsconfig.build.declarations.json

  echo "Done"
}

prepare() {
  echo "Cleaning up the previous lib folder..."

  rm -rf lib types

  echo "Done"
}

prepare

emit_declarations

compile cjs
compile esm
