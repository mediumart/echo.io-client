/**
 * Vars.
 */
var socket = require('socket.io-client');
var http = require('./http');

var emit,
    authEndpoint;


/**
 * constructor.
 */
function Echo () {
}


/**
 * Create a socket connection to the server.
 * 
 * @param host
 * @param options 
 * 
 * @return {Socket}
 * 
 * @public
 */
Echo.prototype.io = function (host, options) {
    authEndpoint = options.authEndpoint;
    // options.path = options.path || '/echo.io';

    this.socket = socket(host, options);

    emit = this.socket.emit;
    this.socket.emit = emitMiddleware;
    
    return this.socket;
}


/**
 * Subscribe safetely.
 * 
 * @private 
 */
function subscribe() {
    var scope, request = arguments[1];

    if ((scope = (/^(private|presence)-.+/.exec(request.channel) || { 1:null })[1])) {
        return setTimeout(() => authorizeBeforeSubscribe(scope, request), 1000);
    }

    return emitProxy('subscribe', request);
};


/**
 * Authorize before sending the subscription request.
 * 
 * @param  scope  
 * @param request
 * 
 * @private
 */
function authorizeBeforeSubscribe(scope, request) {
    var form = { 
        channel_name: request.channel 
    };

    var config = {
        headers: Object.assign(
            request.auth.headers, {
                'X-Socket-ID': echo.socket.id
            }
        )
    };

    http.post(authEndpoint, form, config)
        .then(function (response) {
            var status = response.data;
            
            if (status) {
                emitProxy(
                    'subscribe', {
                        channel: request.channel, 
                        key: status
                        //status: status.channel_data ? status.channel_data : status
                    }
                );
            } else {
                // emitProxy('access-denied', echo.socket.id, request.channel);
            }
        })
        .catch(function (error) {
            console.error(error);

            emitProxy('access-error', echo.socket.id, request.channel);   
        });
}


/**
 * Hook into the emit function to handle authorization.
 * 
 * @param  event
 *
 * @private
 */
function emitMiddleware(event) {
    if (event === 'subscribe') {
        return subscribe.apply(this, arguments);
    }

    return emitProxy.apply(this, arguments);
}


/**
 * Trigger the emit function with the socket context.
 * 
 * @private
 */
function emitProxy() {
    return emit.apply(echo.socket, arguments);
}

/**
 * Echo io instance
 * 
 * @type {Echo}
 */
var echo = new Echo();

/**
 * exports module
 * 
 * @type {Echo}
 */
module.exports = exports = echo;
