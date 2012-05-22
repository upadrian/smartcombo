﻿/*
* Convierte un combo multiple en botones clickeables
* author: upadrian@gmail.com
*
* version 1.0.4 15/5/2012
*	
* 	bugfix y notas de la version:
*	-----------------------------
*		1.0.4.1
*			Para un selector que refiera a varios elementos, los tomaba como uno solo. Por ejemplo $("#select1,#select2")
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
(function(a){a.fn.smartCombo=function(b){var c={};var d={init:function(b){if(a(this).length>1)a(this).each(function(){a(this).smartCombo(b)});else d.sc_init(a(this),b)},sc_init:function(b,e){c.sourceJQO=b;c.sourceNode=c.sourceJQO.get(0);var f={_class:"sc",_text_labelSimple:"Seleccione una opción",_text_labelMultiple:"Seleccione opciones",_open:false,_wrapperPosition:"absolute",_closeOnClick:true,_openOnMouseEnter:false,_closeOnMouseLeave:true,reArmOnLoad:true,setAllSelectedTofalse:false,_initialState:"close"};c.settings=a.extend(f,e);c.props={multiple:c.sourceJQO.attr("multiple")?true:false,destID:"sc_"+c.sourceJQO.attr("id"),_ulClass:c.settings._class+"_ul",_liClass:c.settings._class+"_li",_labelClass:c.settings._class+"_label",_footerDivClass:c.settings._class+"_footer",_footerAbt:c.settings._class+"_footerBT",_footerBTall:c.settings._class+"_footerBTall",_footerBTnone:c.settings._class+"_footerBTnone",_liClassOptGroup:c.settings._class+"_optGroup",_liClassOptGroupLabel:c.settings._class+"_optGroupLabel",_wrapperClass:c.settings._class+"_wrapper",_optionSelectedClass:c.settings._class+"_optionSelectedClass",_optgroupSelectedClass:c.settings._class+"_optgroupSelectedClass"};var g="";g+='<div id="'+c.props.destID+'" class="'+c.settings._class+'">';g+='	<div class="'+c.props._labelClass+'">';g+='		<a href="javascript:;" title="'+(c.props.multiple?c.settings._text_labelMultiple:c.settings._text_labelSimple)+'">'+(c.props.multiple?c.settings._text_labelMultiple:c.settings._text_labelSimple)+"</a>";g+="	</div>";g+='	<div class="'+c.props._wrapperClass+'" style="position:'+c.settings._wrapperPosition+'">';g+='		<ul class="'+c.props._ulClass+'">';c.sourceJQO.children("optgroup,option").each(function(){g+=d.getNode(a(this))});g+='		<br clear="all" />';g+="		</ul>";g+="	</div>";g+="</div>";c.sourceJQO.css("display","none").after(g);c.sc=a("#"+c.props.destID);c.sc_options=a("."+c.props._liClass+" a",c.sc);c.sc_label=a("."+c.props._labelClass+" a",c.sc);c.sc_optgroups=a("."+c.props._liClassOptGroup+" a",c.sc);c.sc_optgroups_labels=a("."+c.props._liClassOptGroupLabel,c.sc);c.wrapper=a("."+c.props._wrapperClass,c.sc);c.hasOptgrups=a("optgroup",c.sourceJQO).length>0?true:false;c.optgroups=a("optgroup",c.sourceJQO);c.options=a("option",c.sourceJQO);e.wrapper=c.wrapper;d.setActions()},destroy:function(){return this.each(function(){var b=a(this),c=b.data("smartCombo");b.removeData("smartCombo")})},populateLabels:function(){var b=[];a("."+c.props._optionSelectedClass+" span",c.sc).each(function(){b.push(a(this).html())});c.sc.data("labels",b);var d=b.join(", ");if(d=="")d=c.props.multiple?c.settings._text_labelMultiple:c.settings._text_labelSimple;c.sc_label.html(d)},reArmFromSource:function(){var b=[];for(vi=0;vi<c.sourceNode.options.length;vi++)if(c.sourceNode.options.item(vi).selected)b.push(String(vi));c.sc_options.each(function(){if(jQuery.inArray(a(this).attr("index"),b)!=-1)a(this).addClass(c.props._optionSelectedClass);else a(this).removeClass(c.props._optionSelectedClass)});c.sc_optgroups.each(function(){var b=a(this);ok=true;a("."+c.props._liClass+" a",b).each(function(){if(!a(this).hasClass(c.props._optionSelectedClass))ok=false});if(ok)b.data("seleccionado",true).children("a").addClass(c.props._optgroupSelectedClass);else b.data("seleccionado",false).children("a").removeClass(c.props._optgroupSelectedClass)});if(!c.props.multiple&&c.settings._closeOnClick)c.settings._open=d.closeWrapper();d.populateLabels()},getNode:function(b){var e="",f=b.get(0);if(f.tagName=="OPTGROUP"){e+='<li class="'+c.props._liClassOptGroup+'">';if(c.props.multiple)e+='	<a href="javascript:;" class="'+c.props._liClassOptGroupLabel+'" title="'+b.attr("label")+'">'+b.attr("label")+"</a>";else e+='	<span class="'+c.props._liClassOptGroupLabel+'" >'+b.attr("label")+"</span>";e+="	<ul>";b.children("option").each(function(){e+=d.getNode(a(this))});e+="	</ul>";e+="</li>"}else{e+='<li class="'+c.props._liClass+'" val="'+b.val()+'">';e+='	<a href="javascript:;" inheritedValue="'+b.val()+'" index="'+f.index+'">';e+="		<span>";e+=b.html();e+="		</span>";e+="	</a>";e+="</li>"}return e},clickOnOptGroup:function(b){if(b.data("seleccionado")){a("."+c.props._liClass+" a",b).removeClass(c.props._optionSelectedClass);b.data("seleccionado",false).children("a").removeClass(c.props._optgroupSelectedClass)}else{a("."+c.props._liClass+" a",b).addClass(c.props._optionSelectedClass);b.data("seleccionado",true).children("a").addClass(c.props._optgroupSelectedClass)}d.populateLabels();d.updateSmartCombo()},updateSmartCombo:function(){var b=[];c.sc_options.each(function(){if(a(this).hasClass(c.props._optionSelectedClass))b.push(a(this).attr("index"))});c.options.removeAttr("selected");for(vi in b)c.sourceNode.options[b[vi]].selected=true;c.sourceJQO.change()},setActions:function(){c.sc_label.click(function(){if(c.settings._closeOnClick)c.settings._open=c.settings._open?d.closeWrapper():d.openWrapper()});c.sc_options.click(function(){d.clickOnOption(a(this))});if(c.props.multiple){c.sc_optgroups_labels.click(function(){d.clickOnOptGroup(a(this).parent())})}d.setEvents()},setEvents:function(){c.sc.bind("mouseenter",function(){if(c.settings._openOnMouseEnter)c.settings._open=d.openWrapper()});c.sc.bind("mouseleave",function(){if(c.settings._closeOnMouseLeave&&c.settings._closeOnClick)c.settings._open=d.closeWrapper()});c.sourceJQO.change(function(){d.reArmFromSource()});if(c.settings.reArmOnLoad)d.reArmFromSource();if(c.settings._initialState=="open")d.openWrapper()},openWrapper:function(){c.wrapper.css("display","block");return true},closeWrapper:function(){c.wrapper.css("display","none");return false},clickOnOption:function(b){if(!c.props.multiple){c.sc_options.removeClass(c.props._optionSelectedClass);if(c.settings._closeOnClick)c.settings._open=d.closeWrapper()}if(b.hasClass(c.props._optionSelectedClass))b.removeClass(c.props._optionSelectedClass);else b.addClass(c.props._optionSelectedClass);var e=b.parent().parent().parent();if(e.length>0){var f=true;a("."+c.props._liClass+" a",e).each(function(){if(!a(this).hasClass(c.props._optionSelectedClass))f=false});if(f)e.data("seleccionado",true).children("a").addClass(c.props._optgroupSelectedClass);else e.data("seleccionado",false).children("a").removeClass(c.props._optgroupSelectedClass)}d.populateLabels();d.updateSmartCombo()}};if(d[b])return d[b].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof b==="object"||!b)return d.init.apply(this,arguments);else a.error("Method "+b+" does not exist on jQuery.smartCombo")}})(jQuery)