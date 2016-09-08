$(document).ready(function() {
$("li.showOverlay > a, a.showOverlay").click(function(){
		$("div.ajax-overlay").show();
		});
 /* all select make buetifull */               
$('select.dropdown').easyDropDown();
                
/*sho/hide main phones by click*/
$('#logoPhones').click(function(){
    var first =  $(this).children('span.phone:first-child');
  
     var childs = $(this).children('span.phone');
     
    if (first.hasClass('first')){
    first.removeClass('first'); 
    childs.show('slow');
    }else{
        childs.hide();
        first.addClass('first').removeAttr('style'); 
    }
});
$(function () {
    $("[data-toggle='tooltip']").tooltip(); 
});




/*button buy click*/
$('button.buy').on('click',function(e){
   $("div.ajax-overlay").show();
    e.preventDefault();
    
      jQuery.fancybox.showLoading() 
    var form = $(this).parents('form');
    var data = form.serialize();
   
    jQuery.ajax({
       type:'get',
       data:data,
       url: baseUrl + '/cart/add',
       dataType:'html',
      // data: {},
       success:function (data){
        
           jQuery.fancybox(data,{'closeBtn':false});
           $("div.ajax-overlay").hide();
       }
   }); 
  
});

 setEqualHeight('div.finded');
    setEqualHeight('div.equalHeight');
    vertAlignMiddleEl();
    $(".itemsPjax").on("pjax:end", function() {
          setEqualHeight('div.finded');
    setEqualHeight('div.equalHeight');
    vertAlignMiddleEl();
        });
 
 function vertAlignMiddleEl(){
   var elems = $('div.equalHeight').find('a.fancybox > img');
   $.each(elems,function(key,elem){
         
         var elemHeight = $(this).height();
        
   });
 
 }

/* выравниваем блоки подбора шин и дисков по высоте */
function setEqualHeight(selector){
	 height = 0;
	var finded = $(selector);

	$.each(finded,function(){
	if ($(this).height() > height){
		height = $(this).height()		
	}	
	});
	$(selector).height(height);
	height = null;
	
}
/*
$('#make_order').on('click',function(){
    $('#cart_form').submit();
});
$('#close_cart').on('click',function(e){
    e.preventDefault();
     $.fancybox.close();
})
$('#continue_shopping').on('click',function(){
	//showCartStatus();
    $.fancybox.close();
  
});
$(":input").on("change blur",function(){
    tr = $(this).parents('tr');
    if (tr){
    var quantity = this.value;
    var id = jQuery(this).attr('id').split("_");
     var category_id = id[1];
     var item_id = id[2];
   

 $.ajax({
   type: "POST",
   url:  " <?=Url::to(['/cart/update']);?>",
   data: {"qty":quantity,
         "item_id":item_id,
         "category_id":category_id
          },
   success: processJson,
        dataType: 'json'
  
});
   if(quantity == 0)tr.remove(); 
   }
});

function processJson(data) {
console.log(data);
tr.find('td.subtotal').text(data.subtotal);
$('div.cart').find('#total').text(data.total);

	
showHideContinueButton();

}    

$("a.delete").click(function(){
if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')){
     var id = jQuery(this).attr('id').split("_");
     var category_id = id[1];
     var item_id = id[2];


 $.ajax({
   type: "POST",
   url: "<?=Url::to(['/cart/remove']);?>",
   data: {"item_id":item_id,
          "category_id":category_id
         },
   success: processJsonDel,
        dataType: 'json'
  
});
var tr = $(this).parents('tr');
tr.remove();
}
return false;      
});

function processJsonDel(data) {
$('div.cart').find('#total').text(data.total);
//$('div#korzina').empty();

//var total =  $('span#cart').html();
//$('span#cart').html(total-1);
}  

function showHideContinueButton(){
	  var cartCount = 0;
	  var total = $('#total').text();
	    jQuery('input.cartQty').each(function(){
	 //   	 console.log(jQuery(this));
	        cartCount += parseInt(jQuery(this).val());
	    })
	    if (cartCount>0){
	    	
	    	$('#make_order').show();
	    	$('div.cartText').html('В корзине <span id="cartCount">'+cartCount+'</span> товаров<br />'
	    	+'на сумму <span id="cartTotal">'+ total  +'</span> грн.');
	    	        }else {
	       	$('#make_order').hide();
	       	$('div.cartText').html('Ваша корзина пуста');
	    	        }
     //   console.log(cartCount);
	    
}/**/
$(window).scroll(function(){
                		if ($(this).scrollTop() > 100) {
                		$(".scrollup").fadeIn();
                		} else {
                		$(".scrollup").fadeOut();
                		}
                		});
                		 
                		$(".scrollup").click(function(){
                		$("html, body").animate({ scrollTop: 0 }, 600);
                		return false;
                		});

});
$(document).ajaxStart(function(){
   $("div.ajax-overlay").show();
 }).ajaxStop(function(){
   $("div.ajax-overlay").hide();
 });
 
 
 
 
 /*
* EASYDROPDOWN - A Drop-down Builder for Styleable Inputs and Menus
* Version: 2.1.4
* License: Creative Commons Attribution 3.0 Unported - CC BY 3.0
* http://creativecommons.org/licenses/by/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2013 Patrick Kunka, All Rights Reserved


(function(d) {
    function e() {
        this.isField = !0;
        this.keyboardMode = this.hasLabel = this.cutOff = this.disabled = this.inFocus = this.down = !1;
        this.nativeTouch = !0;
        this.wrapperClass = "dropdown";
        this.onChange = null
    }
    e.prototype = {
        constructor: e,
        instances: {},
        init: function(a, c) {
            var b = this;
            d.extend(b, c);
            b.$select = d(a);
            b.id = a.id;
            b.options = [];
            b.$options = b.$select.find("option");
            b.isTouch = "ontouchend" in document;
            b.$select.removeClass(b.wrapperClass + " dropdown");
            b.$select.is(":disabled") && (b.disabled = !0);
            b.$options.length && (b.$options.each(function(a) {
                var c =
                    d(this);
                c.is(":selected") && (b.selected = {
                    index: a,
                    title: c.text()
                }, b.focusIndex = a);
                c.hasClass("label") && 0 == a ? (b.hasLabel = !0, b.label = c.text(), c.attr("value", "")) : b.options.push({
                    domNode: c[0],
                    title: c.text(),
                    value: c.val(),
                    selected: c.is(":selected")
                })
            }), b.selected || (b.selected = {
                index: 0,
                title: b.$options.eq(0).text()
            }, b.focusIndex = 0), b.render())
        },
        render: function() {
            var a = this;
            a.$container = a.$select.wrap('<div class="' + a.wrapperClass + (a.isTouch && a.nativeTouch ? " touch" : "") + (a.disabled ? " disabled" : "") + '"><span class="old"/></div>').parent().parent();
            a.$active = d('<span class="selected">' + a.selected.title + "</span>").appendTo(a.$container);
            a.$carat = d('<span class="carat"/>').appendTo(a.$container);
            a.$scrollWrapper = d("<div><ul/></div>").appendTo(a.$container);
            a.$dropDown = a.$scrollWrapper.find("ul");
            a.$form = a.$container.closest("form");
            d.each(a.options, function() {
                a.$dropDown.append("<li" + (this.selected ? ' class="active"' : "") + ">" + this.title + "</li>")
            });
            a.$items = a.$dropDown.find("li");
            a.cutOff && a.$items.length > a.cutOff && a.$container.addClass("scrollable");
            a.getMaxHeight();
            a.isTouch && a.nativeTouch ? a.bindTouchHandlers() : a.bindHandlers()
        },
        getMaxHeight: function() {
            for (i = this.maxHeight = 0; i < this.$items.length; i++) {
                var a = this.$items.eq(i);
                this.maxHeight += a.outerHeight();
                if (this.cutOff == i + 1) break
            }
        },
        bindTouchHandlers: function() {
            var a = this;
            a.$container.on("click.easyDropDown", function() {
                a.$select.focus()
            });
            a.$select.on({
                change: function() {
                    var c = d(this).find("option:selected"),
                        b = c.text(),
                        c = c.val();
                    a.$active.text(b);
                    "function" === typeof a.onChange && a.onChange.call(a.$select[0], {
                        title: b,
                        value: c
                    })
                },
                focus: function() {
                    a.$container.addClass("focus")
                },
                blur: function() {
                    a.$container.removeClass("focus")
                }
            })
        },
        bindHandlers: function() {
            var a = this;
            a.query = "";
            a.$container.on({
                "click.easyDropDown": function() {
                    a.down || a.disabled ? a.close() : a.open()
                },
                "mousemove.easyDropDown": function() {
                    a.keyboardMode && (a.keyboardMode = !1)
                }
            });
            d("body").on("click.easyDropDown." + a.id, function(c) {
                c = d(c.target);
                var b = a.wrapperClass.split(" ").join(".");
                !c.closest("." + b).length && a.down && a.close()
            });
            a.$items.on({
                "click.easyDropDown": function() {
                    var c =
                        d(this).index();
                    a.select(c);
                    a.$select.focus()
                },
                "mouseover.easyDropDown": function() {
                    if (!a.keyboardMode) {
                        var c = d(this);
                        c.addClass("focus").siblings().removeClass("focus");
                        a.focusIndex = c.index()
                    }
                },
                "mouseout.easyDropDown": function() {
                    a.keyboardMode || d(this).removeClass("focus")
                }
            });
            a.$select.on({
                "focus.easyDropDown": function() {
                    a.$container.addClass("focus");
                    a.inFocus = !0
                },
                "blur.easyDropDown": function() {
                    a.$container.removeClass("focus");
                    a.inFocus = !1
                },
                "keydown.easyDropDown": function(c) {
                    if (a.inFocus) {
                        a.keyboardMode = !0;
                        var b = c.keyCode;
                        if (38 == b || 40 == b || 32 == b) c.preventDefault(), 38 == b ? (a.focusIndex--, a.focusIndex = 0 > a.focusIndex ? a.$items.length - 1 : a.focusIndex) : 40 == b && (a.focusIndex++, a.focusIndex = a.focusIndex > a.$items.length - 1 ? 0 : a.focusIndex), a.down || a.open(), a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus"), a.cutOff && a.scrollToView(), a.query = "";
                        if (a.down)
                            if (9 == b || 27 == b) a.close();
                            else {
                                if (13 == b) return c.preventDefault(), a.select(a.focusIndex), a.close(), !1;
                                if (8 == b) return c.preventDefault(), a.query = a.query.slice(0, -1), a.search(), clearTimeout(a.resetQuery), !1;
                                38 != b && 40 != b && (c = String.fromCharCode(b), a.query += c, a.search(), clearTimeout(a.resetQuery))
                            }
                    }
                },
                "keyup.easyDropDown": function() {
                    a.resetQuery = setTimeout(function() {
                        a.query = ""
                    }, 1200)
                }
            });
            a.$dropDown.on("scroll.easyDropDown", function(c) {
                a.$dropDown[0].scrollTop >= a.$dropDown[0].scrollHeight - a.maxHeight ? a.$container.addClass("bottom") : a.$container.removeClass("bottom")
            });
            if (a.$form.length) a.$form.on("reset.easyDropDown", function() {
                a.$active.text(a.hasLabel ? a.label :
                    a.options[0].title)
            })
        },
        unbindHandlers: function() {
            this.$container.add(this.$select).add(this.$items).add(this.$form).add(this.$dropDown).off(".easyDropDown");
            d("body").off("." + this.id)
        },
        open: function() {
            var a = window.scrollY || document.documentElement.scrollTop,
                c = window.scrollX || document.documentElement.scrollLeft,
                b = this.notInViewport(a);
            this.closeAll();
            this.getMaxHeight();
            this.$select.focus();
            this.$container.addClass("open");
            this.$scrollWrapper.css("height", this.maxHeight + "px");
            this.down = !0
        },
        close: function() {
            this.$container.removeClass("open");
            this.$scrollWrapper.css("height", "0px");
            this.focusIndex = this.selected.index;
            this.query = "";
            this.down = !1
        },
        closeAll: function() {
            var a = Object.getPrototypeOf(this).instances,
                c;
            for (c in a) a[c].close()
        },
        select: function(a) {
            "string" === typeof a && (a = this.$select.find("option[value=" + a + "]").index() - 1);
            var c = this.options[a],
                b = this.hasLabel ? a + 1 : a;
            this.$items.removeClass("active").eq(a).addClass("active");
            this.$active.text(c.title);
            this.$select.find("option").removeAttr("selected").eq(b).prop("selected", !0).parent().trigger("change");
            this.selected = {
                index: a,
                title: c.title
            };
            this.focusIndex = i;
            "function" === typeof this.onChange && this.onChange.call(this.$select[0], {
                title: c.title,
                value: c.value
            })
        },
        search: function() {
            var a = this,
                c = function(b) {
                    a.focusIndex = b;
                    a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus");
                    a.scrollToView()
                };
            for (i = 0; i < a.options.length; i++) {
                var b = a.options[i].title.toUpperCase();
                if (0 == b.indexOf(a.query)) {
                    c(i);
                    return
                }
            }
            for (i = 0; i < a.options.length; i++)
                if (b = a.options[i].title.toUpperCase(), -1 < b.indexOf(a.query)) {
                    c(i);
                    break
                }
        },
        scrollToView: function() {
            if (this.focusIndex >= this.cutOff) {
                var a = this.$items.eq(this.focusIndex).outerHeight() * (this.focusIndex + 1) - this.maxHeight;
            }
        },
        notInViewport: function(a) {
            var c = a + (window.innerHeight || document.documentElement.clientHeight),
                b = this.$dropDown.offset().top + this.maxHeight;
            return b >= a && b <= c ? 0 : b - c + 5
        },
        destroy: function() {
            this.unbindHandlers();
            this.$select.unwrap().siblings().remove();
            this.$select.unwrap();
            delete Object.getPrototypeOf(this).instances[this.$select[0].id]
        },
        disable: function() {
            this.disabled = !0;
            this.$container.addClass("disabled");
            this.$select.attr("disabled", !0);
            this.down || this.close()
        },
        enable: function() {
            this.disabled = !1;
            this.$container.removeClass("disabled");
            this.$select.attr("disabled", !1)
        }
    };
    var f = function(a, c) {
        a.id = a.id ? a.id : "EasyDropDown" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase();
        var b = new e;
        b.instances[a.id] || (b.instances[a.id] = b, b.init(a, c))
    };
    d.fn.easyDropDown = function() {
        var a = arguments,
            c = [],
            b;
        b = this.each(function() {
            if (a &&
                "string" === typeof a[0]) {
                var b = e.prototype.instances[this.id][a[0]](a[1], a[2]);
                b && c.push(b)
            } else f(this, a[0])
        });
        return c.length ? 1 < c.length ? c : c[0] : b
    };
    d(function() {
        "function" !== typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === typeof "test".__proto__ ? function(a) {
            return a.__proto__
        } : function(a) {
            return a.constructor.prototype
        });
        d("select.dropdown").each(function() {
            var a = d(this).attr("data-settings");
            settings = a ? d.parseJSON(a) : {};
            f(this, settings)
        })
    })
})(jQuery);
*/