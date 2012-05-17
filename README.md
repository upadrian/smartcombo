# Smart jQuery Combo


*Convierte los combos(select) seleccionados en una estructura HTML estilizable.*


## Demo

http://kabala.com.uy/smartcombo

## Uso

    $("select").smartCombo();

### Opciones

Se muestran a continuación las opciones para instanciar el plugin, con sus valores por defecto

    $("select").smartCombo({
      _class: 'sc', //string
      _text_labelSimple: 'Seleccione una opción', //string
      _text_labelMultiple: 'Seleccione opciones', //string
      _open: false, //boolean
      _wrapperPosition: 'absolute', //string
      _closeOnClick: true, //boolean
      _openOnMouseEnter: false
      _closeOnMouseLeave: true, //boolean
      _initialState: 'close', //string
      reArmOnLoad: true, //boolean
      setAllSelectedTofalse: false //boolean
    });
      



