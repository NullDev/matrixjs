# Matrix.js

This script will turn your homepage into a Matrix with custom, ASCII-Art styled text!

### How-To:

- Include matrix.js in your HTML Code:<br>
 ```html
<script src="matrix.js"></script>
```
- Change the body style:<br>
```html
<style type="text/css">
     body{min-width:1024px;min-height:400px;width:100vw;height:100vh;margin:0;}
</style>
```
- Set the body like this:<br>
```html
<body bgcolor="#000" onload="matrix('YOUR TEXT')" onresize="init()">
```
&nbsp;&nbsp;Where <br>you</br> need to replace "YOUR TEXT" by the text you want to output<br><br>
- Finally, set the main element inside the body:<br>
```html
<canvas width="16" height="16" id="mainCanvas"></canvas>
```
 
 <b>Thats it!</b>
 
 <hr>
 
 A sample index.html is <a href="https://github.com/NLDev/matrixjs/blob/master/index.html">here</a>.
 
 <b>Note</b>: There is also a Minified version of the script! Just use `matrix.min.js`
 
 <hr>
 
 ## Live Demos:
 
 Github:<br>
 https://nldev.github.io/matrixjs/
 <br><br>
 NullDev:<br>
 https://nulldev.org/free/matrixjs/
 
