---
---

$(document).ready(function() {
    setScale();
    
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

    parseParameters();
});

$(window).resize(function() {
    setScale();
});

function parseParameters() {
    var pageURL = window.location.href;
    var site = url('?url', pageURL);
    
    if(site) {
        $('#search').val(site);
        $('#searchbar').submit();
    } else {
        
    }
}

function setParameters(pageURL) {
    var domain = url('hostname', pageURL);
    var path = url('path', pageURL);
    
    var port = url('port', window.location.href);
    
    if (port) {
        pageURL = "http://" + url('hostname', window.location.href) + ":" + port + "/?url=" + domain + path;
    } else {
        pageURL = "http://" + url('hostname', window.location.href) + "?url=" + domain + path;
    }
    
    window.history.pushState(null, null, pageURL);
}

function isValidURL(url) {
     if(url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)) {
         return true;
     } else {
         return false;
     }
}