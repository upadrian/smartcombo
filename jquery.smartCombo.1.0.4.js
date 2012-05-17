﻿/*
* Convierte un combo multiple en botones clickeables
* author: upadrian@gmail.com
*
* version 1.0.4 15/5/2012
*	
* 	bugfix y notas de la version:
*	-----------------------------
*		1.0.4
*			Revisado el rendimiendo. Ahora se cachean las consultas al DOM. Se eliminan variables sin usar. TODO: resolver el
*			pie "seleccionar todos / ninguno" de los combos multiples y multiples con optgroups
*		1.0.3
*			bug en chrome, no dejaba de-seleccionar una opcion, en un combo multiple y en un combo multiple con optgroup
*		1.0.2
*			En un select simple, al seleccionar un elemento por primera vez, estando anteriormente seleccionado 
*			el elemento superior, no actualizaba el valor seleccionado en el select. Método: updateSmartCombo
*
*
*/
(function($) {
	$.fn.smartCombo = function(method) {
		var cache = {};
		var methods = {
			init: function(options) {
				this.each(function() {
					methods.sc_init($(this), options)
				});
			},
			sc_init: function(JQO, options) {
				cache.sourceJQO = JQO;
				cache.sourceNode = cache.sourceJQO.get(0);
				var defaults = {
					_class: 'sc',
					_text_labelSimple: 'Seleccione una opción',
					_text_labelMultiple: 'Seleccione opciones',
					_open: false,
					_wrapperPosition: 'absolute',
					_closeOnClick: true,
					_openOnMouseEnter: false,
					_closeOnMouseLeave: true,
					reArmOnLoad: true,
					setAllSelectedTofalse: false,
					_initialState: 'close'
				};
				cache.settings = $.extend(defaults, options);
				cache.props = {
					multiple: (cache.sourceJQO.attr("multiple")) ? true : false,
					destID: 'sc_' + cache.sourceJQO.attr("id"),
					_ulClass: cache.settings._class + '_ul',
					_liClass: cache.settings._class + '_li',
					_labelClass: cache.settings._class + '_label',
					_footerDivClass: cache.settings._class + '_footer',
					_footerAbt: cache.settings._class + '_footerBT',
					_footerBTall: cache.settings._class + '_footerBTall',
					_footerBTnone: cache.settings._class + '_footerBTnone',
					_liClassOptGroup: cache.settings._class + '_optGroup',
					_liClassOptGroupLabel: cache.settings._class + '_optGroupLabel',
					_wrapperClass: cache.settings._class + '_wrapper',
					_optionSelectedClass: cache.settings._class + '_optionSelectedClass',
					_optgroupSelectedClass: cache.settings._class + '_optgroupSelectedClass'
				};
				var html = '';
				html += '<div id="' + cache.props.destID + '" class="' + cache.settings._class + '">';
				html += '	<div class="' + cache.props._labelClass + '">';
				html += '		<a href="javascript:;" title="' + ((cache.props.multiple) ? cache.settings._text_labelMultiple : cache.settings._text_labelSimple) + '">' + ((cache.props.multiple) ? cache.settings._text_labelMultiple : cache.settings._text_labelSimple) + '</a>';
				html += '	</div>';
				html += '	<div class="' + cache.props._wrapperClass + '" style="position:' + cache.settings._wrapperPosition + '">';
				html += '		<ul class="' + cache.props._ulClass + '">';
				cache.sourceJQO.children("optgroup,option").each(function() {
					html += methods.getNode($(this));
				})
				html += '		<br clear="all" />';
				html += '		</ul>';
				/*
				if(cache.props.multiple){
    				html += '		<div class="' + cache.props._footerDivClass + '">';
    				html += '			<small>';
    				html += '				<span>Seleccionar:&nbsp;</span>';
    				html += '				<a href="javascript:;" class="' + cache.props._footerAbt + ' ' + cache.props._footerBTall + '" >[todos]</a>&nbsp;';
    				html += '				<a href="javascript:;" class="' + cache.props._footerAbt + ' ' + cache.props._footerBTnone + '">[ninguno]</a>';
    				html += '			</small>';
    				html += '		</div>';
    			}
				*/
				html += '	</div>';
				html += '</div>';
				//
				cache.sourceJQO.css("display", "none").after(html);
				cache.sc = $("#" + cache.props.destID);
				cache.sc_options = $("." + cache.props._liClass + " a", cache.sc);
				cache.sc_label = $("." + cache.props._labelClass + " a", cache.sc);
				cache.sc_optgroups = $("." + cache.props._liClassOptGroup + " a", cache.sc);
				cache.sc_optgroups_labels = $("." + cache.props._liClassOptGroupLabel, cache.sc);
				cache.wrapper = $("." + cache.props._wrapperClass, cache.sc);
				cache.hasOptgrups = ($("optgroup", cache.sourceJQO).length > 0) ? true : false;
				cache.optgroups = $("optgroup", cache.sourceJQO);
				cache.options = $("option", cache.sourceJQO);
				options.wrapper = cache.wrapper;
				methods.setActions();
			},
			/*selectAll: function(sc) {
				sc = sc || $(this);
				var options = sc.data("options");
				$("." + cache.props._liClassOptGroup, sc).data("seleccionado", false).children("a").removeClass(cache.props._optgroupSelectedClass);
				cache.settings.removeClass(cache.props._optionSelectedClass);
				$("." + cache.props._liClassOptGroup, sc).each(function() {
					$(this).data("seleccionado", true).children("a").addClass(cache.props._optgroupSelectedClass);
				});
				cache.settings.addClass(cache.props._optionSelectedClass);
				methods.populateLabels(sc);
				methods.updateSmartCombo(sc);
			},
			unSelectAll: function(sc) {
				sc = sc || $(this);
				var options = sc.data("options");
				$("." + cache.props._liClassOptGroup, sc).data("seleccionado", false).children("a").removeClass(cache.props._optgroupSelectedClass);
				cache.settings.removeClass(cache.props._optionSelectedClass);
				methods.populateLabels(sc);
				methods.updateSmartCombo(sc);
			},*/
			destroy: function() {
				return this.each(function() {
					var $this = $(this),
						data = $this.data('smartCombo');
					$this.removeData('smartCombo');
				})
			},
			
			/* -------------- */
			populateLabels: function() {
				var tmp = [];
				//recorro cada opcion seleccionada(no cachear)
				$("." + cache.props._optionSelectedClass + " span", cache.sc).each(function() {
					tmp.push($(this).html());
				});
				cache.sc.data("labels", tmp);
				var label = tmp.join(", ");
				if (label == '') 
					label = ((cache.props.multiple) ? cache.settings._text_labelMultiple : cache.settings._text_labelSimple);
				cache.sc_label.html(label);
			},
			reArmFromSource: function() {
				//rearm
				var indexes = [];
				//
				for (vi = 0; vi < cache.sourceNode.options.length; vi++)
				if (cache.sourceNode.options.item(vi).selected) indexes.push(String(vi));
				//
				cache.sc_options.each(function() {
					if (jQuery.inArray($(this).attr("index"), indexes) != -1) $(this).addClass(cache.props._optionSelectedClass);
					else
					$(this).removeClass(cache.props._optionSelectedClass);
				});
				//chequeamos los optgroup en el smartcombo
				cache.sc_optgroups.each(function() {
					var optgroupJQO = $(this)
					ok = true;
					//todos los <a> dentro de <li>._liClass dentro de optgroupJQO
					$("." + cache.props._liClass + " a", optgroupJQO).each(function() {
						if (!$(this).hasClass(cache.props._optionSelectedClass)) ok = false;
					})
					if (ok) optgroupJQO.data("seleccionado", true).children("a").addClass(cache.props._optgroupSelectedClass);
					else
					optgroupJQO.data("seleccionado", false).children("a").removeClass(cache.props._optgroupSelectedClass);
				});
				if (!cache.props.multiple) if (cache.settings._closeOnClick) cache.settings._open = methods.closeWrapper();
				methods.populateLabels();
			},
			getNode: function(JQOnode) {
				var html = '',
					JSOnode = JQOnode.get(0);
				//
				if (JSOnode.tagName == "OPTGROUP") {
					html += '<li class="' + cache.props._liClassOptGroup + '">';
					if (cache.props.multiple) 
						html += '	<a href="javascript:;" class="' + cache.props._liClassOptGroupLabel + '" title="' + JQOnode.attr("label") + '">' + JQOnode.attr("label") + '</a>';
					else
						html += '	<span class="' + cache.props._liClassOptGroupLabel + '" >' + JQOnode.attr("label") + '</span>';
					html += '	<ul>';
					JQOnode.children("option").each(function() {
						html += methods.getNode($(this));
					})
					html += '	</ul>';
					html += '</li>';
				} else {
					html += '<li class="' + cache.props._liClass + '" val="' + JQOnode.val() + '">';
					html += '	<a href="javascript:;" inheritedValue="' + JQOnode.val() + '" index="' + JSOnode.index + '">';
					html += '		<span>';
					html += JQOnode.html();
					html += '		</span>';
					html += '	</a>';
					html += '</li>';
				}
				return html;
			},
			clickOnOptGroup: function(optgroup) {
				// si está seleccionado
				if (optgroup.data("seleccionado")) {
					//para todos los <a> dentro de los <li>._liclass optgroup
					$("." + cache.props._liClass + " a", optgroup).removeClass(cache.props._optionSelectedClass);
					optgroup.data("seleccionado", false).children("a").removeClass(cache.props._optgroupSelectedClass);
				} else {
					//para todos los <a> dentro de los <li>._liclass optgroup
					$("." + cache.props._liClass + " a", optgroup).addClass(cache.props._optionSelectedClass);
					optgroup.data("seleccionado", true).children("a").addClass(cache.props._optgroupSelectedClass);
				};
				methods.populateLabels();
				methods.updateSmartCombo();
			},
			updateSmartCombo: function() {
				var indexes = [];
				cache.sc_options.each(function() {
					if ($(this).hasClass(cache.props._optionSelectedClass)) indexes.push($(this).attr("index"));
				})
				cache.options.removeAttr("selected");
				for (vi in indexes)
					cache.sourceNode.options[indexes[vi]].selected = true;
				cache.sourceJQO.change();
			},
			setActions: function() {
				cache.sc_label.click(function() {
					if (cache.settings._closeOnClick) cache.settings._open = ((cache.settings._open) ? methods.closeWrapper() : methods.openWrapper());
				});
				cache.sc_options.click(function() {
					methods.clickOnOption($(this));
				})
				if (cache.props.multiple) {
					cache.sc_optgroups_labels.click(function() {
						methods.clickOnOptGroup($(this).parent());
					})
				}
				/*$("." + options._footerBTall, sc).click(function() {
    				methods.selectAll(sc);
    			});
    			$("." + options._footerBTnone, sc).click(function() {
    				methods.unSelectAll(sc);
    			});*/
				methods.setEvents();
			},
			setEvents: function() {
				cache.sc.bind('mouseenter', function() {
					if (cache.settings._openOnMouseEnter) cache.settings._open = methods.openWrapper();
				});
				cache.sc.bind('mouseleave', function() {
					if (cache.settings._closeOnMouseLeave && cache.settings._closeOnClick) cache.settings._open = methods.closeWrapper();
				});
				cache.sourceJQO.change(function() {
					methods.reArmFromSource();
				});
				if (cache.settings.reArmOnLoad) methods.reArmFromSource();
				if (cache.settings._initialState == 'open') methods.openWrapper();
				/*if(cache.settings.setAllSelectedTofalse) {
    				var targetJSnode = options.sourceJQO.get(0),
    				JSnodeOptions = targetJSnode.options;
    				for (vi = 0; vi < JSnodeOptions.length; vi++)
    					JSnodeOptions.item(vi).selected = false;
    			}*/
			},
			openWrapper: function() {
				cache.wrapper.css("display", "block");
				return true;
			},
			closeWrapper: function() {
				cache.wrapper.css("display", "none");
				return false;
			},
			clickOnOption: function(selectedOption) {
				if (!cache.props.multiple) {
					//como no es multiple
					cache.sc_options.removeClass(cache.props._optionSelectedClass);
					if (cache.settings._closeOnClick) cache.settings._open = methods.closeWrapper();
				}
				//		
				if (selectedOption.hasClass(cache.props._optionSelectedClass)) selectedOption.removeClass(cache.props._optionSelectedClass);
				else
				selectedOption.addClass(cache.props._optionSelectedClass);
				//captamos si tiene un optgroup antes
				var optgroupJQO = selectedOption.parent().parent().parent();
				if (optgroupJQO.length > 0) {
					var ok = true;
					// todos los <a> dentro de el <li>._liclass dentro del optgroupJQO
					$("." + cache.props._liClass + " a", optgroupJQO).each(function() {
						if (!$(this).hasClass(cache.props._optionSelectedClass)) ok = false;
					})
					if (ok) optgroupJQO.data("seleccionado", true).children("a").addClass(cache.props._optgroupSelectedClass);
					else
					optgroupJQO.data("seleccionado", false).children("a").removeClass(cache.props._optgroupSelectedClass);
				}
				//populamos
				methods.populateLabels();
				methods.updateSmartCombo();
			}
		};
		if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
		else
		$.error('Method ' + method + ' does not exist on jQuery.smartCombo');
	};
})(jQuery);