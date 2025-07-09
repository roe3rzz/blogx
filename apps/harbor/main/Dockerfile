# apps/harbor/main/Dockerfile

FROM oven/bun:canary-slim

WORKDIR /workspace

COPY . .

RUN bun i
RUN bun -F harbor/main build

WORKDIR /workspace/apps/harbor/main

CMD ["bun", "dist/server.mjs"]

# docker build -f apps/harbor/main/Dockerfile -t blogx .
# docker run -it --rm -p 8080:8080 blogx
