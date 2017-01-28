function pathPrepare($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
}

let controller = new ScrollMagic.Controller();

// build Points and Line---------------------------------
var point_tween = new TimelineMax()
    //Show points and line
    .add(TweenMax.to(".section-ou .anim-point-1", 0.3, { height: "30px", width: "30px", delay: 0.3, opacity: 1 }))
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
    .add(TweenMax.to(".section-ou .anim-point-2", 0.3, { css: { opacity: 1, height: "15px", width: "15px" }, delay: 0.3 }));

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: "#trigger-platform", reverse: false })
    .setTween(os_tween)
    .addIndicators()
    .addTo(controller);

// SVG ANIMATION
var $box = $("path#Box");
var $mouse_cable = $("path#cable_1");

// LOAD MOUSE

// prepare SVG
pathPrepare($box);
pathPrepare($mouse_cable);
var comment_utiliser = new TimelineMax()
    .add(TweenMax.to($box, 0.9, { strokeDashoffset: 0, ease: Linear.easeNone }))
    .add(TweenMax.to("#ctrl", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#plus", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to($mouse_cable, 0.9, { strokeDashoffset: 0, ease: Linear.easeNone }))
    .add(TweenMax.to("#souris", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#souris-haut", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#click_gauche_1", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#info-txt", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#reset-svg", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#reset-text", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#return-svg", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .add(TweenMax.to("#return-text", 0.25, { css: { opacity: 1 }, delay: 0.1 }))
    .addCallback(function(){reset()}, 8); // REMOVE FAKE LOADING 
    




var scene = new ScrollMagic.Scene({ triggerElement: '#trigger-comment-utiliser', reverse: false })
    .setTween(comment_utiliser)
    .addIndicators()
    .addTo(controller);



// show indicators (requires debug extension)
scene.addIndicators();