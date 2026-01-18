{
  mkShell,
  nodejs_24,
  nodePackages,
}:
let
  pnpm = nodePackages.pnpm;
in mkShell {
  nativeBuildInputs = [ nodejs_24 ];
  buildInputs = [ pnpm ];
}
