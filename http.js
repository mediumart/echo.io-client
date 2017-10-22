module.exports = exports = (function () {
    return {
        post: function (endpoint, form, config) {
            return new Promise(function (resolve, reject) {
                var xhr;

                if (window.XMLHttpRequest) { xhr = new XMLHttpRequest(); } 
                else { xhr = new ActiveXObject("Microsoft.XMLHTTP"); }

                xhr.open('POST', endpoint, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                for (var header in config.headers) {
                    xhr.setRequestHeader(header, config.headers[header]);
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            try {
                                resolve({
                                    success: true,
                                    data: JSON.parse(xhr.responseText)
                                });
                            } catch(e) {
                                resolve({
                                    success: true,
                                    data: xhr.responseText
                                });
                            }
                        } else {
                            resolve({
                                success: false,
                                message: 'Unauthorized access. Server responded with status: ' + xhr.status,
                                data: xhr.responseText
                            })
                        }
                    }
                }
                
                xhr.onerror = function (event) { reject(event); };

                let formParams = '';

                for (let p in form) {
                    if (formParams.length) formParams += '&';

                    formParams += encodeURI(p + '=' + form[p]);
                }

                xhr.send(formParams);
            })
        }
    }
})();
