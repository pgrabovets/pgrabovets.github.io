window.addEventListener('load', function() {
    var iframes = document.getElementsByTagName('iframe');
    setElementsHeight(iframes, 0.5625);

    window.addEventListener('resize', function() {
        setElementsHeight(iframes, 0.5625);
    }.bind(this));

});

function setElementsHeight(iframes, ratio) {
    for (var i = 0; i < iframes.length; i++) {
        let width = iframes[i].clientWidth;
        let height = width * ratio;
        iframes[i].height = Math.round(height);
    }
}
