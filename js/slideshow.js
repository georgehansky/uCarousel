(function($){
	var initialize = function(container) {
		var itemWidth = container.outerWidth();
		$('.items',container).width(container.attr('itemCount') * itemWidth);
		next(container);
	}
	var next = function(container) {
		var slideNumber = parseInt(container.attr('slideNumber')) +1 == container.attr('itemCount') ? 0 : parseInt(container.attr('slideNumber'))+1;
		container.attr('slideNumber',slideNumber);
		var moveLeft = slideNumber * container.attr('shiftSide') * -1;
		$('.items',container).css('marginLeft',moveLeft);
		$('.items .item',container).removeClass('current').eq(slideNumber+1).addClass('current');
	}
	var previous = function(container) {
		var moveRight = parseInt($('.items',container).css('marginLeft'));
			moveRight = parseInt(container.attr('slideNumber')) == 0 ? (container.attr('itemCount')-1) * container.attr('shiftSide') * -1 : moveRight + parseInt(container.attr('shiftSide'));
			$('.items',container).css('marginLeft',moveRight);
			var slideNumber = parseInt(container.attr('slideNumber'))-1 < 0 ? container.attr('itemCount') -1 : parseInt(container.attr('slideNumber')) -1 ;
			container.attr('slideNumber',slideNumber);
			$('.items .item',container).removeClass('current').eq(slideNumber-1).addClass('current');
	}
	var attachControls = function(container) {
		$('.next',container).on('click', {container:container},function(event){
			next(event.data.container);
		});
		$('.previous',container).on('click',{container:container},function(event){
			previous(event.data.container);
		});
	}
	var methods = {
		init: function() {
			this.addClass('container');
			$('.items .item',this).eq(0).addClass('first');
			this.attr({'itemCount':$('.items .item',this).length,
						'shiftSide':parseInt($('.item:not(".first")',this).css('marginLeft'))+parseInt(this.width()),
						'slideNumber': -1
					});
			initialize(this);
			attachControls(this);
			return this;
		}
	}
	
	$.fn.uCarousel = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.uCarousel' );
    }    
  
  };
})(jQuery);

jQuery(function() {
	$('.container').uCarousel();
	$('.secondCarousel').uCarousel();
});