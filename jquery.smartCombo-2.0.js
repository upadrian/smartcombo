/*
* Convierte un combo multiple en botones clickeables
* author: upadrian@gmail.com
*
* version 2.0 08/2013
*	
* 	bugfix y notas de la version:
*	-----------------------------+
*		2
*			Nuevo template para el plugin, codebeauty, y algunos fixes
*		1.5
*			
*		1.0.5
*			más bugfix(no selecciona el primer elemento cuando hay un elemento con selected="selected" desde el HTML). Agregado los comentarios
*		1.0.4.2
*			css fixed en theme/pela
*			br remove en el armado html
*		1.0.4.1
*			Para un selector que refiera a varios elementos, los tomaba como uno solo. Por ejemplo $("#select1,#select2")
*			
*		1.0.4
*			Revisado el rendimiendo. Ahora se thisan las consultas al DOM. Se eliminan variables sin usar. TODO: resolver el
*			pie "seleccionar todos / ninguno" de los combos multiples y multiples con optgroups
*		1.0.3
*			bug en chrome, no dejaba de-seleccionar una opcion, en un combo multiple y en un combo multiple con optgroup
*		1.0.2
*			En un select simple, al seleccionar un elemento por primera vez, estando anteriormente seleccionado 
*			el elemento superior, no actualizaba el valor seleccionado en el select. M?todo: updateSelect
*
*
*/
;
(function($, window, document, undefined) {
	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.
	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).
	// Create the defaults once
	var pluginName = "smartCombo",
		defaults = {
			_class: 'sc',
			_text_labelSimple: 'Seleccione una opción',
			_text_labelMultiple: 'Seleccione opciones',
			_open: false,
			_wrapperPosition: 'absolute',
			_closeOnClick: true,
			_openOnMouseEnter: true,
			_closeOnMouseLeave: true,
			reArmOnLoad: true,
			setAllSelectedTofalse: false,
			_initialState: 'close',
			showSelectedLabels: true
		};
	// The actual plugin constructor

	function Plugin(element, options) {
		//elemento en el dom y marco
		this.element = element;
		//jquery object
		this.$element = $(element);
		//objeto DOM
		this.sourceNode = this.$element.get(0);
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.initDone = false;
		//solo en elementos con ID
		if(!this.$element.attr("id")) $.error('smartCombo needs ID attribute.');
		//solo se puede inicializar un SELECT
		if (!this.$element.prop('tagName') == "SELECT") $.error('smartCombo only be applied to a SELECT tag (' + this.$element.prop('tagName') + ')');
		this.props = {
			multiple: (this.$element.attr("multiple")) ? true : false,
			destID: 'sc_' + this.$element.attr("id"),
			_ulClass: this.settings._class + '_ul',
			_liClass: this.settings._class + '_li',
			_labelClass: this.settings._class + '_label',
			_footerDivClass: this.settings._class + '_footer',
			_footerAbt: this.settings._class + '_footerBT',
			_footerBTall: this.settings._class + '_footerBTall',
			_footerBTnone: this.settings._class + '_footerBTnone',
			_liClassOptGroup: this.settings._class + '_optGroup',
			_liClassOptGroupLabel: this.settings._class + '_optGroupLabel',
			_wrapperClass: this.settings._class + '_wrapper',
			_optionSelectedClass: this.settings._class + '_optionSelectedClass',
			_optgroupSelectedClass: this.settings._class + '_optgroupSelectedClass',
			_enabledClass: this.settings._class + '_enabled',
			_disabledClass: this.settings._class + '_disabled',
			disabled:false
		};
		this.init();
		this.setActions();
		this.setEvents();
		this.$element.data("plugin_" + pluginName + "_context",this);
	}
	Plugin.prototype = {
		_public:{
			_parent:{},
			enable:function(context){
				var context = context || this._parent;
				context.props.disabled = false;
				context.sc.removeClass(context.props._disabledClass);
				context.sc.addClass(context.props._enabledClass);
			},
			disable:function(context){
				var context = context || this._parent;
				context.props.disabled = true;
				context.sc.removeClass(context.props._enabledClass);
				context.sc.addClass(context.props._disabledClass);
			},
			reArmFromSource: function(context) {
				var context = context || this._parent;
				//rearma el sc desde el select
                var indexes = [];
				for (vi = 0; vi < context.sourceNode.options.length; vi++)
					if (context.sourceNode.options.item(vi).selected) 
						indexes.push(String(vi));
                //recorre todas las opciones dentro del sc y si corresponde, aplica el selected
				context.sc_options.each(function() {
					if (jQuery.inArray($(this).attr("index"), indexes) != -1) 
						$(this).addClass(context.props._optionSelectedClass);
					else
						$(this).removeClass(context.props._optionSelectedClass);
				});
                //Pone selected en los optgroups si todas las opciones, dentro de un optgroup están seleccionadas
				context.sc_optgroups.each(function() {
					var optgroupJQO = $(this)
					ok = true;
					//todos los <a> dentro de <li>._liClass dentro de optgroupJQO
					$("." + context.props._liClass + " a", optgroupJQO).each(function() {
						if (!$(this).hasClass(context.props._optionSelectedClass)) ok = false;
					})
					if (ok) 
						optgroupJQO.data("seleccionado", true).children("a").addClass(context.props._optgroupSelectedClass);
					else
						optgroupJQO.data("seleccionado", false).children("a").removeClass(context.props._optgroupSelectedClass);
				});
                //si no es multiple o si _closeOnClick = true, entonces cierra el wrapper
				if (!context.props.multiple && context.settings._closeOnClick) 
						context.settings._open = context.closeWrapper();
                //muestra los labels correctos
				context.populateLabels();

			}
		},
		init: function() {
			this._public._parent = this;
			var context = this;
			var html = '';
			html += '<div id="' + this.props.destID + '" class="' + this.settings._class + '">';
			html += '	<div class="' + this.props._labelClass + '">';
			html += '		<a href="javascript:;" title="' + ((this.props.multiple) ? this.settings._text_labelMultiple : this.settings._text_labelSimple) + '">' + ((this.props.multiple) ? this.settings._text_labelMultiple : this.settings._text_labelSimple) + '</a>';
			html += '	</div>';
			html += '	<div class="' + this.props._wrapperClass + '" style="position:' + this.settings._wrapperPosition + '">';
			html += '		<ul class="' + this.props._ulClass + '">';
			this.$element.children("optgroup,option").each(function() {
				html += context.getNode($(this));
			})
			html += '		</ul>';
			html += '	</div>';
			html += '</div>';
			this.$element.css("display", "none").after(html);
			this.sc = $("#" + this.props.destID);
			this.sc_options = $("." + this.props._liClass + " a", this.sc);
			this.sc_label = $("." + this.props._labelClass + " a", this.sc);
			this.sc_optgroups = $("." + this.props._liClassOptGroup + " a", this.sc);
			this.sc_optgroups_labels = $("." + this.props._liClassOptGroupLabel, this.sc);
			this.wrapper = $("." + this.props._wrapperClass, this.sc);
			this.hasOptgrups = ($("optgroup", this.$element).length > 0) ? true : false;
			this.optgroups = $("optgroup", this.$element);
			this.options = $("option", this.$element);
		},
		getNode: function($element) {
			var context = this;
			//obtiene el nodo optgroup o option y devuelve el html correspondiente
			var html = '',
				JSOnode = $element.get(0);
			if (JSOnode.tagName == "OPTGROUP") {
				html += '<li class="' + this.props._liClassOptGroup + '">';
				if (this.props.multiple) html += '	<a href="javascript:;" class="' + this.props._liClassOptGroupLabel + '" title="' + $element.attr("label") + '">' + $element.attr("label") + '</a>';
				else
				html += '	<span class="' + this.props._liClassOptGroupLabel + '" >' + $element.attr("label") + '</span>';
				html += '	<ul>';
				$element.children("option").each(function() {
					html += context.getNode($(this));
				})
				html += '	</ul>';
				html += '</li>';
			} else {
				html += '<li class="' + this.props._liClass + '" val="' + $element.val() + '">';
				html += '	<a href="javascript:;" inheritedValue="' + $element.val() + '" index="' + JSOnode.index + '">';
				html += '		<span>';
				html += $element.html();
				html += '		</span>';
				html += '	</a>';
				html += '</li>';
			}
			return html;
		},
		setActions: function() {
			var context = this;
			this.sc_label.click(function() {
				if(context.settings._closeOnClick && !context.props.disabled) 
					context.settings._open = ((context.settings._open) ? context.closeWrapper() : context.openWrapper());
			});
			this.sc_options.click(function() {
				if(!context.props.disabled)
					context.clickOnOption($(this));
			})
			if (this.props.multiple) { //si es multiple y tiene optgroups, click en el optgroup selecciona (o no) todas las opciones
				this.sc_optgroups_labels.click(function() {
					if(!context.props.disabled)
						context.clickOnOptGroup($(this).parent());
				})
			}
		},
		setEvents: function() {
			
			var context = this;
			
			if (this.settings._openOnMouseEnter) 
				this.sc.bind('mouseenter', function() {
					if(!context.props.disabled)
						context.settings._open = context.openWrapper();
				});
			if (this.settings._closeOnMouseLeave && this.settings._closeOnClick) 
				this.sc.bind('mouseleave', function() {
					if(!context.props.disabled)
						context.settings._open = context.closeWrapper();
				});
			this._public.reArmFromSource();
			if (this.settings._initialState == 'open') this.openWrapper();
			
		},
		destroy: function() {
			// TODO
		},
		populateLabels: function() {
			var context = this;
			//obtiene los labels de los options seleccionados y los pone en sc_label
			var tmp = [];
			$("." + this.props._optionSelectedClass + " span", this.sc).each(function() {
				tmp.push($(this).html());
			});
			this.sc.data("labels", tmp);
			var label = tmp.join(", ");
			if (label == '') {
				this.sc_label.removeClass("selected");
				label = ((this.props.multiple) ? this.settings._text_labelMultiple : this.settings._text_labelSimple);
			} else
			this.sc_label.addClass("selected");
			if (this.settings.showSelectedLabels) this.sc_label.html(label);
			this.sc_label.attr("title", label);
		},
		clickOnOptGroup: function(optgroup) {
            var context = this;
            if(!context.props.disabled){
				//click en un optgroup
				if (optgroup.data("seleccionado")) {
					$("." + this.props._liClass + " a", optgroup).removeClass(this.props._optionSelectedClass);
					optgroup.data("seleccionado", false).children("a").removeClass(this.props._optgroupSelectedClass);
				} else {
					$("." + this.props._liClass + " a", optgroup).addClass(this.props._optionSelectedClass);
					optgroup.data("seleccionado", true).children("a").addClass(this.props._optgroupSelectedClass);
				};
				this.populateLabels();
				this.updateSelect();
			}
		},
		updateSelect: function() {
			var context = this;
            //rearma el select, desde el SC, despues de que se clickea una opcion en el sc
			var indexes = [];
			this.sc_options.each(function() {
				if ($(this).hasClass(context.props._optionSelectedClass))
                    indexes.push($(this).attr("index"));
			})
            //selecciona las indicadas y de-selecciona las demás                
			for (c=0;c<this.sourceNode.options.length;c++)     
                this.sourceNode.options.item(c).selected = (jQuery.inArray(String(c),indexes)!=-1)?true:false;
            //rearma el sc
            this._public.reArmFromSource();
            //dispara el evento change()
			this.$element.change();
		},
		openWrapper: function() {
			if(!this.props.disabled){
				this.wrapper.css("display", "block");
				return true;
			} else
				return context.settings._open;
		},
		closeWrapper: function() {
			if(!this.props.disabled){
				this.wrapper.css("display", "none");
				return false;
			}else
				return context.settings._open;
		},
		clickOnOption: function(selectedOption) {
			var context = this;
			if(!context.props.disabled){
	            //click en una opcion
				if (!this.props.multiple) { //si no es múltiple, entonces remueve el selected de todas las opciones
					this.sc_options.removeClass(this.props._optionSelectedClass);
					if (this.settings._closeOnClick) //si _closeOnClick = true, cierra wrapper
						this.settings._open = this.closeWrapper();
				}
				if (selectedOption.hasClass(this.props._optionSelectedClass))
					selectedOption.removeClass(this.props._optionSelectedClass);
				else
					selectedOption.addClass(this.props._optionSelectedClass);
				var optgroupJQO = selectedOption.parent().parent().parent();
				if (optgroupJQO.length > 0) {
					var ok = true;
					$("." + this.props._liClass + " a", optgroupJQO).each(function() {
						if (!$(this).hasClass(context.props._optionSelectedClass)) 
							ok = false;
					})
					if (ok) 
						optgroupJQO.data("seleccionado", true).children("a").addClass(this.props._optgroupSelectedClass);
					else
						optgroupJQO.data("seleccionado", false).children("a").removeClass(this.props._optgroupSelectedClass);
				}
				this.populateLabels();
				this.updateSelect();
			}
		}
	};
	$.fn[pluginName] = function(method, opts) {
		return this.each(function() {
			//si no está instanciado
			if(!$.data(this, "plugin_" + pluginName)) 
				$.data(this, "plugin_" + pluginName, new Plugin(this, method));
			else {
				//llamamos un metodo?
				if(typeof $(this).data("plugin_" + pluginName)._public[method] === 'function') {
					$(this).data("plugin_" + pluginName)._public[method]($(this).data("plugin_" + pluginName+"_context"),opts);
				}else
					$.error('Method ' + method + ' does not exist on jQuery.smartCombo');
			}
		});
	};
})(jQuery, window, document);