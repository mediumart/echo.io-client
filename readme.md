# echo.io-client (WIP)

## Description
> The package is still a in development! please use with caution.

This is a socket.io server implementation for laravel-echo. It consist of 3 components:
- A [node.js server](https://github.com/mediumart/echo.io) 
- A javascript client (which is this repository) for the browser (which you should use in place of the **socket.io-client** script)
- A [php library](https://github.com/mediumart/echo.io-php) that handle integration with the laravel framework.

## Installation
Copy the file in the `dist` folder to the laravel `public/js` folder and serve with a script tag in your html, before serving laravel-echo, example:
```html
<script src="/js/echo.io.js"></script>
```
You will also need to install the others components mentionned above.