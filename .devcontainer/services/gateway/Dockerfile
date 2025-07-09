# .devcontainer/services/gateway/Dockerfile

FROM haproxy:bookworm

USER root

COPY --from=denoland/deno:bin \
     /deno \
     /usr/local/bin/

RUN <<EOF

apt-get update && apt-get install -y --no-install-recommends \
        socat && apt-get clean && rm -rf /var/lib/apt/lists/*

deno eval 'console.table([
  { via: "haproxy:bookworm", name: "linux", cmd: "`uname -srm`", version: "6.10.14" },
  { via: "haproxy:bookworm", name: "haproxy", cmd: "`haproxy -v`", version: "3.2.1" },
  { via: "denoland/deno:bin", name: "deno", cmd: "`deno -v`", version: "2.3.7" },
])'

install -d -m 750 -o haproxy -g haproxy /var/run /etc/haproxy

EOF

USER haproxy
