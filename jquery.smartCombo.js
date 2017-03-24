/*
 * Convierte un combo multiple en botones clickeables
 * author: upadrian@gmail.com
 *
 * version 2.0.2 01/2017
 *
 * what's new:
 * -----------------------------+
 *  2.0.2   03/2017
 *      Actualización. Si el nodo <option></option> está vacío y no tiene value, no se muestra
 *      Se agrega "populateLabels" como metodo público
 *	2.0.1   01/2014
 *		Se agregó el método destroy() y algunos fixes menores.
 *	2.0		08/2013
 *		Nuevo template para el plugin, codebeauty, y algunos fixes
 *	1.5
 *	1.0.5
 *		más bugfix(no selecciona el primer elemento cuando hay un elemento con selected="selected" desde el HTML). Agregado los comentarios
 *	1.0.4.2
 *		css fixed en theme/pela
 *		br remove en el armado html
 *	1.0.4.1
 *		Para un selector que refiera a varios elementos, los tomaba como uno solo. Por ejemplo $("#select1,#select2")
 *	1.0.4
 *		Revisado el rendimiendo.
 *	1.0.3
 *		bug en chrome, no dejaba de-seleccionar una opcion, en un combo multiple y en un combo multiple con optgroup
 *	1.0.2
 *		En un select simple, al seleccionar un elemento por primera vez, estando anteriormente seleccionado
 *		el elemento superior, no actualizaba el valor seleccionado en el select. M?todo: updateSelect
 *
 * TODO:
 * -----------------------------+
 *	resolver el pie "seleccionar todos / ninguno" de los combos multiples y multiples con optgroups


 */
