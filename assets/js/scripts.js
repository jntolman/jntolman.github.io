
// run this when the document is ready
$(document).ready(function() {

    // declare variables

    // get page elements
    var logikface = document.getElementById('logikface');
    var about = document.getElementById('about');
    var sample01 = document.getElementById('sample01');
    var sample02 = document.getElementById('sample02');
    var sample03 = document.getElementById('sample03');
    var skills = document.getElementById('skills');

    // get window and initial position measurements
    var windowHeight = window.innerHeight;
    var loc = about.getBoundingClientRect();
    var top, preTop = loc.top;

    logikface.style.height = (windowHeight/(1.25)) + "px";
    logikface.style.visibility = "visible";

    // initite some helpers
    var aboutRun, sample01Run, sample02Run, sample03Run, skillsRun = false;

    // functions

    function opacityCheck(elem, threshold) {
        // check and set opacity for elem based on threshold
        if (threshold < 400) {
            elem.style.opacity = 0.025;
        } else if (threshold > 600) {
            elem.style.opacity = 1;
        }
    }

    function scrollFade(elem) {
        // get the opacity for the element
        var opacity = elem.style.opacity;

        // when the about div goes above the bottom of the window, elem is not invisible, scolling up
        if (top < windowHeight && opacity > 0.025 && preTop > top) {
            // improve this to be related to difference between window height and top of about
            opacity = parseFloat(elem.style.opacity) - 0.025;
            elem.style.opacity = opacity;
        } else if (preTop < top && top > (windowHeight * 0.5) && opacity < 1.0) {
            opacity = parseFloat(elem.style.opacity) + 0.025;
            elem.style.opacity = opacity;
        }
    }

    function animatedFadeInById(eId, intTime) {
        // get element with id sent to function
        var item = document.getElementById(eId);
        // set opacity if it doesn't exist
        if (item.style.opacity === "") {
            item.style.opacity = 0;
            item.style.visibility = "visible";
        }
        // set the timing for fade in animation
        var id = setInterval(fadeInElement, intTime);
        // function to fade in element
        function fadeInElement() {
            // end animation if at full opacity
            if (parseInt(item.style.opacity) === 1) {
                clearInterval(id);
            } else {
                // increment by 0.025 at each interval
                item.style.opacity = parseFloat(item.style.opacity) + 0.025;
            }
        }
    }

    function aboutAnimations() {

        // get all where class=aboutItem
        var aboutItems = document.getElementsByClassName("aboutItem");

        // iterate through array by index
        for (var i=0; i<aboutItems.length; i++) {
            // determine interval time to stagger timing
            var intervalTime = i * 5;
            // call function to animate fade in
            animatedFadeInById(aboutItems[i].id, intervalTime);
        }
    }

    function sampleAnimations(sampleId) {
        
        // get the ids for the sample elements
        var sampleTitle = sampleId + "Title";
        var sampleDescription = sampleId + "Description";
        var sampleTechs = sampleId + "Techs";
        var sampleLinks = sampleId + "Links";
        var sampleThumb = sampleId + "Thumb";
        
        // fade in each element
        animatedFadeInById(sampleTitle, 10);
        animatedFadeInById(sampleDescription, 20);
        animatedFadeInById(sampleTechs, 30);
        animatedFadeInById(sampleLinks, 40);
        animatedFadeInById(sampleThumb, 70);

    }

    // on scroll
    $(window).scroll(function() {

        // get element locations
        var aboutLoc = about.getBoundingClientRect();
        var aboutTop = parseInt(aboutLoc.top);

        var sample01Loc = sample01.getBoundingClientRect();
        var sample01Top = parseInt(sample01Loc.top);

        var sample02Loc = sample02.getBoundingClientRect();
        var sample02Top = parseInt(sample02Loc.top);

        var sample03Loc = sample03.getBoundingClientRect();
        var sample03Top = parseInt(sample03Loc.top);

        var skillsLoc = skills.getBoundingClientRect();
        var skillsTop = parseInt(skillsLoc.top);
        
        // set initial opacity based on location of about div
        opacityCheck(logikface, aboutTop);
        
        // update position for about div
        if (window.pageYOffset < windowHeight && aboutTop > 250) {
            loc = about.getBoundingClientRect();
            top = parseInt(loc.top);
            scrollFade(logikface);
        } else if (aboutTop < 251 && !aboutRun) {
            loc = about.getBoundingClientRect();
            aboutRun = true;
            aboutAnimations();
            // about.scrollIntoView({ 'behavior': "smooth"});
        } else if (sample01Top < 300 && !sample01Run) {
            sampleAnimations("sample01");
            sample01Run = true;
        } else if (sample02Top < 250 && !sample02Run) {
            sampleAnimations("sample02");
            sample02Run = true;
        } else if (sample03Top < 250 && !sample03Run) {
            sampleAnimations("sample03");
            sample03Run = true;
        } else if (skillsTop < 250 && !skillsRun) {
            // loc = skills.getBoundingClientRect();
        }

        preTop = top;

    }).scroll();

});
