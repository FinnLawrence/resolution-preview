---
---

var exemptBlur = false;
var defaultUrl = '{{ site.search-url }}';

$(document).ready(function() {
    setAspect();
    sizeIframes();

    $('input').focus(function() { $(this).select(); } );

    $('#searchbar').submit(function(event) {
        event.preventDefault();
        var url = $('#search').val();

        // Don't reload the page if the url hasn't been changed
        if (url === defaultUrl) {
            return;
        }

        if (! isValidURL(url)) {
            // Try adding the protocol on the front
            url = "http://" + url;

            if (! isValidURL(url)) {
                // Not a valid URL
                alert("Please enter a valid URL");
                return false;
            } else {
                // URL is valid, we can continue
                // Make sure what we're searching for is in the address bar
                $('#search').val(url);
            }
        }
        setParameters(url);
        // Stop the blur handler from doing anything
        exemptBlur = true;
        $('#search').blur();
        exemptBlur = false;

        setIframeSource(url);
    });

    $('#search').blur(function() {
        // Hacky way to stop the handler from doing anything if we are calling blur manually...
        if (! exemptBlur) {
            $('#searchbar').submit();
        }
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

function setIframeSource(url) {
    // Need something here to check if the iFrames are going to get blocked and handle that nicely
    // TODO

    // Set the src of all the iframes
    $('iframe').each(function() {
        $(this).attr("src", url);
    });
}

function setAspect() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var aspectRatio = windowWidth / windowHeight;

    if (aspectRatio > 1.3) {
        $('#devices').addClass("landscape");
    } else {
        $('#devices').removeClass("landscape");
    }

    $('#devices').removeClass("loading");
}

function sizeIframes() {
    $('.iframe-wrapper').each(function() {
        var iframeWrapper = $(this);
        var iframeWrapperWidth = iframeWrapper.width();
        var iframeWidth = iframeWrapper.data('width');

        var scaleFactor = iframeWrapperWidth / iframeWidth;

        var iframe = iframeWrapper.children('iframe');
        iframe.css('transform', 'scale(' + scaleFactor + ')');
        iframe.css('opacity', '1');
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

    var protocol = url('protocol', window.location.href);
    var hostname = url('hostname', window.location.href);
    var port = url('port', window.location.href);
    var path = url('path', window.location.href);

    var newPageUrl = protocol + "://" + hostname;

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
    if(url.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i)){
        return true;
    } else {
        return false;
    }
}
