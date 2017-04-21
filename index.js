'use strict';
exports.topic = {
  name: 'ps',
  description: 'Client tools for Heroku Exec'
};

exports.commands = [
  require('./commands/ssh.js')('ps', 'exec'),
  require('./commands/socks.js')('ps', 'socks'),
  require('./commands/port.js')('ps', 'forward'),
  require('./commands/copy.js')('ps', 'copy'),

  require('./commands/ssh.js')('dyno', 'exec'),
  require('./commands/socks.js')('dyno', 'socks'),
  require('./commands/port.js')('dyno', 'forward'),
  require('./commands/copy.js')('dyno', 'copy')
];
