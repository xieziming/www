q = jQuery,
ea = jQuery,
z = navigator.appVersion.toLowerCase(),
z = z.indexOf("msie") > -1 ? parseInt(z.replace(/.*msie[ ]/, "").match(/^[0-9]+/)) : 0,
N = z != 0;
window.ziming_mouse = {
    canvas: null,
    ball: [],
    ballImageResource: [],
    subBall: [],
    subBallImageResource: [],
    actionCount: [],
    timerId: null,
    waitCnt: 0,
    curBallIdx: 0,
    mouseX: 0,
    mouseY: 0,
    init: function() {
        for (i = 0; i < 1; i++) {
            var j = "http://ziming.org/wp-content/themes/ziming/js/img/ball" + (i + 1) + ".png";
            ziming_mouse.ballImageResource[i] = new Image;
            ziming_mouse.ballImageResource[i].src = j
        }
        for (i = 0; i < 8; i++){
        	 	j = "http://ziming.org/wp-content/themes/ziming/js/img/subball" + (i + 1) + ".png";
        		ziming_mouse.subBallImageResource[i] = new Image;
        		ziming_mouse.subBallImageResource[i].src = j;
        }
        for (i = 0; i < 20; i++) {
            ziming_mouse.ball[i] = q("<div />", {
                id: "ziming_mouse_ball_" + i,
                no: i,
                css: {
                    position: "absolute",
                    visibility: "hidden",
                    zIndex: "10000"
                },
                html: "",
                click: function() {}
            }).appendTo("body");
            ziming_mouse.subBall[i] = [];
            for (n = 0; n < 3; n++) ziming_mouse.subBall[i][n] = q("<div />", {
                id: "ziming_mouse_subball_" + i + "_" + n,
                no: i,
                subno: n,
                css: {
                    position: "absolute",
                    visibility: "hidden",
                    zIndex: "10000"
                },
                html: "",
                click: function() {}
            }).appendTo("body");
            ziming_mouse.actionCount[i] = 0
        }
        q("html").mousemove(function(j) {        		
            ziming_mouse.mouseX = j.pageX;
            ziming_mouse.mouseY = j.pageY;
            if (ziming_mouse.waitCnt == 0 && ziming_mouse.actionCount[ziming_mouse.curBallIdx] == 0) ziming_mouse.waitCnt = 2,
            ziming_mouse.actionCount[ziming_mouse.curBallIdx] = 1,
            ziming_mouse.curBallIdx = ziming_mouse.curBallIdx == 19 ? 0 : ziming_mouse.curBallIdx + 1
        });
        timerId = setInterval("ziming_mouse.action()", 100)
    },
    action: function() {    		
        for (i = 0; i < 20; i++) switch (ziming_mouse.actionCount[i]) {
        case 1:
            var j = ziming_mouse.ballImageResource[ziming_mouse.getRandomNum(1)];
            ziming_mouse.ball[i].css({
                background: "url(" + j.src + ") no-repeat",
                height: j.height,
                width: j.width
            });
            ziming_mouse.move(ziming_mouse.ball[i], {
                top: ziming_mouse.mouseY + 10,
                left: ziming_mouse.mouseX + 10
            });
            ziming_mouse.animateY(ziming_mouse.ball[i], ziming_mouse.mouseY, 100, "swing",
            function() {
                ziming_mouse.actionCount[q(this).attr("no")] = 2
            });
            ziming_mouse.setVisible(ziming_mouse.ball[i]);
            ziming_mouse.actionCount[i] = 0;
            break;
        case 2:
            ziming_mouse.setHidden(ziming_mouse.ball[i]);
            var l = ziming_mouse.ball[i].position();
            for (n = 0; n < 3; n++) ziming_mouse.move(ziming_mouse.subBall[i][n], l),
            ziming_mouse.animateRandomXY(ziming_mouse.subBall[i][n], l.left - 30, l.left + 30, l.top, l.top + 30, 200, "swing",
            function() {
                q(this).attr("subno") == 2 && (ziming_mouse.actionCount[q(this).attr("no")] = 3)
            }),
            j = ziming_mouse.subBallImageResource[ziming_mouse.getRandomNum(8)],
            ziming_mouse.subBall[i][n].css({
                background: "url(" + j.src + ") no-repeat",
                height: j.height,
                width: j.width
            }),
            N || ziming_mouse.setOpacity(ziming_mouse.subBall[i][n], 1),
            ziming_mouse.setVisible(ziming_mouse.subBall[i][n]);
            ziming_mouse.actionCount[i] = 0;
            break;
        case 3:
            for (n = 0; n < 3; n++) l = ziming_mouse.subBall[i][n].position(),
            N ? ziming_mouse.animateRandomXY(ziming_mouse.subBall[i][n], l.left, l.left, l.top + 10, l.top + 50, 1E3, "linear",
            function() {
                q(this).attr("subno") == 2 && (ziming_mouse.actionCount[q(this).attr("no")] = 4)
            }) : ziming_mouse.animateRandomXYFadeout(ziming_mouse.subBall[i][n], l.left, l.left, l.top + 10, l.top + 50, 1E3, "linear",
            function() {
                q(this).attr("subno") == 2 && (ziming_mouse.actionCount[q(this).attr("no")] = 4)
            });
            ziming_mouse.actionCount[i] = 0;
            break;
        case 4:
            for (n = 0; n < 3; n++) ziming_mouse.setHidden(ziming_mouse.subBall[i][n]);
            ziming_mouse.actionCount[i] = 0
        }
        ziming_mouse.waitCnt > 0 && ziming_mouse.waitCnt--
    },
    debug: function(j) {
        navigator.appName.indexOf("Microsoft") != -1 ? document.getElementById("debugArea").innerHTML += j + "<br />": console.log(j)
    },
    getRandomNum: function(j) {
        return Math.floor(Math.random() * j)
    },
    getDocumentHeight: function() {
        return q(document).height()
    },
    getDocumentWidth: function() {
        return q(document).width()
    },
    getViewTop: function() {
        return q(window).scrollTop()
    },
    getViewLeft: function() {
        return q(window).scrollLeft()
    },
    getViewHeight: function() {
        return q(window).height()
    },
    getViewWidth: function() {
        return q(window).width()
    },
    getViewBottom: function() {
        return ziming_mouse.getViewTop() + ziming_mouse.getViewHeight()
    },
    getViewRight: function() {
        return ziming_mouse.getViewLeft() + ziming_mouse.getViewWidth()
    },
    move: function(j, l) {
        j.css({
            top: l.top,
            left: l.left
        })
    },
    moveViewTop: function(j) {
        j.css({
            top: ziming_mouse.getViewTop()
        })
    },
    moveViewBottom: function(j) {
        j.css({
            top: ziming_mouse.getViewBottom() - j.outerHeight()
        })
    },
    moveViewLeft: function(j) {
        j.css({
            left: ziming_mouse.getViewLeft()
        })
    },
    moveViewRight: function(j) {
        j.css({
            left: ziming_mouse.getViewRight() - j.outerWidth()
        })
    },
    moveViewTopLeft: function(j) {
        ziming_mouse.moveViewTop(j);
        ziming_mouse.moveViewLeft(j)
    },
    moveViewTopRight: function(j) {
        ziming_mouse.moveViewTop(j);
        ziming_mouse.moveViewRight(j)
    },
    moveViewBottomLeft: function(j) {
        ziming_mouse.moveViewBottom(j);
        ziming_mouse.moveViewLeft(j)
    },
    moveViewBottomRight: function(j) {
        ziming_mouse.moveViewBottom(j);
        ziming_mouse.moveViewRight(j)
    },
    moveRandomTop: function(j) {
        j.css({
            top: ziming_mouse.getViewTop() + ziming_mouse.getRandomNum(ziming_mouse.getViewHeight() - j.outerHeight())
        })
    },
    moveRandomLeft: function(j) {
        j.css({
            left: ziming_mouse.getViewLeft() + ziming_mouse.getRandomNum(ziming_mouse.getViewWidth() - j.outerWidth() - 100)
        })
    },
    animateY: function(j, l, q, r, u) {
        j.animate({
            top: l
        },
        q, r, u)
    },
    animateRandomY: function(j, l, q, r, u, w) {
        ziming_mouse.animateY(j, l + ziming_mouse.getRandomNum(q - l), r, u, w)
    },
    animateX: function(j, l, q, r, u) {
        j.animate({
            left: l
        },
        q, r, u)
    },
    animateRandomX: function(j, l, q, r, u, w) {
        ziming_mouse.animateX(j, l + ziming_mouse.getRandomNum(q - l), r, u, w)
    },
    animateXY: function(j, l, q, r, u, w) {
        j.animate({
            top: q,
            left: l
        },
        r, u, w)
    },
    animateRandomXY: function(j, l, q, r, u, w, z, N) {
        ziming_mouse.animateXY(j, l + ziming_mouse.getRandomNum(q - l), r + ziming_mouse.getRandomNum(u - r), w, z, N)
    },
    animateXYFadeout: function(j, l, q, r, u, w) {
        j.animate({
            top: q,
            left: l,
            opacity: "0"
        },
        r, u, w)
    },
    animateRandomXYFadeout: function(j, l, q, r, u, w, z, N) {
        ziming_mouse.animateXYFadeout(j, l + ziming_mouse.getRandomNum(q - l), r + ziming_mouse.getRandomNum(u - r), w, z, N)
    },
    setOpacity: function(j, l) {
        j.css({
            opacity: l
        })
    },
    setHidden: function(j) {
        j.css({
            visibility: "hidden"
        })
    },
    setVisible: function(j) {
        j.css({
            visibility: "visible"
        })
    }
};
jQuery(document).ready(function() {
    ziming_mouse.init();
});