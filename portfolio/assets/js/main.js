window.addEventListener("load", function() {
    var masonry = new Masonry('.grid', {
        itemSelector: '.grid-item',
    });
    var grid = document.querySelector('.grid');
    grid.style.visibility = 'visible';
});
