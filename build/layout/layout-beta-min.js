(function(){var C=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang;var B=function(F,E){if(D.isObject(F)&&!F.tagName){E=F;F=null;}if(D.isString(F)){if(C.get(F)){F=C.get(F);}}if(!F){F=document.body;}var G={element:F,attributes:E||{}};B.superclass.constructor.call(this,G.element,G.attributes);};B._instances={};B.getLayoutById=function(E){if(B._instances[E]){return B._instances[E];}return false;};YAHOO.extend(B,YAHOO.util.Element,{browser:function(){var E=YAHOO.env.ua;E.standardsMode=false;E.mac=false;E.windows=false;E.unix=false;E.secure=false;return E;}(),_rendered:null,_zIndex:null,_sizes:null,_setBodySize:function(G){var F=0,E=0;G=((G===false)?false:true);if(this._isBody){F=C.getClientHeight();E=C.getClientWidth();}else{F=parseInt(this.getStyle("height"),10);E=parseInt(this.getStyle("width"),10);}if(this.get("minWidth")){if(E<this.get("minWidth")){E=this.get("minWidth");}}if(this.get("minHeight")){if(F<this.get("minHeight")){F=this.get("minHeight");}}if(G){C.setStyle(this._doc,"height",F+"px");C.setStyle(this._doc,"width",E+"px");}this._sizes.doc={h:F,w:E};this._setSides(G);},_setSides:function(J){var H=((this._top)?this._top.get("height"):0),G=((this._bottom)?this._bottom.get("height"):0),I=this._sizes.doc.h,E=this._sizes.doc.w;J=((J===false)?false:true);this._sizes.top={h:H,w:((this._top)?E:0),t:0};this._sizes.bottom={h:G,w:((this._bottom)?E:0)};var F=(I-(H+G));this._sizes.left={h:F,w:((this._left)?this._left.get("width"):0)};this._sizes.right={h:F,w:((this._right)?this._right.get("width"):0),l:((this._right)?(E-this._right.get("width")):0),t:this._sizes.top.h};if(this._right&&J){if(this._top){this._right.set("top",this._sizes.right.t);}if(!this._right._collapsing){this._right.set("left",this._sizes.right.l);}this._right.set("height",this._sizes.right.h,true);}if(this._left){if(this._top){this._sizes.left.t=this._sizes.top.h;this._sizes.left.l=0;if(J){this._left.set("top",this._sizes.top.h);this._left.set("left",0);}}if(J){this._left.set("height",this._sizes.left.h,true);}}if(this._bottom){this._sizes.bottom.t=this._sizes.top.h+this._sizes.left.h;if(J){this._bottom.set("top",this._sizes.bottom.t);this._bottom.set("width",this._sizes.bottom.w,true);}}if(this._top){if(J){this._top.set("width",this._sizes.top.w,true);}}this._setCenter(J);},_setCenter:function(G){G=((G===false)?false:true);var F=this._sizes.left.h;var E=(this._sizes.doc.w-(this._sizes.left.w+this._sizes.right.w));if(G){this._center.set("height",F,true);this._center.set("width",E,true);this._center.set("top",this._sizes.top.h);this._center.set("left",this._sizes.left.w);}this._sizes.center={h:F,w:E,t:this._sizes.top.h,l:this._sizes.left.w};},getUnitById:function(E){return YAHOO.widget.LayoutUnit.getLayoutUnitById(E);},getUnitByPosition:function(E){if(E){E=E.toLowerCase();if(this["_"+E]){return this["_"+E];}}return false;},removeUnit:function(E){this["_"+E.get("position")]=null;this.resize();},addUnit:function(G){if(!G.position){return false;}if(this["_"+G.position]){return false;}var H=null,J=null;if(G.id){if(C.get(G.id)){H=C.get(G.id);delete G.id;}}if(G.element){H=G.element;}if(!J){J=document.createElement("div");var L=C.generateId();J.id=L;}if(!H){H=document.createElement("div");}C.addClass(H,"yui-layout-wrap");if(this.browser.ie&&!this.browser.standardsMode){J.style.zoom=1;H.style.zoom=1;}if(J.firstChild){J.insertBefore(H,J.firstChild);}else{J.appendChild(H);}this._doc.appendChild(J);var I=false,F=false;if(G.height){I=parseInt(G.height,10);}if(G.width){F=parseInt(G.width,10);}var E={};YAHOO.lang.augmentObject(E,G);E.parent=this;E.wrap=H;E.height=I;E.width=F;var K=new YAHOO.widget.LayoutUnit(J,E);K.on("heightChange",this.resize,this,true);K.on("widthChange",this.resize,this,true);K.on("gutterChange",this.resize,this,true);this["_"+G.position]=K;if(this._rendered){this.resize();}return K;},_createUnits:function(){var E=this.get("units");for(var F in E){if(D.hasOwnProperty(E,F)){this.addUnit(E[F]);}}},resize:function(F){F=((F===false)?false:true);if(F){var E=this.fireEvent("beforeResize");if(E===false){F=false;}if(this.browser.ie){if(this._isBody){C.removeClass(document.documentElement,"yui-layout");C.addClass(document.documentElement,"yui-layout");}else{this.removeClass("yui-layout");this.addClass("yui-layout");}}}this._setBodySize(F);if(F){this.fireEvent("resize",{target:this,sizes:this._sizes});}return this;},_setupBodyElements:function(){this._doc=C.get("doc");if(!this._doc){this._doc=document.createElement("div");this._doc.id="layout-doc";if(document.body.firstChild){document.body.insertBefore(this._doc,document.body.firstChild);}else{document.body.appendChild(this._doc);}}this._createUnits();this._setBodySize();A.on(window,"resize",this.resize,this,true);C.addClass(this._doc,"yui-layout-doc");},_setupElements:function(){this._doc=this.getElementsByClassName("doc")[0];if(!this._doc){this._doc=document.createElement("div");this.get("element").appendChild(this._doc);}this._createUnits();this._setBodySize();A.on(window,"resize",this.resize,this,true);C.addClass(this._doc,"yui-layout-doc");},_isBody:null,_doc:null,_left:null,_right:null,_top:null,_bottom:null,_center:null,init:function(F,E){this._zIndex=0;B.superclass.init.call(this,F,E);if(this.get("parent")){this._zIndex=this.get("parent")._zIndex+10;}this._sizes={};var G=F;if(!D.isString(G)){G=C.generateId(G);}B._instances[G]=this;},render:function(){this._stamp();var E=this.get("element");if(E&&E.tagName&&(E.tagName.toLowerCase()=="body")){this._isBody=true;C.addClass(document.body,"yui-layout");if(C.hasClass(document.body,"yui-skin-sam")){C.addClass(document.documentElement,"yui-skin-sam");C.removeClass(document.body,"yui-skin-sam");}this._setupBodyElements();}else{this._isBody=false;this.addClass("yui-layout");this._setupElements();}this.resize();this._rendered=true;this.fireEvent("render");return this;},_stamp:function(){if(document.compatMode=="CSS1Compat"){this.browser.standardsMode=true;}if(window.location.href.toLowerCase().indexOf("https")===0){C.addClass(document.documentElement,"secure");
this.browser.secure=true;}},initAttributes:function(E){B.superclass.initAttributes.call(this,E);this.setAttributeConfig("units",{writeOnce:true,validator:YAHOO.lang.isArray,value:E.units||[]});this.setAttributeConfig("minHeight",{value:E.minHeight||false,validator:YAHOO.lang.isNumber});this.setAttributeConfig("minWidth",{value:E.minWidth||false,validator:YAHOO.lang.isNumber});this.setAttributeConfig("height",{value:E.height||false,validator:YAHOO.lang.isNumber,method:function(F){this.setStyle("height",F+"px");}});this.setAttributeConfig("width",{value:E.width||false,validator:YAHOO.lang.isNumber,method:function(F){this.setStyle("width",F+"px");}});this.setAttributeConfig("parent",{writeOnce:true,value:E.parent||false,method:function(F){if(F){F.on("resize",this.resize,this,true);}}});},toString:function(){if(this.get){return"Layout #"+this.get("id");}return"Layout";}});YAHOO.widget.Layout=B;})();(function(){var D=YAHOO.util.Dom,C=YAHOO.util.Selector,A=YAHOO.util.Event,E=YAHOO.lang;var B=function(G,F){var H={element:G,attributes:F||{}};B.superclass.constructor.call(this,H.element,H.attributes);};B._instances={};B.getLayoutUnitById=function(F){if(B._instances[F]){return B._instances[F];}console.log(F);return false;};YAHOO.extend(B,YAHOO.util.Element,{STR_CLOSE:"Click to close this pane.",STR_COLLAPSE:"Click to collapse this pane.",STR_EXPAND:"Click to expand this pane.",browser:null,_anim:null,_resize:null,_clip:null,_gutter:null,header:null,body:null,footer:null,_collapsed:null,_collapsing:null,_lastWidth:null,_lastHeight:null,_lastTop:null,_lastLeft:null,_lastScroll:null,resize:function(F){var G=this.fireEvent("beforeResize");if(G===false){return this;}if(!this._collapsing||(F===true)){var N=this.get("scroll");this.set("scroll",false);var K=this._getBoxSize(this.header),J=this._getBoxSize(this.footer),L=[this.get("height"),this.get("width")];var H=(L[0]-K[0]-J[0])-(this._gutter.top+this._gutter.bottom),M=L[1]-(this._gutter.left+this._gutter.right);var O=(H+(K[0]+J[0])),I=M;if(this._collapsed&&!this._collapsing){this._setHeight(this._clip,O);this._setWidth(this._clip,I);D.setStyle(this._clip,"top",this.get("top")+this._gutter.top+"px");D.setStyle(this._clip,"left",this.get("left")+this._gutter.left+"px");}else{if(!this._collapsed||(this._collapsed&&this._collapsing)){O=this._setHeight(this.get("wrap"),O);I=this._setWidth(this.get("wrap"),I);D.setStyle(this.get("wrap"),"top",this._gutter.top+"px");D.setStyle(this.get("wrap"),"left",this._gutter.left+"px");this._setWidth(this.header,I);this._setWidth(this.footer,I);D.setStyle(this.footer,"bottom","0px");this._setHeight(this.body,(O-(K[0]+J[0])));this._setWidth(this.body,I);D.setStyle(this.body,"top",K[0]+"px");this.set("scroll",N);this.fireEvent("resize");}}}return this;},_setWidth:function(H,G){if(H){var F=this._getBorderSizes(H);G=(G-(F[1]+F[3]));G=this._fixQuirks(H,G,"w");D.setStyle(H,"width",G+"px");}return G;},_setHeight:function(H,G){if(H){var F=this._getBorderSizes(H);G=(G-(F[0]+F[2]));G=this._fixQuirks(H,G,"h");D.setStyle(H,"height",G+"px");}return G;},_fixQuirks:function(I,L,G){var K=0,H=2;if(G=="w"){K=1;H=3;}if(this.browser.ie&&!this.browser.standardsMode){var F=this._getBorderSizes(I),J=this._getBorderSizes(I.parentNode);if((F[K]===0)&&(F[H]===0)){if((J[K]!==0)&&(J[H]!==0)){L=(L-(J[K]+J[H]));}}else{if((J[K]===0)&&(J[H]===0)){L=(L+(F[K]+F[H]));}}}return L;},_getBoxSize:function(H){var G=[0,0];if(H){if(this.browser.ie&&!this.browser.standardsMode){H.style.zoom=1;}var F=this._getBorderSizes(H);G[0]=H.clientHeight+(F[0]+F[2]);G[1]=H.clientWidth+(F[1]+F[3]);}return G;},_getBorderSizes:function(H){var G=[];H=H||this.get("element");if(this.browser.ie&&!this.browser.standardsMode){H.style.zoom=1;}G[0]=parseInt(D.getStyle(H,"borderTopWidth"),10);G[1]=parseInt(D.getStyle(H,"borderRightWidth"),10);G[2]=parseInt(D.getStyle(H,"borderBottomWidth"),10);G[3]=parseInt(D.getStyle(H,"borderLeftWidth"),10);for(var F=0;F<G.length;F++){if(isNaN(G[F])){G[F]=0;}}return G;},_createClip:function(){if(!this._clip){this._clip=document.createElement("div");this._clip.className="yui-layout-clip yui-layout-clip-"+this.get("position");this._clip.innerHTML="<div class=\"collapse\"></div>";var F=this._clip.firstChild;F.title=this.STR_EXPAND;A.on(F,"click",this.expand,this,true);this.get("element").parentNode.appendChild(this._clip);}},_toggleClip:function(){if(!this._collapsed){var J=this._getBoxSize(this.header),K=this._getBoxSize(this.footer),I=[this.get("height"),this.get("width")];var H=(I[0]-J[0]-K[0])-(this._gutter.top+this._gutter.bottom),F=I[1]-(this._gutter.left+this._gutter.right),G=(H+(J[0]+K[0]));switch(this.get("position")){case"top":case"bottom":this._setWidth(this._clip,F);this._setHeight(this._clip,this.get("collapseSize"));D.setStyle(this._clip,"left",(this._lastLeft+this._gutter.left)+"px");if(this.get("position")=="bottom"){D.setStyle(this._clip,"top",((this._lastTop+this._lastHeight)-(this.get("collapseSize")-this._gutter.top))+"px");}else{D.setStyle(this._clip,"top",this.get("top")+this._gutter.top+"px");}break;case"left":case"right":this._setWidth(this._clip,this.get("collapseSize"));this._setHeight(this._clip,G);D.setStyle(this._clip,"top",(this.get("top")+this._gutter.top)+"px");if(this.get("position")=="right"){D.setStyle(this._clip,"left",(((this._lastLeft+this._lastWidth)-this.get("collapseSize"))-this._gutter.left)+"px");}else{D.setStyle(this._clip,"left",(this.get("left")+this._gutter.left)+"px");}break;}D.setStyle(this._clip,"display","block");this.setStyle("display","none");}else{D.setStyle(this._clip,"display","none");}},toggle:function(){if(this._collapsed){this.expand();}else{this.collapse();}return this;},expand:function(){if(!this.get("collapse")){return this;}if(!this._collapsed){return this;}this._collapsing=true;this.setStyle("zIndex",this.get("parent")._zIndex+1);if(this._anim){this.setStyle("display","none");var F={},H;switch(this.get("position")){case"left":case"right":this.set("width",this._lastWidth,true);this.setStyle("width",this._lastWidth+"px");
this.get("parent").resize(false);H=this.get("parent")._sizes[this.get("position")];this.set("height",H.h,true);var K=H.l;F={left:{to:K}};if(this.get("position")=="left"){F.left.from=(K-H.w);this.setStyle("left",(K-H.w)+"px");}break;case"top":case"bottom":this.set("height",this._lastHeight,true);this.setStyle("height",this._lastHeight+"px");this.get("parent").resize(false);H=this.get("parent")._sizes[this.get("position")];this.set("width",H.w,true);var J=H.t;F={top:{to:J}};if(this.get("position")=="top"){this.setStyle("top",(J-H.h)+"px");F.top.from=(J-H.h);}break;}this._anim.attributes=F;var I=function(){this.setStyle("display","block");this.resize(true);this._anim.onStart.unsubscribe(I,this,true);};var G=function(){this._collapsing=false;this.setStyle("zIndex",this.get("parent")._zIndex);this.set("width",this._lastWidth);this.set("height",this._lastHeight);this._collapsed=false;this.resize();this.set("scroll",this._lastScroll);this._anim.onComplete.unsubscribe(G,this,true);this.fireEvent("expand");};this._anim.onStart.subscribe(I,this,true);this._anim.onComplete.subscribe(G,this,true);this._anim.animate();this._toggleClip();}else{this._collapsing=false;this._toggleClip();this.setStyle("zIndex",this.get("parent")._zIndex);this.setStyle("display","block");this.set("width",this._lastWidth);this.set("height",this._lastHeight);this._collapsed=false;this.resize();this.set("scroll",this._lastScroll);this.fireEvent("expand");}return this;},collapse:function(){if(!this.get("collapse")){return this;}if(this._collapsed){return this;}if(!this._clip){this._createClip();}this._collapsing=true;var G=this.get("width"),H=this.get("height"),F={};this._lastWidth=G;this._lastHeight=H;this._lastScroll=this.get("scroll");this.set("scroll",false,true);this._lastLeft=parseInt(this.get("element").style.left,10);this._lastTop=parseInt(this.get("element").style.top,10);if(isNaN(this._lastTop)){this._lastTop=0;this.set("top",0);}if(isNaN(this._lastLeft)){this._lastLeft=0;this.set("left",0);}this.setStyle("zIndex",this.get("parent")._zIndex+1);var J=this.get("position");switch(J){case"top":case"bottom":this.set("height",(this.get("collapseSize")+(this._gutter.top+this._gutter.bottom)));F={top:{to:(this.get("top")-H)}};if(J=="bottom"){F.top.to=(this.get("top")+H);}break;case"left":case"right":this.set("width",(this.get("collapseSize")+(this._gutter.left+this._gutter.right)));F={left:{to:-(this._lastWidth)}};if(J=="right"){F.left={to:(this.get("left")+G)};}break;}if(this._anim){this._anim.attributes=F;var I=function(){this._collapsing=false;this._toggleClip();this.setStyle("zIndex",this.get("parent")._zIndex);this._collapsed=true;this.get("parent").resize();this._anim.onComplete.unsubscribe(I,this,true);this.fireEvent("collapse");};this._anim.onComplete.subscribe(I,this,true);this._anim.animate();}else{this._collapsing=false;this.setStyle("display","none");this._toggleClip();this.setStyle("zIndex",this.get("parent")._zIndex);this.get("parent").resize();this._collapsed=true;this.fireEvent("collapse");}return this;},close:function(){this.setStyle("display","none");this.get("parent").removeUnit(this);this.fireEvent("close");if(this._clip){this._clip.parentNode.removeChild(this._clip);this._clip=null;}return this.get("parent");},init:function(H,G){this._gutter={left:0,right:0,top:0,bottom:0};B.superclass.init.call(this,H,G);this.browser=this.get("parent").browser;var K=H;if(!E.isString(K)){K=D.generateId(K);}B._instances[K]=this;this.setStyle("position","absolute");this.addClass("yui-layout-unit");this.addClass("yui-layout-unit-"+this.get("position"));var J=this.getElementsByClassName("yui-layout-hd","div")[0];if(J){this.header=J;}var F=this.getElementsByClassName("yui-layout-bd","div")[0];if(F){this.body=F;}var I=this.getElementsByClassName("yui-layout-ft","div")[0];if(I){this.footer=I;}this.on("contentChange",this.resize,this,true);this.set("animate",this.get("animate"));},initAttributes:function(F){B.superclass.initAttributes.call(this,F);this.setAttributeConfig("wrap",{value:F.wrap||null,method:function(G){if(G){var H=D.generateId(G);B._instances[H]=this;}}});this.setAttributeConfig("grids",{value:F.grids||false});this.setAttributeConfig("top",{value:F.top,validator:E.isNumber,method:function(G){if(!this._collapsing){this.setStyle("top",G+"px");}}});this.setAttributeConfig("left",{value:F.left,validator:E.isNumber,method:function(G){if(!this._collapsing){this.setStyle("left",G+"px");}}});this.setAttributeConfig("minWidth",{value:F.minWidth||50,validator:YAHOO.lang.isNumber});this.setAttributeConfig("maxWidth",{value:F.maxWidth||500,validator:YAHOO.lang.isNumber});this.setAttributeConfig("minHeight",{value:F.minHeight||50,validator:YAHOO.lang.isNumber});this.setAttributeConfig("maxHeight",{value:F.maxHeight||(((this.get("position")=="top")||(this.get("position")=="bottom"))?200:5000),validator:YAHOO.lang.isNumber});this.setAttributeConfig("height",{value:F.height,validator:E.isNumber,method:function(G){if(!this._collapsing){this.setStyle("height",G+"px");}}});this.setAttributeConfig("width",{value:F.width,validator:E.isNumber,method:function(G){if(!this._collapsing){this.setStyle("width",G+"px");}}});this.setAttributeConfig("position",{value:F.position});this.setAttributeConfig("gutter",{value:F.gutter||0,validator:YAHOO.lang.isString,method:function(H){var G=H.split(" ");if(G.length){this._gutter.top=parseInt(G[0],10);if(G[1]){this._gutter.right=parseInt(G[1],10);}else{this._gutter.right=this._gutter.top;}if(G[2]){this._gutter.bottom=parseInt(G[2],10);}else{this._gutter.bottom=this._gutter.top;}if(G[3]){this._gutter.left=parseInt(G[3],10);}else{if(G[1]){this._gutter.left=this._gutter.right;}else{this._gutter.left=this._gutter.top;}}}}});this.setAttributeConfig("parent",{writeOnce:true,value:F.parent||false,method:function(G){if(G){G.on("resize",this.resize,this,true);}}});this.setAttributeConfig("collapseSize",{value:F.collapseSize||25,validator:YAHOO.lang.isNumber});this.setAttributeConfig("duration",{value:F.duration||0.5});
this.setAttributeConfig("easing",{value:F.easing||((YAHOO.util&&YAHOO.util.Easing)?YAHOO.util.Easing.BounceIn:"false")});this.setAttributeConfig("animate",{value:((F.animate===false)?false:true),validator:function(){var G=false;if(YAHOO.util.Anim){G=true;}return G;},method:function(G){if(G){this._anim=new YAHOO.util.Anim(this.get("element"),{},this.get("duration"),this.get("easing"));}else{this._anim=false;}}});this.setAttributeConfig("header",{value:F.header||false,method:function(G){if(G===false){if(this.header){D.addClass(this.body,"yui-layout-bd-nohd");this.header.parentNode.removeChild(this.header);this.header=null;}}else{if(!this.header){var I=this.getElementsByClassName("yui-layout-hd","div")[0];if(!I){I=this._createHeader();}this.header=I;}var H=this.header.getElementsByTagName("h2")[0];if(!H){H=document.createElement("h2");this.header.appendChild(H);}H.innerHTML=G;if(this.body){D.removeClass(this.body,"yui-layout-bd-nohd");}}this.fireEvent("contentChange",{target:"header"});}});this.setAttributeConfig("proxy",{value:((F.proxy===false)?false:true)});this.setAttributeConfig("body",{value:F.body||false,method:function(I){if(!this.body){var G=this.getElementsByClassName("yui-layout-bd","div")[0];if(G){this.body=G;}else{G=document.createElement("div");G.className="yui-layout-bd";this.body=G;this.get("wrap").appendChild(G);}}if(!this.header){D.addClass(this.body,"yui-layout-bd-nohd");}D.addClass(this.body,"yui-layout-bd-noft");var H=null;if(E.isString(I)){H=D.get(I);}else{if(I&&I.tagName){H=I;}}if(H){var J=D.generateId(H);B._instances[J]=this;this.body.appendChild(H);}else{this.body.innerHTML=I;}this._cleanGrids();this.fireEvent("contentChange",{target:"body"});}});this.setAttributeConfig("footer",{value:F.footer||false,method:function(H){if(H===false){if(this.footer){D.addClass(this.body,"yui-layout-bd-noft");this.footer.parentNode.removeChild(this.footer);this.footer=null;}}else{if(!this.footer){var I=this.getElementsByClassName("yui-layout-ft","div")[0];if(!I){I=document.createElement("div");I.className="yui-layout-ft";this.footer=I;this.get("wrap").appendChild(I);}else{this.footer=I;}}var G=null;if(E.isString(H)){G=D.get(H);}else{if(H&&H.tagName){G=H;}}if(G){this.footer.appendChild(G);}else{this.footer.innerHTML=H;}D.removeClass(this.body,"yui-layout-bd-noft");}this.fireEvent("contentChange",{target:"footer"});}});this.setAttributeConfig("close",{value:F.close||false,method:function(G){if(!this.header){this._createHeader();}var H=D.getElementsByClassName("close","div",this.header)[0];if(G){if(!H){H=document.createElement("div");H.className="close";this.header.appendChild(H);A.on(H,"click",this.close,this,true);}H.title=this.STR_CLOSE;}else{if(H){A.purgeElement(H);H.parentNode.removeChild(H);}}this._configs.close.value=G;this.set("collapse",this.get("collapse"));}});this.setAttributeConfig("collapse",{value:F.collapse||false,method:function(G){if(!this.header){this._createHeader();}var H=D.getElementsByClassName("collapse","div",this.header)[0];if(G){if(!H){H=document.createElement("div");this.header.appendChild(H);A.on(H,"click",this.collapse,this,true);}H.title=this.STR_COLLAPSE;H.className="collapse"+((this.get("close"))?" collapse-close":"");}else{if(H){A.purgeElement(H);H.parentNode.removeChild(H);}}}});this.setAttributeConfig("scroll",{value:F.scroll||false,method:function(G){if(G){this.addClass("yui-layout-scroll");}else{this.removeClass("yui-layout-scroll");}}});this.setAttributeConfig("hover",{writeOnce:true,value:F.hover||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("resize",{value:F.resize||false,validator:function(G){if(YAHOO.util&&YAHOO.util.Resize){return true;}return false;},method:function(G){if(G&&!this._resize){var I=false;switch(this.get("position")){case"top":I="b";break;case"bottom":I="t";break;case"right":I="l";break;case"left":I="r";break;}this.setStyle("position","absolute");if(I){this._resize=new YAHOO.util.Resize(this.get("element"),{proxy:this.get("proxy"),hover:this.get("hover"),status:false,autoRatio:false,handles:[I],minWidth:this.get("minWidth"),maxWidth:this.get("maxWidth"),minHeight:this.get("minHeight"),maxHeight:this.get("maxHeight"),height:this.get("height"),width:this.get("width"),setSize:false});this._resize._handles[I].innerHTML="<div class=\"yui-layout-resize-knob\"></div>";if(this.get("proxy")){var H=this._resize.getProxyEl();H.innerHTML="<div class=\"yui-layout-handle-"+I+"\"></div>";}this._resize.on("resize",function(J){this.set("height",J.height);this.set("width",J.width);},this,true);}}else{if(this._resize){this._resize.destroy();}}}});},_cleanGrids:function(){if(this.get("grids")){var F=C.query("div.yui-b",this.body,true);if(F.length){D.removeClass(F,"yui-b");}if(this._isBody){A.onAvailable("yui-main",function(){D.setStyle(C.query("#yui-main"),"margin-left","0");D.setStyle(C.query("#yui-main"),"margin-right","0");});}}},_createHeader:function(){var F=document.createElement("div");F.className="yui-layout-hd";if(this.get("firstChild")){this.get("wrap").insertBefore(F,this.get("wrap").firstChild);}else{this.get("wrap").appendChild(F);}this.header=F;return F;},destroy:function(){if(this._resize){this._resize.destroy();}var G=this.get("parent");this.setStyle("display","none");G.removeUnit(this);if(this._clip){this._clip.parentNode.removeChild(this._clip);this._clip=null;}A.purgeElement(this.get("element"));this.get("parentNode").removeChild(this.get("element"));delete YAHOO.widget.LayoutUnit._instances[this.get("id")];for(var F in this){if(E.hasOwnProperty(this,F)){this[F]=null;delete this[F];}}return G;},toString:function(){if(this.get){return"LayoutUnit #"+this.get("id")+" ("+this.get("position")+")";}return"LayoutUnit";}});YAHOO.widget.LayoutUnit=B;})();YAHOO.register("layout",YAHOO.widget.Layout,{version:"@VERSION@",build:"@BUILD@"});