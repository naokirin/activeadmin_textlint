const { environment } = require('@rails/webpacker')

environment.config.merge({
  target: 'node'
});

module.exports = environment
