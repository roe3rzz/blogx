// .devcontainer/lib/cert.ts

import { template } from 'npm:radashi'

export const cert = {
  dir: 'certs/',
  domain: 'localhost',
  path: (suffix: 'bundle' | 'cert' | 'key', opts?: { withDir: true }) => {
    return template('{{dir}}{{domain}}{{suffix}}{{ext}}', {
      dir: opts?.withDir ? cert.dir : '',
      domain: cert.domain,
      ext: '.pem',
      suffix: ['bundle', 'key'].includes(suffix) ? template('-{{suffix}}', { suffix }) : ''
    })
  }
}
