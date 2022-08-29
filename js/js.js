var web_style = $("#web_style").val();
var valine_appid = $("#valine_appid").val();
var valine_appKey = $("#valine_appKey").val();

new Valine({
    el: '#vcomments',
    appId: valine_appid,
    appKey: valine_appKey,
    placeholder: '请输入内容...',
    avatar: "wavatar"
})

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
    });
});

function setCookie(key, value) {
    localStorage.setItem(key, value);
}

function getCookie(key) {
    var data = localStorage.getItem(key);
    return data
}

function updateStyle() {
    if (getCookie("style") == "white") {
        $("#footer").attr("style", "color: #51525d;");
        $(".flink").attr("style", "color: #51525d;");
        $(".ba").attr("style", "color: #51525d;");
        $("#bodyx").attr("class", "bg_while");
        $("#update_style").attr('checked', false);

    } else {
        $("#footer").attr("style", "");
        $(".flink").attr("style", "");
        $("#bodyx").attr("class", "");
        $(".ba").attr("style", "");
        $("#update_style").attr('checked', true);
    }
    $(".giscus").show()
}

if (getCookie("style") == null) {
    setCookie("style", web_style)
    updateStyle();
} else if (getCookie("style") == "white") {
    setCookie("style", "white")
    updateStyle();
} else if (getCookie("style") == "black") {
    setCookie("style", "black")
    updateStyle();
}

$("#update_style").change(function() {
    var style = $("#update_style").is(':checked');
    if (style) {
        setCookie("style", "black")
        updateStyle();
    } else {
        setCookie("style", "white")
        updateStyle();
    }
});

// toc
function scrollSpy(menuSelector, options) {
    var menu = $(menuSelector);
    // if(!visible(menu))
    //     return;
    options = options || {};
    var offset = options.offset || 0;
    var activeClassName = options.activeClassName || "active";

    var scollTarget = menu.find("a").map(function() {
        var item = $($(this).attr("href"));
        if (item.length)
            return item[0]; // avoid becoming 2-dim jquery array
    }), lastId = null, active = $();

    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + offset;

        // Get id of current scroll item
        var id = scollTarget.filter(function() {
            return $(this).offset().top < fromTop;
        }).last().attr("id") || "";

        if (lastId !== id) {
            active.removeClass(activeClassName);
            var newActive = [];

            for(var target = menu.find("[href='#" + id + "']");
                target.length && !target.is(menu);
                target = target.parent()) {
                if(target.is("li"))
                    newActive.push(target[0]);
            }
            active = $(newActive).addClass(activeClassName).trigger("scrollspy");
            lastId = id;
        }
    });
}
$(document).ready(function(){
    var tocContainer = $("#toc");
    var toc = tocContainer.children(), tocHeight = toc.height();
    scrollSpy(tocContainer, {offset: 200});

    $(".toc-item").on("scrollspy", function() {
        var tocTop = toc.scrollTop(),
            link = $(this).children(".toc-link"),
            thisTop = link.position().top;
        // make sure the highlighted element contains no child
        if($(this).height() != link.height())
            return;
        // if the highlighted element is above current view of toc
        if(thisTop <= 0)
            toc.scrollTop(tocTop + thisTop);
        // else if below current view of toc
        else if(tocHeight <= thisTop)
            toc.scrollTop(tocTop + thisTop + link.outerHeight() - tocHeight);
    });


});

// // 页面导航加载
// var anchorMap = {}
// var anchorArray = []
// window.onload=function () {
//     // 滚动加载
//     for (let mao of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
//         anchorMap[mao.offsetTop] = '#' + mao.getAttribute("id")
//         anchorArray.push(mao.offsetTop)
//     }
// }
// function findLeft(num) {
//     let left = 0
//     let right = anchorArray.length - 1
//     let flag = false
//     if (right - left > 0) {
//         flag = true
//     }
//     while (left < right) {
//         let mid = left + Math.ceil((right - left) >> 1)
//
//         if (num >= anchorArray[mid]) {
//             left = mid + 1
//         } else {
//             right = mid
//         }
//     }
//     // console.log(left, anchorArray[left], flag)
//     if (flag) {
//         return anchorArray[left]
//     }
//     return -1
// }
// window.addEventListener('scroll', function(event) {
//     let top = Math.floor(document.documentElement.scrollTop)
//     // console.log(Math.floor(document.documentElement.scrollTop), anchorMap[Math.floor(document.documentElement.scrollTop)])
//     // if (anchorMap[Math.floor(document.documentElement.scrollTop)]) {
//     //     window.location.href=anchorMap[Math.floor(document.documentElement.scrollTop)];
//     // }
//     console.log("now:", top)
//     let left = findLeft(top)
//     console.log("left:", left)
//     if (left && left !== -1) {
//         window.location.href=anchorMap[left]
//         document.documentElement.scrollTop = top;
//     }
// })