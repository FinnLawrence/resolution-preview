---
---

$(document).ready(function() {
    setAspect();
    sizeIframes();
    
    $('input').focus(function() { $(this).select(); } );
    
    $('#searchbar').submit(function(event) {
        event.preventDefault();
        var url = $('#search').val();
        
        if (! isValidURL(url)) {
            url = "http://" + url;
            
            if (! isValidURL(url)) {
                alert("Please enter a valid URL");
                return false;
            } else {
                $('#search').val(url);
            }
        }
        setParameters(url);
        $('#search').blur();
        $('iframe').each(function() {
            $(this).attr("src", url);
        });
    });
    
    $('.btn-device').click(function() {
        var site = getParameters();
        
        if (site) {
            var button = $(this);
            var href = button.attr('href');
            
            href = href + "?url=" + site;
            
            button.attr('href', href);
        }
    });

    parseParameters();
});

$(window).resize(function() {
    setAspect();
    sizeIframes();
});

function setAspect() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var aspectRatio = windowWidth / windowHeight;
    
    if (aspectRatio > 1.3) {
        $('#devices').addClass("landscape");
    } else {
        $('#devices').removeClass("landscape");
    }
}

function sizeIframes() {
    $('.iframe-wrapper').each(function() {
        var iframeWrapper = $(this);
        var iframeWrapperWidth = iframeWrapper.width();
        var iframeWidth = iframeWrapper.data('width');
        
        var scaleFactor = iframeWrapperWidth / iframeWidth;
        
        var iframe = iframeWrapper.children('iframe');
        iframe.css('transform', 'scale(' + scaleFactor + ')');
    });
}

function getParameters() {
    var pageURL = window.location.href;
    var site = url('?url', pageURL);
    return site;
}

function parseParameters() {
    var site = getParameters();
    
    if(site) {
        $('#search').val(site);
        $('#searchbar').submit();
    }
}

function setParameters(pageURL) {
    var targetDomain = url('hostname', pageURL);
    var targetPath = url('path', pageURL);
    
    var hostname = url('hostname', window.location.href);
    var port = url('port', window.location.href);
    var path = url('path', window.location.href);
    
    var newPageUrl = "http://" + hostname;
    
    if(port) {
        newPageUrl += ":" + port;
    }
    
    if (path) {
        newPageUrl += path + "/";
    }
    
    newPageUrl += "?url=" + targetDomain + targetPath;
    
    window.history.pushState(null, null, newPageUrl);
}

function isValidURL(url) {
     if(url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)) {
         return true;
     } else {
         return false;
     }
}