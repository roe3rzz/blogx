# .devcontainer/services/setup/Dockerfile

FROM oven/bun:canary-slim

COPY --from=denoland/deno:bin \
     /deno \
     /usr/local/bin/

RUN <<EOF

apt-get update && apt-get install -y --no-install-recommends \
        curl ca-certificates `# use pkgx setup` \
        && apt-get clean && rm -rf /var/lib/apt/lists/*

curl https://pkgx.sh | sh # it uses sudo internally, so you need to be a root user

pkgm install \
     mkcert `# certificates`

bun -e 'console.table([
  { via: "oven/bun:canary-slim", name: "linux", cmd: "`uname -srm`", version: "6.10.14" },
  { via: "oven/bun:canary-slim", name: "bun", cmd: "`bun -v`", version: "1.2.18" },
  { via: "denoland/deno:bin", name: "deno", cmd: "`deno -v`", version: "2.3.7" },
  { via: "apt-get", name: "curl", cmd: "`curl -V`", version: "8.14.1" },
  { via: "https://pkgx.sh", name: "pkgx", cmd: "`pkgx -v`", version: "2.7.0" },
  { via: "https://pkgx.sh", name: "pkgm", cmd: "`pkgm -v`", version: "0.11.1" },
  { via: "pkgm", name: "mkcert", cmd: "`mkcert --version`", version: "1.4.4" },
])'

EOF
