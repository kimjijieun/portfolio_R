$(function () {


  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);


  // lenis
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0) //지연 완화 기능을 비활성화, 즉각반응
  lenis.scrollTo(0) //페이지 로드 시 스크롤 위치를 맨 위로 초기화
  lenis.stop();

  $(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const introTl = gsap.timeline();
  const mIntroTl = gsap.timeline();
  // gsap.set(".loding-page", { height: "100%" });
  // gsap.set('.loding-page .pan-box .pan', { yPercent: 0 });

  ScrollTrigger.matchMedia({
    "(max-width:767px)": function () {
      // introTl.revert();
      // mIntroTl.revert();
      lenis.stop();
      gsap.set(".loding-page", {
        height: "100%",
        zIndex: '9999'
      });
      gsap.set('.loding-page .pan-box .pan', {
        yPercent: -50
      });
      gsap.set(".m-logo-text, .info-txt, .intro-img", {
        clearProps: "all",
      });
      gsap.set(".m-logo-text .port", {
        opacity: 0,
        x: -10,
        y: -100,
      });
      gsap.set(".m-logo-text .folio", {
        opacity: 0,
        x: 10,
        y: 100,
      });
      // mIntroTl.clear()
      mIntroTl
        .addLabel('m_a')
        // .to(".m-logo-text",{
        //   opacity:1,
        // })
        .to(".m-logo-text .port", {
          opacity: 1,
          x: 0
        }, "m_a")
        .to(".m-logo-text .folio", {
          opacity: 1,
          x: 0
        }, "m_a")

        .addLabel('m_b')
        .to(".m-logo-text .port", {
          y: 0,
          duration: 1,
          ease: "expo.inOut",
        }, "m_b")
        .to(".loding-page .info-txt", {
          opacity: 0,
          duration: 1,
        }, "m_b")
        .to(".m-logo-text .folio", {
          y: 0,
          duration: 1,
          ease: "expo.inOut",
        }, "m_b")

        .addLabel('m_c')
        .to(".m-logo-text", {
          y: -200,
          duration: 1,
          ease: "expo.inOut",
        }, "m_c")

        .to(".loding-page", {
          height: "0%",
          zIndex: "9",
          duration: 1,
          ease: "expo.inOut",
          // onComplete: function () {
          //   lenis.start();
          //   ScrollTrigger.refresh(); //.다 끝나고 스크롤 시작
          // },
        }, "m_c")
        .to('.loding-page .pan-box .pan', {
          yPercent: -100
        }, 'm_c+=0.4')
        .to(".intro-img", {
          // duration: 1,
          opacity: 1,
          // transform: 'translateY(0%)'
          y: 0,
          onComplete: function () {
            lenis.start();
            ScrollTrigger.refresh(); //.다 끝나고 스크롤 시작
          },
        }, 'm_c+=0.7')
    },
    "(min-width:768px)": function () {
      gsap.set(".loding-page", {
        height: "100%",
        zIndex: '9999'
      });
      gsap.set('.loding-page .pan-box .pan', {
        yPercent: -50
      });
      lenis.stop();
      gsap.set(".logo-text, .logo-text .t, .logo-text .fo, .logo-text .lio, .info-txt, .intro-img", { clearProps: "all" });
      introTl.clear()
      introTl
        .addLabel('a')
        .to(".logo-text", {
          delay: 0.2,
          duration: 1,
          opacity: 1,
        })
        .to(".logo-text .t", {
          x: 0,
          duration: 1,
          ease: "expo.inOut",
        }, 'a')
        .to(".logo-text .fo", {
          x: 0,
          duration: 1,
          ease: "expo.inOut",
        }, 'a')

        .addLabel('b')
        .to(".logo-text .fo", {
          y: 0,
          duration: 1,
          // delay:0.5,
          ease: "expo.inOut",
        }, 'b')
        .to(".logo-text .lio", {
          y: 0,
          duration: 1,
          // delay:0.5,
          ease: "expo.inOut",
        }, 'b')
        .to(".info-txt", {
          opacity: 0
        }, 'b')

        .to(".loding-page", {
          height: "0%",
          // position: "relative",
          duration: 1,
          ease: "expo.inOut",
          zIndex: "9",
          // onComplete: function () {
          //   lenis.start(); //.loding-page가 끝나고 스크롤 시작
          // },
        }, 'b')
        .to('.loding-page .pan-box .pan', {
          yPercent: -100
        }, 'b+=0.4')
        .to(".intro-img", {
          // duration: 1,
          opacity: 1,
          // transform: 'translateY(0%)',
          y: 0,
          onComplete: function () {
            lenis.start();
            ScrollTrigger.refresh(); //.loding-page가 끝나고 스크롤 시작
          },
        }, 'b+=0.7')
    },
    revertOnResize: true
  });
  // portfolo 사라지기
  ScrollTrigger.matchMedia({
    "(max-width:767px)": function () {
      // gsap.set(".m-logo-text", { clearProps: "opacity" });
      gsap.to(".m-logo-text", {
        autoAlpha: 0,
        // duration: 1,
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "center top",
          scrub: 1,
          // markers:true,
          invalidateOnRefresh: true,
        },
      });
    },
    "(min-width:768px)": function () {
      // gsap.set(".logo-text", { clearProps: "all" });
      gsap.to(".logo-text", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "center top",
          scrub: 1,
          // markers:true,
          invalidateOnRefresh: true,
        },
      });

    },
  });

  // // 해당영역으로 이동
  $('.header .link-nav').click(function (e) {
    e.preventDefault();

    target = $(this).data('target')
    gsap.to(window, { duration: 1, scrollTo: target });

  });

