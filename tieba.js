javascript: !
function() {
    document.getElementsByTagName('body')[0].scrollTop = 0;
    $('.search_bright').remove();
    $('#com_userbar').remove();
    $('#tbui_aside_float_bar').remove();
    var posts_urls = [];
    var posts_title = [];
    var nodes = $('.j_thread_list .threadlist_title .j_th_tit');
    $(nodes).each(function(e) {
        posts_urls.push($(nodes[e]).attr('href'));
        posts_title.push($(nodes[e]).text())
    });
    console.log(posts_urls);
    $('#pending').remove();
    $('html>body').prepend('<center id="pending"><h1 style="color:red;">处理中...</h1></center>');
    function loadCss(css_url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = css_url;
        document.getElementsByTagName("head")[0].appendChild(link)
    }
    loadCss('//apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css');
    loadCss('//blueimp.github.io/Gallery/css/blueimp-gallery.min.css');
    $.getScript('//apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.js');
    $.getScript('//7xiam0.com1.z0.glb.clouddn.com/jquery.blueimp-gallery.min.js');
    var renderItem = function(img_url, _pos) {
        return '<a href="' + img_url + '" title="' + posts_title[_pos] + '" data-dialog><img src="' + img_url + '"></a>'
    };
    var initSideways = function(first_img_url, _pos) {
        $('#show').remove();
        var _html = '<center><button type="button" id="show" style="border: 1px solid #d19405; background: #fece2f url("images/ui-bg_gloss-wave_60_fece2f_500x100.png") 50% 50% repeat-x; font-weight: bold; color: #4c3000; border-radius: 8px; font-family: Segoe UI,Arial,sans-serif; font-size: 1.1em; padding: 1em;">点击查看</button></center>';
        _html += '<div id="blueimp-gallery-dialog" data-show="fade" data-hide="fade"><div class="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls"><div class="slides"></div><a class="prev">‹</a><a class="next">›</a><a class="play-pause"></a></div></div><div id="links" style="display:none">' + renderItem(first_img_url, _pos) + '</div>';
        $('html>body').prepend(_html);
        $.getScript('//7xiam0.com1.z0.glb.clouddn.com/jquery.image-gallery.js');
        $('#show').click(function() {
            $('#blueimp-gallery-dialog .blueimp-gallery').data('startSlideshow', true);
            $('#links').children().first().click()
        })
    };
    var isInit = false;
    var total = posts_urls.length;
    var processed = 0;
    var a1 = '112test1';
    var a2 = '222test2';
    var a3 = '333test3';
    $.each(posts_urls,
    function(_idx, _url) {
        $.get(_url,
        function(html) {
            processed++;
            var rate = parseInt((processed / total) * 100, 10);
            console.info(rate);
            $('#pending h1').text('进度: ' + rate + '%');
            rate == 100 && $('#pending').remove();
            var _imgs = $(html).find('#my_friends_vote_detail').parent().find('img');
            console.info("Current:" + _url);
            $(_imgs).each(function(e) {
                var _src = $(_imgs[e]).attr('src');
                console.info(_src);
                if (/imgsrc/.test(_src)) {
                    if (!isInit) {
                        initSideways(_src, _idx);
                        isInit = true
                    } else {
                        $('#links').append(renderItem(_src, _idx))
                    }
                }
            })
        })
    })
} ();
