#!/usr/bin/env node
const https = require('https')
const fs = require('fs')
const companion = require('../companion')
// @ts-ignore
const { version } = require('../../package.json')
const standalone = require('.')

const port = process.env.COMPANION_PORT || 3020

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost-cert.pem'),
}

const { app } = standalone({
  server: {
    protocol: 'https',
  },
})

const httpsServer = https.createServer(httpsOptions, app)

companion.socket(httpsServer.listen(port))

console.log(`Welcome to Companion! v${version}`)
console.log(`Listening on http://0.0.0.0:${port}`)
