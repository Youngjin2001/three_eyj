$(document).ready(function(){
    // let win = $(window).width();
    // if(win < 800){
    //     mobile()
    // }else if(win >= 800 && win < 1280){
    //     tap()
    // }else if(win >= 1280){
    //     pc()
    // }

    // function mobile(){
    // }// mobile
    $(".nav li").on('click',function(){
        let i = $(this).index();
        let distance = $("section").children("article").eq(i+1).offset().top;
        $("html,body").stop().animate({"scrollTop" : distance})
    })//nav

    $(window).on("scroll",function(){
        // 섹션의 높이 값
        let ht = $(window).height();
        // 스크롤의 거리
        let scr = $(window).scrollTop();
        for(var i = (0+1); i<5; i++){
            if(scr>=ht*i && scr<ht*(i+1)){
                $(".nav li").removeClass()
                $(".nav li").eq(i-1).addClass("on")
            }
        }
    })// 스크롤

    $('.cli1 li').on("click",function(){
        let a = $(this).index();
        console.log(a)
        $(".mb_rela").children(".abso").eq(a).show()
        .siblings().hide();

        $(this).addClass("on")
        $(this).siblings().removeClass()

    })// click

    $('.cli2 li').on("click",function(){
        let b = $(this).index();
        console.log(b)
        $(".lanking").children(".lank_none").eq(b).show()
        .siblings().hide();

        $(this).addClass("on")
        $(this).siblings().removeClass()

    })// click


    $("article").on("mousewheel",function(e,d){
        if(d<0){
            // 마우스 휠 내릴 때
            let nxt = $(this).next().offset().top;
            $("html,body").stop().animate({"scrollTop":nxt})
        }else if(d>0){
            // 마우스 휠 올릴 때
            let pre = $(this).prev().offset().top;
            $("html,body").stop().animate({"scrollTop":pre})
        }
    })

    $(document).on('scroll',function(){
        let a = $(window).scrollTop()
        if(a > 300){
            $(".nav").removeClass("active");
            $(".nav").addClass("deactive");
        
        }else{
            $(".nav").removeClass("deactive");
            $(".nav").addClass("active");
        }

    })

    var tl = gsap.timeline();
    tl.from(".img",{x:300,y:-450,duration:2,opacity:0})
    tl.from(".text",{x:-300,duration:2,opacity:0})

    $('.mb_con').slick({
        //화살표 이미지 변경
        //html구조 만들기
        //원하는 모양대로 css 잡기
        //css 선택자 설정하기
        'nextArrow' : '#ctrl .next',
        'prevArrow' : '#ctrl .prev',
        // 'dots' : true,//페이저 버튼
        'autoplay' : true,
        'autoplaySpeed' : 2000,
        slidesToShow : 1,

        responsive: [ // 반응형 웹 구현 옵션
                {  
                    breakpoint: 2000, //화면 사이즈
                    settings: {
                        //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                        slidesToShow:3
                    } 
                },
                { 
                    breakpoint: 799, //화면 사이즈
                    settings: {	
                        //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                        slidesToShow:1 
                    } 
                }
            ]
    });


})