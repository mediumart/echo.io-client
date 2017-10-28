/**
 * echo.
 */
var echo = require('./client');

/**
 * io.
 * 
 * @param host     
 * @param options 
 *
 * @return {Socket}
 * 
 * @api public     
 */
module.exports = function (host, options) {
    return echo.io(host, options);
}