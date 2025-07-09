# .devcontainer/services/shell/Dockerfile

FROM oven/bun:canary-slim

COPY --from=denoland/deno:bin \
     /deno \
     /usr/local/bin/

RUN <<EOF

apt-get update && apt-get install -y --no-install-recommends \
        procps locales moreutils` # system` \
        curl ca-certificates `# pkgx setup uses` \
        less `# dependency for git diff` \
        libonig5 `# dependency for jq` \
        && apt-get clean && rm -rf /var/lib/apt/lists/*

curl https://pkgx.sh | sh # it uses sudo internally, so you need to be a root user

useradd -m --uid 10000 -U --home /home/vscode vscode
mkdir -p /home/vscode/.config # gh uses
chown -R vscode:vscode /home/vscode

EOF

USER vscode

RUN <<EOF

pkgm install \
     git `# git client` \
     docker docker-compose buildx `# containerization` \
     mkcert `# certificates` \
     dprint `# code formatting` \
     zsh starship task fzf jq dotenvx gh`# shell` \
     xh `# http client` \
     zip unzip `# dependency for bun upgrade` \
     rsync

# dotenvx pulls in node as a implicit dependency
# we don't need it, so let's kick it out
# it won't be reinstalled and dotenvx works fine with bun
pkgm uninstall node

bun -e 'console.table([
  { via: "oven/bun:canary-slim", name: "linux", cmd: "`uname -srm`", version: "6.10.14" },
  { via: "oven/bun:canary-slim", name: "bun", cmd: "`bun -v`", version: "1.2.18" },
  { via: "denoland/deno:bin", name: "deno", cmd: "`deno -v`", version: "2.3.7" },
  { via: "apt-get", name: "procps", cmd: "`free -V`", version: "4.0.2" },
  { via: "apt-get", name: "locales", cmd: "`locale -V`", version: "2.36" },
  { via: "apt-get", name: "curl", cmd: "`curl -V`", version: "8.14.1" },
  { via: "apt-get", name: "less", cmd: "`less -V`", version: "590" },
  { via: "https://pkgx.sh", name: "pkgx", cmd: "`pkgx -v`", version: "2.7.0" },
  { via: "https://pkgx.sh", name: "pkgm", cmd: "`pkgm -v`", version: "0.11.1" },
  { via: "pkgm", name: "git", cmd: "`git -v`", version: "2.50.0" },
  { via: "pkgm", name: "docker", cmd: "`docker -v`", version: "28.3.0" },
  { via: "pkgm", name: "docker-compose", cmd: "`docker-compose -v`", version: "2.37.3" },
  { via: "pkgm", name: "buildx", cmd: "`buildx version`", version: "0.25.0" },
  { via: "pkgm", name: "mkcert", cmd: "`mkcert --version`", version: "1.4.4" },
  { via: "pkgm", name: "dprint", cmd: "`dprint -V`", version: "0.50.0" },
  { via: "pkgm", name: "zsh", cmd: "`zsh --version`", version: "5.9" },
  { via: "pkgm", name: "starship", cmd: "`starship -V`", version: "1.23.0" },
  { via: "pkgm", name: "task", cmd: "`task --version`", version: "3.44.0" },
  { via: "pkgm", name: "fzf", cmd: "`fzf --version`", version: "0.63.0" },
  { via: "pkgm", name: "jq", cmd: "`jq -V`", version: "1.8.0" },
  { via: "pkgm", name: "dotenvx", cmd: "`dotenvx -V`", version: "1.45.1" },
  { via: "pkgm", name: "gh", cmd: "`gh --version`", version: "2.74.2" },
  { via: "pkgm", name: "unzip", cmd: "`unzip -v`", version: "6.00" },
  { via: "pkgm", name: "rsync", cmd: "`rsync -V`", version: "3.4.1" },
])'

EOF

USER root

RUN <<EOF

ln -sf /home/vscode/.local/bin/zsh /bin/zsh

sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen
locale-gen

ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

EOF

USER vscode
