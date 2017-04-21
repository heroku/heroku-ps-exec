'use strict';

const child = require('child_process');
const path = require('path');
const cli = require('heroku-cli-util');
const exec = require('heroku-exec-util');
const https = require('https')
const http = require('http')
const fs = require('fs');
const co = require('co');
const url = require('url');

module.exports = function(topic, command) {
  return {
    topic: topic,
    command: command,
    description: 'Check the status of your heroku-exec add-on',
    help: `Usage: heroku ${topic}:${command}`,
    args: [],
    needsApp: true,
    needsAuth: true,
    run: cli.command(co.wrap(run))
  }
};

function * run(context, heroku) {
  yield exec.initAddon(context, heroku, function *(configVars) {
    yield exec.checkStatus(context, heroku, configVars);
  });
}
