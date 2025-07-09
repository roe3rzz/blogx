// .devcontainer/services/gateway/entrypoint.ts

import { call } from '../../lib/cmd.ts'
import { h } from '../../lib/haproxy.ts'

const cfg = h.parse([
  h.block('global', [
    h.rule.off('daemon'), // run on the foreground
    h.rule('expose-experimental-directives'),
    h.rule('hard-stop-after', '30s'),
    h.rule('log', ['stdout', 'format', 'raw', 'local0']),
    h.rule('log', ['stdout', 'format', 'raw', 'local1', 'notice']),
    h.rule(
      'ssl-default-bind-ciphers',
      'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'
    ),
    h.rule(
      'ssl-default-bind-ciphersuites',
      'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256'
    ),
    h.rule('ssl-default-bind-options', ['no-sslv3', 'no-tlsv10', 'no-tlsv11']),
    h.rule('stats', ['socket', '/var/run/haproxy.sock', 'mode', 660, 'level', 'admin']),
    h.rule('tune.h2.initial-window-size', 65535),
    h.rule('tune.h2.max-concurrent-streams', 100),
    h.rule('tune.ssl.cachesize', 100000),
    h.rule('tune.ssl.capture-buffer-size', 0),
    h.rule('tune.ssl.default-dh-param', 2048),
    h.rule('tune.ssl.lifetime', 300)
  ]),
  h.block('defaults', [
    h.rule('log', 'global'),
    h.rule('mode', 'http'),
    h.rule('option', 'dontlognull'),
    h.rule('option', 'httplog'),
    h.rule('timeout', ['client', '10m']),
    h.rule('timeout', ['connect', '5s']),
    h.rule('timeout', ['http-keep-alive', '10m']),
    h.rule('timeout', ['http-request', '10m']),
    h.rule('timeout', ['queue', '10m']),
    h.rule('timeout', ['server', '10m'])
  ]),
  h.block('backend vite_backend', [
    h.rule('mode', 'http'),
    h.rule('server', ['vite', 'host.docker.internal:8080'])
  ]),
  h.block('frontend frontend_https', [
    h.rule('bind', ['*:443', 'ssl', 'crt', h.path('crt'), 'alpn', 'h2,http/1.1']),
    h.rule('mode', 'http'),
    h.rule('timeout', ['tunnel', '1h']), // for vite wss
    h.rule('option', 'httplog'),
    h.rule.off('http-request', [
      'return',
      'status',
      200,
      'content-type',
      '"text/plain"',
      'string',
      '"pong"',
      'if',
      '{ method GET }',
      '{ path /ping }'
    ]),
    h.rule('default_backend', 'vite_backend')
  ])
])

Deno.writeFileSync(h.path('cfg'), new TextEncoder().encode(cfg))

const haproxy = call(['haproxy', ['-f', h.dir]])

if (!haproxy.isOk()) {
  console.error('\nFailure', haproxy.error.message.trim())
}

if (haproxy.isErr()) Deno.exit(1)

// deno --allow-run --allow-read --allow-write .devcontainer/services/gateway/entrypoint.ts
