{
  description = "Frontend Masters Web Development Intro course";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      git-hooks,
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      checks = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          pre-commit-check = git-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              oxfmt = {
                enable = true;
                name = "oxfmt";
                entry = "oxfmt .";
                pass_filenames = false;
              };
              oxlint = {
                enable = true;
                name = "oxlint";
                entry = "oxlint .";
                pass_filenames = false;
              };
              htmlhint = {
                enable = true;
                name = "htmlhint";
                entry = "${pkgs.htmlhint}/bin/htmlhint";
                files = "\\.html$";
              };
              markdownlint = {
                enable = true;
                name = "markdownlint";
                entry = "${pkgs.markdownlint-cli2}/bin/markdownlint-cli2";
                files = "\\.md$";
              };
              nixfmt.enable = true;
              flake-checker.enable = true;
              trim-trailing-whitespace.enable = true;
              mixed-line-endings.enable = true;
              end-of-file-fixer.enable = true;
            };
          };
        }
      );

      devShells = forAllSystems (system: {
        default =
          let
            pkgs = nixpkgs.legacyPackages.${system};
          in
          pkgs.mkShell {
            inherit (self.checks.${system}.pre-commit-check) shellHook;
            packages = [
              pkgs.emmet-language-server
              pkgs.htmlhint
              pkgs.live-server
              pkgs.markdownlint-cli2
              pkgs.nil
              pkgs.nixfmt
              pkgs.oxfmt
              pkgs.oxlint
              pkgs.typescript-go
              pkgs.vscode-langservers-extracted
            ];
          };
      });
    };
}
