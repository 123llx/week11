$(function() {
    $.ajax({
        url: '/list',
        success: function(data) {
            console.log(data)
        }
    })
})