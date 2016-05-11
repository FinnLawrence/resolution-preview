---
---

$(document).ready(function() {
    $("input").focus(function() { $(this).select(); } );
    
    $("#searchbar").submit(function() {
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
        $('#search').blur();
        $('iframe').each(function() {
            $(this).attr("src", url);
        });
    });
});



function isValidURL(url) {
     if(url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)) {
         return true;
     } else {
         return false;
     }
}