var slideshow= function(){
	var itemHeight,
		itemCount,
		slideWidth,
		containerWidth,
		slideNumber= -1,
		shiftWidth = 0,
		shiftSide = 0,
		shiftOffset = 0;
	return {
		init : function(){
			itemHeight = $('.container .items .item').outerHeight();
			itemCount = $('.container .items .item').length;
			slideWidth = $('.container').outerWidth();
			containerWidth = itemCount*slideWidth;
			shiftOffset = parseInt($('.item:not(".first")').css('marginLeft'));
			shiftWidth = parseInt($('.container').width());
			shiftSide = shiftOffset+shiftWidth;
			$('.container .items').width(containerWidth);
			slideshow.next();
		},
		next : function() {
			slideNumber = slideNumber+1 == itemCount ? 0 : slideNumber+1;
			var moveLeft = slideNumber * shiftSide * -1;
			$('.container .items').css('marginLeft',moveLeft);
			$('.item').removeClass('current').eq(slideNumber+1).addClass('current');
		},
		previous : function() {
			var moveRight = parseInt($('.container .items').css('marginLeft'));
			moveRight = slideNumber == 0 ? (itemCount-1) * shiftSide * -1 : moveRight + shiftSide;
			$('.container .items').css('marginLeft',moveRight);
			slideNumber = slideNumber-1 < 0 ? itemCount -1 : slideNumber -1 ;
			$('.item').removeClass('current').eq(slideNumber-1).addClass('current');
		}
	}
}();
jQuery(function(){
	slideshow.init();
	jQuery('.next').on('click',function(){
		slideshow.next();
	});
	jQuery('.previous').on('click',function(){
		slideshow.previous();
	});
});