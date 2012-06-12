# Smart jQuery Combo (smartcombo)


*Convierte los combos(<select>) seleccionados en una estructura HTML de `<div>` y `<ul>` estilizable via css.*


## Demo

http://kabala.com.uy/smartcombo

## Uso

Dentro del `<head>` y después de incluír jquery, incluir la librería y el tema o css necesario:

```html
    <script type="text/javascript" src="jquery.smartCombo-min.js"></script>
    <link rel="stylesheet" href="themes/pela/theme.css" />
```

Más adelante, dentro de `$(document).ready()`

```js
    $("select").smartCombo();
```

## Opciones

Las siguientes son las opciones y sus valores por defecto:

### _class

Es el nombre de la clase css a aplicar al smartcombo en conjunto, y como prefijo a las subclases. Por defecto: 'sc' 


### _text_labelMultiple: 

El label para los combos multiples. Por defecto: 'Seleccione opciones'

### _open: 

Estado inicial del wrapper. Por defecto: false

### _wrapperPosition:

Posición (css) del wrapper. Para los combos multiples siempre es "relative". Por defecto: 'absolute'

### _closeOnClick: 
Comportamiento del wrapper al clickear una opción. Por defecto: true

### _openOnMouseEnter:

Comportamiento wrapper al hacer el hover sobre el label. Por defecto es: false

### _closeOnMouseLeave: 

Comportamiento del wrapper en el evento mouseleave del wrapper. Por defecto: true

### _initialState:
Estado inicial del wrapper. Puede ser 'open' o 'close'. Por defecto: 'close'. 

## Ejemplos:

```js
    $("select").smartCombo();
    $("select").smartCombo({
        _wrapperPosition: 'relative',
        _closeOnClick: false,
        _initialState: 'open'
    });

```
      