;(function($, window, document, undefined) {
	//'use strict';
	var pluginName = "smartCombo", defaults = {
		_class               : 'sc',
		_text_labelSimple    : 'Seleccione una opción',
		_text_labelMultiple  : 'Seleccione opciones',
		_open                : false,
		_wrapperPosition     : 'absolute',
		_closeOnClick        : true,
		_openOnMouseEnter    : true,
		_closeOnMouseLeave   : true,
		reArmOnLoad          : true,
		setAllSelectedTofalse: false,
		_initialState        : 'close',
		showSelectedLabels   : true,
		openMethod           : 'display',//display, slide, fade
		closeMethod          : 'display' //display, slide, fade
	};

	function Plugin(element, options) {
		this.element    = element; //elemento en el dom y marco
		this.$element   = $(element); //jquery object
		this.sourceNode = this.$element.get(0); //objeto DOM
		this.settings   = $.extend({}, defaults, options);
		this._defaults  = defaults;
		this._name      = pluginName;
		this.initDone   = false;
		if(!this.$element.attr("id")) { //solo en elementos con ID
			$.error('smartCombo needs ID attribute.');
		}
		if(this.$element.prop('tagName') != "SELECT") { //solo se puede inicializar un SELECT
			$.error('smartCombo only be applied to a SELECT tag (' + this.$element.prop('tagName') + ')');
		}
		this.props = {
			multiple              : this.$element.prop("multiple"),
			destID                : 'sc_' + this.$element.attr("id"),
			_ulClass              : 'sc_ul',
			_liClass              : 'sc_li',
			_labelClass           : 'sc_label',
			_footerDivClass       : 'sc_footer',
			_footerAbt            : 'sc_footerBT',
			_footerBTall          : 'sc_footerBTall',
			_footerBTnone         : 'sc_footerBTnone',
			_liClassOptGroup      : 'sc_optGroup',
			_liClassOptGroupLabel : 'sc_optGroupLabel',
			_wrapperClass         : 'sc_wrapper',
			_optionSelectedClass  : 'sc_optionSelectedClass',
			_optgroupSelectedClass: 'sc_optgroupSelectedClass',
			_enabledClass         : 'sc_enabled',
			_disabledClass        : 'sc_disabled',
			_openedClass          : 'sc_opened',
			_closedClass          : 'sc_closed',
			disabled              : false
		};
		this.init();
		this.setActions();
		this.setEvents();
		this._public.reArmFromSource();
		if(this.settings.reArmOnLoad) {
			this.populateLabels();
		}
		if(this.settings._initialState == 'open') {
			this.openWrapper();
		}
		this.$element.data("plugin_" + pluginName + "_context", this);
	}

	Plugin.prototype = {
		_public        : {
			_parent        : {},
			destroy        : function() {
				var context = context || this._parent;
				context.sc.remove();
				context.$element.toggle().removeData("plugin_smartCombo").removeData("plugin_smartCombo_context");
			},
			enable         : function(context) {
				context                = context || this._parent;
				context.props.disabled = false;
				context.sc.removeClass(context.props._disabledClass);
				context.sc.addClass(context.props._enabledClass);
			},
			disable        : function(context) {
				context                = context || this._parent;
				context.props.disabled = true;
				context.sc.removeClass(context.props._enabledClass);
				context.sc.addClass(context.props._disabledClass);
			},
			populateLabels : function(context) {
				context = context || this._parent;
				context.populateLabels();
			},
			openWrapper    : function(context) {
				context = context || this._parent;
				context.openWrapper();
			},
			closeWrapper   : function(context) {
				context = context || this._parent;
				context.closeWrapper();
			},
			reArmFromSource: function(context) {

				//rearma el sc desde el select
				context     = context || this._parent;
				var indexes = [], vi;
				for(vi = 0; vi < context.sourceNode.options.length; vi++) {
					if(context.sourceNode.options.item(vi).selected) {
						indexes.push(String(vi));
					}
				}
				//recorre todas las opciones dentro del sc y si corresponde, aplica el selected
				context.sc_options.each(
					function() {
						if(jQuery.inArray($(this).attr("index"), indexes) != -1) {
							$(this).addClass(context.props._optionSelectedClass);
						} else {
							$(this).removeClass(context.props._optionSelectedClass);
						}
					}
				);
				//Pone selected en los optgroups si todas las opciones, dentro de un optgroup están seleccionadas
				context.sc_optgroups.each(
					function() {
						var optgroupJQO = $(this), ok = true;
						//todos los <a> dentro de <li>._liClass dentro de optgroupJQO
						$("." + context.props._liClass + " a", optgroupJQO).each(
							function() {
								if(!$(this).hasClass(context.props._optionSelectedClass)) {
									ok = false;
								}
							}
						);
						if(ok) {
							optgroupJQO.data("seleccionado", true)
							           .children("a")
							           .addClass(context.props._optgroupSelectedClass);
						} else {
							optgroupJQO.data("seleccionado", false)
							           .children("a")
							           .removeClass(context.props._optgroupSelectedClass);
						}
					}
				);
				//si no es multiple o si _closeOnClick = true, entonces cierra el wrapper
				if(!context.props.multiple && context.settings._closeOnClick) {
					context.settings._open = context.closeWrapper();
				}
			}
		},
		init           : function() {
			this._public._parent = this;
			var context          = this;
			var html             = '';
			html += '<div id="' + this.props.destID + '" class="' + this.settings._class + '">';
			html += '<div class="' + this.props._labelClass + '">';
			html += '<a href="javascript:;" title="' +
			        (
				        (this.props.multiple) ? this.settings._text_labelMultiple : this.settings._text_labelSimple
			        ) +
			        '">' +
			        (
				        (this.props.multiple) ? this.settings._text_labelMultiple : this.settings._text_labelSimple) +
			        '</a>';
			html += '</div>';
			html +=
				'<div class="' +
				this.props._wrapperClass +
				' ' +
				this.props._closedClass +
				'" style="position:' +
				this.settings._wrapperPosition +
				'">';
			html += '<ul class="' + this.props._ulClass + '">';
			this.$element.children("optgroup,option").each(
				function() {
					html += context.getNode($(this));
				}
			);
			html += '</ul>';
			html += '</div>';
			html += '</div>';
			this.$element.css("display", "none").after(html);
			this.sc                  = $("#" + this.props.destID);
			this.sc_options          = $("." + this.props._liClass + " a", this.sc);
			this.sc_label            = $("." + this.props._labelClass + " a", this.sc);
			this.sc_optgroups        = $("." + this.props._liClassOptGroup + " a", this.sc);
			this.sc_optgroups_labels = $("." + this.props._liClassOptGroupLabel, this.sc);
			this.wrapper             = $("." + this.props._wrapperClass, this.sc);
			this.hasOptgrups         = $("optgroup", this.$element).length > 0;
			this.optgroups           = $("optgroup", this.$element);
			this.options             = $("option", this.$element);
		},
		getNode        : function($element) {
			var context = this;
			//obtiene el nodo optgroup o option y devuelve el html correspondiente
			var html    = '', JSOnode = $element.get(0);
			if(JSOnode.tagName == "OPTGROUP") {
				html += '<li class="' + this.props._liClassOptGroup + '">';
				if(this.props.multiple) {
					html +=
						'<a href="javascript:;" class="' +
						this.props._liClassOptGroupLabel +
						'" title="' +
						$element.attr("label") +
						'">' +
						$element.attr("label") +
						'</a>';
				} else {
					html +=
						'<span class="' + this.props._liClassOptGroupLabel + '" >' + $element.attr("label") + '</span>';
				}
				html += '<ul>';
				$element.children("option").each(
					function() {
						html += context.getNode($(this));
					}
				);
				html += '</ul>';
				html += '</li>';
			} else {
				if($element.val() == "" && $element.text() == "") {
					return ''; //si el elemento tiene value="" y no tiene texto (<option></option>) devolvemos vacío
				}
				html += '<li class="' + this.props._liClass + '" val="' + $element.val() + '">';
				html += '<a href="javascript:;" inheritedValue="' + $element.val() + '" index="' + JSOnode.index + '">';
				html += '<span>';
				html += $element.html();
				html += '</span>';
				html += '</a>';
				html += '</li>';
			}
			return html;
		},
		setActions     : function() {
			var context = this;
			this.sc_label.click(
				function() {
					if(context.settings._closeOnClick && !context.props.disabled) {
						context.settings._open = (
							(context.settings._open) ? context.closeWrapper() : context.openWrapper()
						);
					}
				}
			);
			this.sc_options.click(
				function() {
					if(!context.props.disabled) {
						context.clickOnOption($(this));
					}
				}
			);
			if(this.props.multiple) { //si es multiple y tiene optgroups, click en el optgroup selecciona (o no) todas las opciones
				this.sc_optgroups_labels.click(
					function() {
						if(!context.props.disabled) {
							context.clickOnOptGroup($(this).parent());
						}
					}
				);
			}
		},
		setEvents      : function() {
			var context = this;
			if(this.settings._openOnMouseEnter) {
				this.sc.bind(
					'mouseenter', function() {
						if(!context.props.disabled) {
							context.settings._open = context.openWrapper();
						}
					}
				);
			}
			if(this.settings._closeOnMouseLeave && this.settings._closeOnClick) {
				this.sc.bind(
					'mouseleave', function() {
						if(!context.props.disabled) {
							context.settings._open = context.closeWrapper();
						}
					}
				);
			}
		},
		populateLabels : function() {


			//obtiene los labels de los options seleccionados y los pone en sc_label
			var tmp = [];
			$("." + this.props._optionSelectedClass + " span", this.sc).each(
				function() {
					tmp.push($(this).html());
				}
			);
			this.sc.data("labels", tmp);
			var label = tmp.join(", ");
			if(label == '') {
				this.sc_label.removeClass("selected");
				label = (
					(this.props.multiple) ? this.settings._text_labelMultiple : this.settings._text_labelSimple
				);
			} else {
				this.sc_label.addClass("selected");
			}
			if(this.settings.showSelectedLabels) {
				this.sc_label.html(label);
			}
			this.sc_label.attr("title", label);
		},
		clickOnOptGroup: function(optgroup) {
			var context = this;
			if(!context.props.disabled) {
				//click en un optgroup
				if(optgroup.data("seleccionado")) {
					$("." + this.props._liClass + " a", optgroup).removeClass(this.props._optionSelectedClass);
					optgroup.data("seleccionado", false).children("a").removeClass(this.props._optgroupSelectedClass);
				} else {
					$("." + this.props._liClass + " a", optgroup).addClass(this.props._optionSelectedClass);
					optgroup.data("seleccionado", true).children("a").addClass(this.props._optgroupSelectedClass);
				}
				this.populateLabels();
				this.updateSelect();
			}
		},
		updateSelect   : function() {

			//rearma el select, desde el SC, despues de que se clickea una opcion en el sc
			var context = this, indexes = [], c;
			this.sc_options.each(
				function() {
					if($(this).hasClass(context.props._optionSelectedClass)) {
						indexes.push($(this).attr("index"));
					}
				}
			);
			//selecciona las indicadas y de-selecciona las demás
			for(c = 0; c < this.sourceNode.options.length; c++) {
				this.sourceNode.options.item(c).selected = jQuery.inArray(String(c), indexes) != -1;
			}
			//rearma el sc
			this._public.reArmFromSource();
			context.populateLabels();
			//dispara el evento change()
			this.$element.change();
		},
		openWrapper    : function() {
			var context = this;
			if(!this.props.disabled) {
				switch(this.settings.openMethod) {
					case 'fade':
						this.wrapper
						    .css(
							    {
								    "opacity": 0,
								    "display": "block"
							    }
						    )
						    .stop(true, true)
						    .fadeIn(
							    function() {
								    $(this)
									    .addClass(context.props._openedClass)
									    .removeClass(context.props._closedClass);
							    }
						    );
						break;
					case 'slide':
						this.wrapper
						    .stop(true, true)
						    .slideDown(
							    function() {
								    $(this)
									    .addClass(context.props._openedClass)
									    .removeClass(context.props._closedClass);
							    }
						    );
						break;
					default:
					case 'display':
						this.wrapper
						    .css("display", "block")
						    .addClass(context.props._openedClass)
						    .removeClass(context.props._closedClass);
						break;
				}
				return true;
			} else {
				return this.settings._open;
			}
		},
		closeWrapper   : function() {
			var context = this;
			if(!this.props.disabled) {
				switch(this.settings.closeMethod) {
					case 'fade':
						this.wrapper
						    .stop(true, true)
						    .fadeOut(
							    function() {
								    $(this)
									    .css("display", "none")
									    .addClass(context.props._closedClass)
									    .removeClass(context.props._openedClass);
							    }
						    );
						break;
					case 'slide':
						this.wrapper
						    .stop(true, true)
						    .slideUp(
							    function() {
								    $(this)
									    .addClass(context.props._closedClass)
									    .removeClass(context.props._openedClass);
							    }
						    );
						break;
					default:
					case 'display':
						this.wrapper
						    .css("display", "none")
						    .addClass(context.props._closedClass)
						    .removeClass(context.props._openedClass);
						break;
				}
				return false;
			} else {
				return this.settings._open;
			}
		},
		clickOnOption  : function(selectedOption) {
			var context = this;
			if(!context.props.disabled) {
				//click en una opcion
				if(!this.props.multiple) { //si no es múltiple, entonces remueve el selected de todas las opciones
					this.sc_options.removeClass(this.props._optionSelectedClass);
					if(this.settings._closeOnClick) { //si _closeOnClick = true, cierra wrapper
						this.settings._open = this.closeWrapper();
					}
				}
				if(selectedOption.hasClass(this.props._optionSelectedClass)) {
					selectedOption.removeClass(this.props._optionSelectedClass);
				} else {
					selectedOption.addClass(this.props._optionSelectedClass);
				}
				var optgroupJQO = selectedOption.parent().parent().parent();
				if(optgroupJQO.length > 0) {
					var ok = true;
					$("." + this.props._liClass + " a", optgroupJQO).each(
						function() {
							if(!$(this).hasClass(context.props._optionSelectedClass)) {
								ok = false;
							}
						}
					);
					if(ok) {
						optgroupJQO
							.data("seleccionado", true)
							.children("a")
							.addClass(this.props._optgroupSelectedClass);
					} else {
						optgroupJQO
							.data("seleccionado", false)
							.children("a")
							.removeClass(this.props._optgroupSelectedClass);
					}
				}
				this.populateLabels();
				this.updateSelect();
			}
		}
	};
	$.fn[pluginName] = function(method, opts) {
		return this.each(
			function() {
				//si no está instanciado
				if(!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, method));
				} else {
					//llamamos un metodo?
					if(typeof $(this).data("plugin_" + pluginName)._public[method] === 'function') {
						$(this).data("plugin_" + pluginName)._public[method](
							$(this)
								.data("plugin_" + pluginName + "_context"), opts
						);
					} else {
						$.error('Method ' + method + ' does not exist on jQuery.smartCombo');
					}
				}
			}
		);
	};
})(jQuery, window, document);