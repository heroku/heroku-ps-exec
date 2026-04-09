'use strict';

const cli = require('@heroku/heroku-cli-util')
const exec = require('@heroku-cli/heroku-exec-util');
const co = require('co');

module.exports = function(topic, command) {
  return {
    topic: topic,
    command: command,
    description: 'Check the status of your heroku-exec add-on',
    help: `Example:

    $ heroku ps:status --app murmuring-headland-14719`,
    args: [],
    needsApp: true,
    needsAuth: true,
    run: cli.command(co.wrap(run))
  }
};

function * run(context, heroku) {
  cli.warn(`This command is now maintained as part of the Heroku CLI. Update to the latest version of the CLI or uninstall this archived plugin by running ${cli.color.cmd('heroku plugins:uninstall @heroku-cli/plugin-ps-exec')}`)
  yield exec.initFeature(context, heroku, function *(configVars) {
    yield exec.checkStatus(context, heroku, configVars);
  });
}
