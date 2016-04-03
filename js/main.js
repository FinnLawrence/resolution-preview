---
---

$(document).ready(function() {
    $("input").focus(function() { $(this).select(); } );
    
    $("#searchbar").submit(function() {
        event.preventDefault();
        var url = $('#search').val();
        $('iframe').each(function() {
            $(this).attr("src", url);
        });
    });
});