//이미지 스크롤 고정
  const canvas = document.getElementById('screen');
  const context = canvas.getContext('2d');
  const img = new Image();
  const frameCount = 10; // 총 프레임 개수 (0~10)

  // 캔버스 크기를 부모 요소에 맞춤
  function resizeCanvas() {
    const parent = document.getElementById('img_sequence');
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }

  // 특정 프레임 불러오기
  function player(num) {
    img.src = `./asset/images/sequence/selfImg_frame${num}.png`;
  }

  // 이미지 로드되면 그리기
  img.addEventListener('load', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  });

  // GSAP ScrollTrigger
  gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-intro",
      start: "top top",
      end: "+=1000", 
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * frameCount);
        player(frameIndex);
      }
    }
  });

  // 초기 실행
  window.addEventListener('load', () => {
    resizeCanvas();
    player(0); // 첫 프레임
  });

  // 리사이즈 대응
  window.addEventListener('resize', resizeCanvas);




  // 첫 번째 애니메이션: .work-tit
  gsap.fromTo('.work-wrap .work-tit,.work-tit2, .work-wrap .work-desc', {
    y: 50,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    // scrub:1,
    scrollTrigger: {
      trigger: '.sc-about .work-wrap',
      start: '30% 70%',
      end: '60% top',
      toggleActions: 'play none none reverse',
      // markers: true,
    },
  });




  // 라인
  gsap.utils.toArray(".sc-title .line").forEach((item) => {
    gsap.to(item, {
      height: "100%",
      ease: "none",
      duration: 5,

      scrollTrigger: {
        trigger: item,
        start: "0% 70%",
        end: "0% 70%",
        scrub: 1,
        // markers: true,
      },
    });
  });


  //Text split
  const targets = gsap.utils.toArray(".sc-title .t-title");

  targets.forEach(target => {
    let SplitClient = new SplitType(target, { type: "lines, words, chars" }); //줄, 단어, 문자 단위로 분할
    let lines = SplitClient.lines;
    let words = SplitClient.words;
    let chars = SplitClient.chars;

    gsap.from(chars, {
      yPercent: 100, // 문자가 아래에서 위로
      autoAlpha: 0, // 점차 나타나게
      duration: 1, // 애니메이션 1초동안
      ease: "circ.out", // 곡선 형태로 부드럽게 조정
      stagger: {
        amount: 1,
        // from: "random"
      },
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        end: "+=400",
        // markers: true,
        scrub: 1,
      }
    });
  });


  /* work 슬라이드 */
  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function () {
      gsap.utils.toArray(".m-project-area .item-box .item, .project-list .item-box .item").forEach((item) => {
        gsap.set(item, {
          scale: 1.2,
          yPercent: -5,
        });

        gsap.to(item, {
          scale: 1,
          yPercent: 0,
          scrollTrigger: {
            //상위 요소에 따라 애니메이션을 조정해야 할 때.
            trigger: item.closest(".item-box"),
            start: "0% center",
            end: "100% 30%",
            // markers: true,
            scrub: 1,
          },
        });
      });

      gsap.utils.toArray(".mItem .p-title").forEach((mTitle) => {
        gsap.set(mTitle, {
          x: 30,
          opacity: 0,
        });

        gsap.to(mTitle, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: mTitle.closest(".mItem .p-title"),
            start: "top 80%",
            end: "top 80%",
            // markers: true,
            // scrub: 1,
            toggleActions: "play none none reverse",
            onLeaveBack: () => {
              gsap.to(mTitle, {
                x: 30,
                opacity: 0,
                duration: 0.5,
              });
            },
          },
        });
      });
    },

    "(min-width:1024px)": function () {
      slideImg = gsap.timeline({
        scrollTrigger: {
          trigger: ".sc-project .common-inner",
          start: "0% 0%",
          end: "100% 100%",
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      slideImg

        .addLabel('a')
        .fromTo(
          ".sc-project .project-wrap .project-item:nth-child(1)",
          { height: "100%", filter: "blur(0px) brightness(1)" }, // 초기값
          { height: "30%", filter: "blur(2px) brightness(0.65)", duration: 0.5, ease: "power1.inOut" },
          'a'
        )
        .to(".sc-project .project-wrap .project-item:nth-child(1)", {
          filter: "blur(2px) brightness(0.65)",
          ease: "linear",
          duration: 0.5,
        }, 'a+=0.3')
        .to(".sc-project .project-wrap .project-item:nth-child(1)", {
          height: 0,
          filter: "blur(2px) brightness(0.65)",
          ease: "linear",
          duration: 0.5,
        }, 'a+=0.4')
        .to(".sc-project .title-list .title-item", { yPercent: -100 }, 'a+=0.5')

        .addLabel('b')
        .fromTo(
          ".sc-project .project-wrap .project-item:nth-child(2)",
          { height: "100%", filter: "blur(0px) brightness(1)" }, // 초기값
          { height: "30%", filter: "blur(2px) brightness(0.65)", duration: 0.5, ease: "power1.inOut" },
          'b'
        )
        .to(".sc-project .project-wrap .project-item:nth-child(2)", {
          filter: "blur(2px) brightness(0.65)",
          ease: "linear",
          duration: 0.5,
        }, 'b+=0.3')
        .to(".sc-project .project-wrap .project-item:nth-child(2)", {
          height: 0,
          filter: "blur(2px) brightness(0.65)",
          ease: "linear",
          duration: 0.5,
        }, 'b+=0.4')
        .to(".sc-project .title-list .title-item", { yPercent: -200 }, 'b+=0.5')

        .addLabel('c')
        .fromTo(
          ".sc-project .project-wrap .project-item:nth-child(3)",
          { height: "100%", filter: "blur(0px) brightness(1)" }, // 초기값
          { height: "30%", filter: "blur(2px) brightness(0.65)", duration: 0.5, ease: "power1.inOut" },
          'c'
        )
        .to(".sc-project .project-wrap .project-item:nth-child(3)", {
          filter: "blur(2px) brightness(0.65)",
          ease: "linear",
          duration: 0.5,
        }, 'c+=0.3')
        .to(".sc-project .project-wrap .project-item:nth-child(3)", {
          height: 0,
          filter: "blur(2px) brightness(0.65)",
          ease: "linear",
          duration: 0.5,
        }, 'c+=0.4')
        .to(".sc-project .title-list .title-item", { yPercent: -300 }, 'c+=0.5')

    }
  });




  // 헤더 스크롤
  ScrollTrigger.matchMedia({
    "(max-width:1023px)": function () {
      // 비활성화
      $(window).off("scroll.headerFade");
    },
    "(min-width:1024px)": function () {

      let lastScroll = 0;
      let isInProjectArea = false; // project-area에 들어갔는지 여부를 추적

      $(window).on("scroll.headerFade", function () {
        const curr = $(this).scrollTop();
        const projectAreaOffset = $(".project-area").offset().top;
        const projectAreaHeight = $(".project-area").outerHeight();
        const projectAreaEnd = projectAreaOffset + projectAreaHeight; // .project-area의 하단 위치

        if (curr >= projectAreaOffset && curr <= projectAreaEnd) {
          if (!isInProjectArea) {
            $(".header").fadeOut();
            isInProjectArea = true; // .project-area 내부로 상태 갱신
          }
        } else {
          if (isInProjectArea) {
            $(".header").fadeIn();
            isInProjectArea = false;
          }
        }
        lastScroll = curr;
      });
    }
  })



  const menuTl = gsap.timeline({
    paused: true,
    invalidateOnRefresh: true,
  });

  // menuTl.clear();
  menuTl
    .to('.menu-wrap .pan-box .pan', {
      yPercent: '68'
    }, 'q')
    .to('.menu-wrap', { yPercent: '100' }, 'q')
    .to('.menu-wrap .menu-item a', { translateY: 0, stagger: 0.1, duration: 0.2, delay: 0.1, opacity: 1 })
    .to('.menu-wrap .social-list .social-item', { y: '0', delay: 0.1 })
  // .to('.menu-wrap .pan-box .pan',{
  //     yPercent:'100'
  //   },'+=0.4');

  $('.btn-menu').click(function () {
    $('.btn-menu').toggleClass('active');
    // $('body').toggleClass('hidden')

    if ($(this).hasClass('active')) {
      lenis.stop();

      $('body').addClass('hidden')
      menuTl.play()
    } else {
      lenis.start();
      $('body').removeClass('hidden')
      menuTl.reverse()
    }
  })

  $('.menu-wrap .menu-item a').click(function () {
    $('.btn-menu').removeClass('on, active')
    $('body').removeClass('hidden')
    menuTl.reverse()
    lenis.start();
  })

  // 메뉴 이동
  $('.nav-area a').click(function (e) {
    e.preventDefault();
    $('html,body').scrollTop($($(this).attr('href')).offset().top)
    // gsap.to(window, {
    //   duration: 1,
    //   scrollTo: $($(this).attr('href')).offset().top
    // });
  })

  $('.btn-contact').click(function () {
    $('html,body').scrollTop($(document).height());
    // gsap.to(window, {duration: 1, scrollTo:$(document).height()});
  })


  var previousWidth = $(window).width();
  var previousHeight = $(window).height();
  let workHeight = $('.sc-about').outerHeight(); // 초기 높이 설정

  function handlePCMouseEvents() {
    $('.btn, .btn-txt').off('mousemove mouseleave');

    if ($(window).width() > 768) {
      $('.btn, .btn-txt ').on('mousemove', function (e) {
        var x = ((-$(this).width() / 2) + e.offsetX) * 0.4;
        var y = ((-$(this).height() / 2) + e.offsetY) * 0.4;

        gsap.to($(this), 1.5, {
          x: x,
          y: y,
          ease: "elastic.out",
        });
      });

      $('.btn, .btn-txt ').on('mouseleave', function () {
        gsap.to($(this), 1.5, {
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.1)",
        });
      });
    }
  }
  // 페이지 로드 시점에 한 번 실행
  // PC 환경일 경우 마우스 이벤트 리스너를 초기 등록합니다.
  $(document).ready(function () {
    handlePCMouseEvents();
  });


  // 창 크기 변화 감지 이벤트
  $(window).resize(function () {
    // 현재 창 크기
    var currentWidth = $(window).width();
    var currentHeight = $(window).height();
    workHeight = $('.sc-about').outerHeight();

    if (currentWidth !== previousWidth || currentHeight !== previousHeight) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);

      // 이전 크기 업데이트
      previousWidth = currentWidth;
      previousHeight = currentHeight;
    }

    handlePCMouseEvents();
  });

  $(window).on('scroll', function () {
    curr = $(this).scrollTop();

    if (curr > workHeight) {
      gsap.to('.btn-menu', {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      $('.header .logo-wrap').addClass('on');
    } else {
      gsap.to('.btn-menu', {
        scale: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      $('.header .logo-wrap').removeClass('on');
    }
  })

  // 호버이벤트
  $(document).mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    xVal = e.clientX;
    yVal = e.clientY;
    gsap.to(".cursor", {
      x: xVal,
      y: yVal,
      stagger: 0.1,
    });
  });

  $(".project-area .project-item .con-img-box,.project-area .video-box").hover(
    function () {
      $(".cursor").addClass("on");
    },
    function () {
      $(".cursor").removeClass("on");
    }
  );

  // 푸터 스크롤
  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function () {
      let panTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: "top 70%",
          end: "60% 70%",
          scrub: 1,
        },
      });

      panTl
        .addLabel('s')
        .to('.sc-ing .pan-box .pan', {
          // height: '100%',
          yPercent:-20,
          height:0,
        }, 's')
        // .fromTo('.footer .common-inner', {
        //   yPercent: -10,
        // }, { yPercent: 0 },
        //   's+=0.5')

    },
    "(min-width: 768px)": function () {

      let panTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: "top 70%",
          end: "60% 70%",
          scrub: 1,
        },
      });

      panTl
        .addLabel('m_s')
        .to('.sc-ing .pan-box .pan', {
          // yPercent:-20,
          height: '100%',
        }, 'm_s')
        // .fromTo('.footer .common-inner', {
        //   yPercent: -10,
        // }, { yPercent: 0 },
        //   'm_s+=0.5')

    }
  });


});