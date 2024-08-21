$(document).ready(function() {
    // Get modal element
    const modal = $("#myModal");
    $(".openModalBtn").on("click", function() {
        modal.fadeIn();
    });
    $(".close").on("click", function() {
        modal.fadeOut();
    });
    $(window).on("click", function(event) {
        if ($(event.target).is($modal)) {
            modal.hide();
        }
    });
});
