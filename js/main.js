$(function(){
    let popupFrom = null;

    $('header p a').click(function(e){
        e.preventDefault();
    
        $('header nav ul li').removeClass('on');
    
        $scroll.stop().animate({
            scrollTop: 0
        }, 400);
    });




    $('header ul li').click(function(){
        $('header ul li').removeClass('on')
        $(this).addClass('on')

        let idx = $(this).index()

        let sd = $('main section').eq(idx).offset().top-114
        $('html,body').animate({
            scrollTop : sd
        })
    })

    $(window).scroll(function(){
        $('main section').each(function(){
            if($(this).offset().top <= $(window).scrollTop()+ 114){
                let idx = $(this).index()
                $('header ul li').removeClass('on')
                $('header ul li').eq(idx).addClass('on')
            }
        })
    })





    $('.gallery-collection li').click(function(){

        popupFrom = 'gallery'

        const title = $(this).find('h3').text()
        const text = $(this).find('p').text()
    
        const video = $(this).find('video')
        const dataImg = $(this).data('img')
    
        $('.popup h2').text(title)
        $('.popup p').text(text)
    
        if(video.length > 0){
            const videolink = video.attr('src')
    
            $('.popup video').attr('src', videolink).show()
            $('.popup img').hide()
    
            $('.popup video')[0].play()
        } else {
            // 👉 data-img 우선 사용
            const imglink = dataImg ? dataImg : $(this).find('img').attr('src')
    
            $('.popup img').attr('src', imglink).show()
            $('.popup video').hide()
        }
    
        $('.popup').addClass('on')
    })

    $('.popup button').click(function(){

        $('.popup').removeClass('on')
    
        const video = $('.popup video')[0]
        if(video){
            video.pause()
            video.currentTime = 0
        }
    
        // 핵심 추가
        if(popupFrom === 'list'){
            $('.project-list').addClass('on')
            $('body').addClass('no-scroll')
        }
    })

    // 포폴 리스트 팝업 
    $('.mor').click(function(){
        const $list = $('.project-list')

        $list.addClass('on')
        $('body').addClass('no-scroll')

        setTimeout(function(){
            $list.scrollTop(0)
        },10)
    })
    $('.arrow-left').click(function(){
        
        const $list = $('.project-list')

        $list.removeClass('on')
        $('body').removeClass('no-scroll')

        $list.one('transitionend', function(){
            $list.scrollTop(0)
        })
    })

    //프로젝트 리스트
    let isListScrolling = false;
    const $list = $('.project-list');

    $('.project-list .header nav ul li').click(function(e){
        e.preventDefault();

        isListScrolling = true;

        $list.find('li').removeClass('on')
        $(this).addClass('on')

        let idx = $(this).index()

        let sd = $list.find('.main').eq(idx).position().top + $list.scrollTop()

        $list.stop().animate({
            scrollTop: sd
        }, 100, function(){
            isListScrolling = false;
        })
    })

    $('.project-list .list-box').click(function(){

        popupFrom = 'list'

    
        const title = $(this).find('h5').text()
        const text = $(this).find('p').text()
    
        const dataImg = $(this).data('img')
        const img = dataImg ? dataImg : $(this).find('img').attr('src')
        
        $('.popup h2').text(title)
        $('.popup p').text(text)
    
        $('.popup img').attr('src', img).css('display','block')
        $('.popup video').css('display','none')
    
        // 리스트 닫기
        $list.removeClass('on')
        $('body').removeClass('no-scroll')
    
        $('.popup').addClass('on')
    })

    $list.scroll(function(){

        if(isListScrolling) return;

        let scrollTop = $list.scrollTop()
        let winH = $list.height()

        $list.find('.main').each(function(index){
            let sectionTop = this.offsetTop

            if(scrollTop + winH/2 >= sectionTop){
                $list.find('.header nav ul li').removeClass('on')
                $list.find('.header nav ul li').eq(index).addClass('on')
            }
        })
    })

// 반응형 

$('.headerbutton').click(function(){
    $('.tg').slideToggle()
})
    
})