// Sidebar
function openFNav() {
    closeNav();
    document.getElementById("mySidebar").style.width = "350px";
    var f = document.getElementById("fb_full");
    f.style.display = "block";

    var t = document.getElementById("twitter_full");
    t.style.display = "none";
    // document.getElementById("main").style.marginLeft = "250px";
}

function openTNav() {
    closeNav();
    document.getElementById("mySidebar").style.width = "350px";

    var f = document.getElementById("fb_full");
    f.style.display = "none";

    var t = document.getElementById("twitter_full");
    t.style.display = "block";
    // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
}


// Twitter data
! function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, "script", "twitter-wjs");


// Removes iframe from twitter button before creating a new one with new attribute values
$('#tweetSubmit').on('click', function (ev) {
    ev.preventDefault();
    $('#tweetBtn iframe').remove();
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-hashtags', 'dishiTeam28')
        .attr('data-url', 'https://dishi-9fa34.web.app/')
        .attr('data-text', $('#tweetText').val());
    $('#tweetBtn').append(tweetBtn);
    twttr.widgets.load();
});