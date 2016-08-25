$(function(){
	// 获取DOM对象
	var h=$(document).height();
	console.log(h)
	$('body').css('height',h)
	var audio=$('#audio').get(0);
	// 获取jQuery对象
	var $audio=$('audio');
	var musics=[
		{src:'mp3/1.mp3',name:'不才',zuozhe:'不才',shichang:'04:26'},
		{src:'mp3/2.mp3',name:'塘桥夜话',zuozhe:'不才',shichang:'04:14'},
		{src:'mp3/3.mp3',name:'到不了',zuozhe:'陈翔',shichang:'03:49'},
		{src:'mp3/4.mp3',name:'好久不见',zuozhe:'陈奕迅',shichang:'04:10'},
		{src:'mp3/5.mp3',name:'东风破',zuozhe:'周杰伦',shichang:'05:15'},
		{src:'mp3/6.mp3',name:'伶仃谣',zuozhe:'河图',shichang:'04:15'},
		{src:'mp3/7.mp3',name:'小芳',zuozhe:'李荣浩',shichang:'04:10'},
		{src:'mp3/8.mp3',name:'寒衣调',zuozhe:'神无月',shichang:'04:40'},
	]
	$(musics).each(function(i,v){
		$('<ul class="songlist" data-id='+i+'><li class="songname">'+v.name+'</li><li class="songzuozhe">'+v.zuozhe+'</li><li class="songshichang">'+v.shichang+'</li><div class="sharebox"><li class="like"></li><li class="fenx"></li><li class="shouc"></li><li class="shanc" style="margin-right:0"></li></div></ul>').appendTo('.play-list .gequliebiao');
		
	})
	var currentIndex;

	$('.songlist').on('click',function(){
		// currentIndex=parseInt($(this).attr('data-id'));
		currentIndex=parseInt($(this).index());
		audio.src=musics[currentIndex].src;
		audio.play();
		

	});
	// 下一首
	$('.anniu .xia').on('click',function(){
		if(currentIndex==undefined){
			currentIndex=0
		}
		currentIndex+=1;
		if(currentIndex>=musics.length){
			currentIndex=0;
		}
		
		audio.src=musics[currentIndex].src;
		audio.play();
	})
	// 上一首
	$('.shang').on('click',function(){	
		if(currentIndex==undefined){
			currentIndex=0
		}
		currentIndex-=1;
		if(currentIndex<0){
			currentIndex=musics.length-1;
		}
		
		audio.src=musics[currentIndex].src;
		audio.play();
	})
	$('.shul').text(musics.length);
	


	// 暂停点击事件
	$('.zant').on('click',function(){
		if(audio.paused){
			if(currentIndex==undefined){
			currentIndex=0
		}
		audio.src=musics[currentIndex].src
		audio.play();

		}else{
			audio.pause();
		}
	})

	// 播放时，添加播放图片的类
	$audio.on('play',function(){
		$('.zant').addClass('bofang');
		$('.songlist').removeClass('bs').eq(currentIndex).addClass('bs');
		var huan=musics[currentIndex]
		$('.gequname').text(huan.name);
		$('.gequzuozhe').text(huan.zuozhe);
		$('.gequshichang').text(huan.shichang);
		/*setInterval(function(){
			$('.play-list img').addClass('active')

		},3000)*/
	})
	// 暂停时移除类
	$audio.on('pause',function(){
		$('.zant').removeClass('bofang')
	})
/*var t=setInterval(function(){
	$('.play-list img').addClass('active')
		.delay(800)
		.queue(function(){
			$(this).removeClass('active')
		});
},3000)*/


	// 音量
	$('.tiao').on('click',function(e){
		audio.volume=e.offsetX/$(this).width();
	})
	$(audio).on('volumechange',function(){
		if(audio.volume===0){
			$('.yinliang').addClass('closeyl')
		}else{
			$('.yinliang').removeClass('closeyl')
		}
		var w=audio.volume*$('.tiao').width();
		$('.tiao1').width(w);
		$('.qiuqiu').css({left:w});
	})
	$('.qiuqiu').on('click',function(e){
		e.stopPropagation()
	})
	$('.yinliang').on('click',function(){
		$('.yinliang').toggleClass('closeyl');
		if($('.yinliang').hasClass('closeyl')){
			$('.tiao').attr('zhi',audio.volume);
			audio.volume=0;
		}else{
			audio.volume=$('.tiao').attr('zhi');
		}
	})


	$('.qiuqiu').on('mousedown',function(e){
		e.stopPropagation()
		$(document).on('mousemove',function(e){
			$('.tiao1').addClass('tiao2');
			$('.qiuqiu').addClass('qiuqiu1')
			var l=e.pageX-$('.tiao').offset().left;
			var v=l/$('.tiao').width();
			v=(v>1)?1:v;
			v=(v<0)?0:v;
			audio.volume=v;
		})
	})


	$(document).on('mouseup',function(){
		$(this).off('mousemove');
		$('tiao1').removeClass('tiao2')
	})



// 进度条

	var audio=$('#audio').get(0);
	var $audio=$('#audio');
	$audio.on('timeupdate',function(){
		
		var w=(audio.currentTime/audio.duration)*$('.jindu').width();
		$('.jindu1').width(w);
		$('.jindudian').css({left:w});
	})	
	
	$('.jindu').on('click',function(e){

		audio.currentTime=e.offsetX/$(this).width()*audio.duration
		
	})
	$('.jindudian').on('click',function(e){
		e.stopPropagation();
	})
	$('.jindudian').on('mousemove',function(e){
		e.stopPropagation();
	})

	$('.jindudian').on('mousedown',function(){
		var left=$('.jindu').offset().left;
		$(document).on('mousemove',function(e){
			audio.currentTime=(e.pageX-left)/$('.jindu').width()*audio.duration
		})
	})
	$('.jindudian').on('mouseup',function(){
		$(document).off('mousemove')
	})

	$('.jindu').on('mousemove',function(e){
		$('.jindutishi').css({
			display:'block',
			left:e.offsetX-$('.jindutishi').width()/2
		})
		var time=e.offsetX/$(this).width()*audio.duration;
		var min=parseInt(time/60);
		var miao=parseInt(time%60);
		min=min<10?'0'+min:min;
		miao=miao<10?'0'+miao:miao;
		if(time!=e.offsetX/$(this).width()*audio.duration){
			$('.jindutishi').html('--:--');
		}else{
			$('.jindutishi').html(min+':'+miao);	
		}
		
	})
	
	$('.jindu').on('mouseout',function(){
		$('.jindutishi').css({
			display:'none'
		})
	})

	// 进度条结束

// 清空列表
	$('.navclearlist').on('click',function(){
		$('.gequliebiao').empty();
		$('.gequname').text('听我想听的歌');
		$('.gequzuozhe').text('QQ音乐');
		$('.zant').removeClass('bofang');
		audio.pause();
		$('.jindu1').width('0');
		$('.jindudian').css({
			left:'0'
		})
		$('.shul').text($('.gequliebiao').length-1)
	})

// 点击删除按键
	$('.shanc').on('click',function(){
		$(this).closest('ul').remove();
		musics.splice($(this).index,1);
		$('.shul').text(musics.length)
	})
// 歌曲结束自动切换下一首
	$audio.on('ended',function(){
		$('.xia').trigger('click');
	})


	// 循环播放
	$('.xunhuan').on('click',function(){
		$('.xunhuanbox').css('display','block')
	})

	$('.shunxu').on('click',function(e){
		e.stopPropagation();
		$('.xunhuan').addClass('xunhuansx')
		$('.xunhuanbox').css('display','none');
		$('.xunhuan').removeClass('xunhuanlb')

		
	})

	$('.suiji').on('click',function(e){

		e.stopPropagation();
		$('.xunhuan').addClass('xunhuansj');

		$('.xunhuanbox').css('display','none')
		$('.xunhuan').removeClass('xunhuansx')
		$audio.off('ended')
		var zhi=Math.floor(Math.random()*musics.length);
		audio.src=musics[zhi].src;
		audio.play();
		
	})
	$('.danqu').on('click',function(e){

		e.stopPropagation();
		$('.xunhuan').addClass('xunhuandq');

		$('.xunhuanbox').css('display','none')
		$('.xunhuan').removeClass('xunhuansj')
		// audio.src=
	})

	$('.liebiao').on('click',function(e){

		e.stopPropagation();
		$('.xunhuan').addClass('xunhuanlb');

		$('.xunhuanbox').css('display','none')
		$('.xunhuan').removeClass('xunhuandq')
		// audio.src=
	})







})



