'use strict';

const child = require('child_process');
const path = require('path');
const cli = require('heroku-cli-util');
const exec = require('heroku-exec-util');
const https = require('https')
const http = require('http')
const fs = require('fs')
const co = require('co');

module.exports = function(topic, command) {
  return {
    topic: topic,
    command: command,
    description: 'Launch a SOCKS proxy into a dyno',
    help: `Example: 

    $ heroku ${topic}:${command}`,
    args: [],
    flags: [{ name: 'dyno', char: 'd', hasValue: true, description: 'specify the dyno to connect to' }],
    needsApp: true,
    needsAuth: true,
    run: cli.command(co.wrap(run))
  }
};

function * run(context, heroku) {
  yield exec.initFeature(context, heroku, function *(configVars) {
    yield exec.createSocksProxy(context, heroku, configVars)
  });
  return new Promise(resolve => {})
}
