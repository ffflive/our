function hello(){
    $('.yo .left').attr('id','left');
    $('.yo .right').attr('id','right');
    setTimeout(function(){
        $('.yo').attr('id','yo')
    },2000)
    setTimeout(function(){
        $('.yo').hide()
    },4000)
}

$.fn.scrollUnique = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        // 火狐是DOMMouseScroll事件
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0? 0: scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }
        });
    });
};
//从张鑫旭那里偷来的 子元素滚动窗口不滚动



function Yo(){
    var a = localStorage.getItem('yo');
    if(a){
        $('.yo').hide()
    }else{
        hello()
        localStorage.setItem('yo','true')
    }
}

//滚动事件问题

var bolg;
var oldresize = 0;
var con = [];
$(window).resize(function(){
    bolgH()
    console.log(con[oldresize].top)
    for(var i = 0;i<$('.left>div').length;i++){
        if(this.scrollTop+1>i*bolg){
            addAndRemoveClass('.nav>li','fouse navline',$('.nav>li').eq(i))
        }
    }
})
//监听窗口变化

function bolgH(){
    bolg = $('section>.left')[0].clientHeight;
    for(var i =0;i<$('.nav>li').length;i++){
        con[i] = new Object();
        con[i].top = bolg *i;
        con[i].bottom = bolg * (i+1);
    }
    console.log( $('section>.left')[0].clientHeight)
}
//更改滚动数据

$('section>.left').scroll(function(){
    for(var i = 0;i<$('.left>div').length;i++){
        if(this.scrollTop+1>=con[i].top){
            addAndRemoveClass('.nav>li','fouse navline',$('.nav>li').eq(i))
        }
    }
    oldresize=$('.fouse').index()
})

function conScroll(i){
    if($('.left').scrollTop()-1<con[i].bottom){
        $('.left').animate({
            scrollTop : con[i].top
        },700)
    }
}
//点击导航滚动。滚动后判断top和bottm判断在那个页面，运行addAndRemoveClass；
//监听滚动。传入下标决定到那个页面。下标定死,再触发滚动。
//建立数组，在每次浏览器大小变化的时候重新写入数据。 ok