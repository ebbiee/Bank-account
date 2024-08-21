$(document).ready(function() {
    // Get modal element
    var $modal = $("#myModal");

    // Listen for open click
    $(".openModalBtn").on("click", function() {
        $modal.show();
    });

    // Listen for close click
    $(".close").on("click", function() {
        $modal.hide();
    });

    // Close modal if outside click
    $(window).on("click", function(event) {
        if ($(event.target).is($modal)) {
            $modal.hide();
        }
    });
});
