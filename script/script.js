(function () {
    let controller = new ScrollMagic.Controller();

    // build Points and Line---------------------------------
    var point_tween = new TimelineMax()
        //Show points and line
        .add(TweenMax.to(".section-ou .anim-point-1", 0.3, { height: "30px", width: "30px", delay: 0.3, opacity: 1}))
        .add(TweenMax.to(".section-ou .line", 0.8, { css: { opacity: 0.3 }, delay: 0.1 }));

    // build scene
    var scene = new ScrollMagic.Scene({ triggerElement: "#trigger1", reverse: false })
        .setTween(point_tween)
        .addIndicators()
        .addTo(controller);

    // build tween operating systems---------------------------------
    var os_tween = new TimelineMax()
        //Show Text and Icons
        .add(TweenMax.to(".section-ou .anim-windows", 0.30, { css: { opacity: 1 }, delay: 0.1 }))
        .add(TweenMax.to(".section-ou .anim-apple", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
        .add(TweenMax.to(".section-ou .anim-android", 0.20, { css: { opacity: 1 }, delay: 0.1 }))
        .add(TweenMax.to(".section-ou .anim-point-2", 0.3, { css:{opacity: 1, height: "15px", width: "15px"}, delay: 0.3 }));

    // build scene
    var scene  = new ScrollMagic.Scene({ triggerElement: "#trigger2", reverse: false })
        .setTween(os_tween)
        .addIndicators()
        .addTo(controller);



    // show indicators (requires debug extension)
    scene.addIndicators();



})();