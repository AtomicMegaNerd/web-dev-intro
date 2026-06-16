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

      # nixpkgs builds typescript-go without the `noembed` tag, so the TypeScript
      # lib files (lib.es5.d.ts etc.) are embedded in the binary and accessed via
      # the virtual bundled:/// URI scheme. When tsgo registers file watchers with
      # Neovim it sends bundled:///libs/**/* as a glob, which Neovim's glob parser
      # rejects because it only understands real filesystem paths. The npm package
      # (@typescript/native-preview) is built with `noembed`, so the libs live on
      # disk next to the binary and the globs are valid filesystem paths.
      #
      # This overlay matches the npm behaviour: build with `noembed` and copy the
      # lib files to $out/bin/ so tsgo can find them at runtime.
      #
      # Remove this overlay if nixpkgs starts building typescript-go with `noembed`,
      # or if Neovim's _watchfiles.lua is updated to gracefully skip unrecognised
      # URI schemes in glob patterns.
      tsgoOverlay = final: prev: {
        typescript-go = prev.typescript-go.overrideAttrs (old: {
          tags = [ "noembed" ];
          postInstall = (old.postInstall or "") + ''
            cp ${old.src}/internal/bundled/libs/*.d.ts $out/bin/
          '';
        });
      };
    in
    {
      checks = forAllSystems (
        system:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ tsgoOverlay ];
          };
        in
        {
          pre-commit-check = git-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              oxfmt = {
                enable = true;
                name = "oxfmt";
                entry = "oxfmt .";
                files = "\\.md$";
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
            pkgs = import nixpkgs {
              inherit system;
              overlays = [ tsgoOverlay ];
            };
          in
          pkgs.mkShell {
            inherit (self.checks.${system}.pre-commit-check) shellHook;
            packages = [
              pkgs.emmet-language-server
              pkgs.live-server
              pkgs.markdownlint-cli2
              pkgs.nil
              pkgs.nixfmt
              pkgs.oxfmt
              pkgs.typescript-go
              pkgs.bash-language-server
            ];
          };
      });
    };
}
