$(document).ready(function() {
  $('#logout').click(function() {
    window.location.href = '/';
  })
  $('.dropdown-menu li').click(function(elem) {
    clearMarkers();
    $('#catName').text($(elem.target).text().trim());
    // elem.value
    $.getJSON('/api/virus/' + $(elem.target).text().trim(), function(data) {
      console.log(data);
      currentValue = data;
      $('#virus').css("display", "block");
      for (var i in data) {
        addMarker(data[i]);
        $('#virusName').html(data[i].label);
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' +
          data[i].lat + "," + data[i].lon + '&sensor=false', null,
          function(data) {
            $('#virusLocation').html(data.results[0].formatted_address);
          });
      }
    });
    $.getJSON('/api/wiki/' + $(elem.target).text().trim(), function(data) {
      $('#virusDescription').html(data);
    });
  });
  $('#subscribe').click(function() {
    $.getJSON('/api/subscribe/' + $('#catName').text().trim(), function(data) {
      $.getJSON('/api/issubscribe/' + $('#catName').text().trim(), function(data) {
        console.log(data);
        if (data == true) {
          $('#subscribe').addClass("disabled").text("Subscribed");
        }
      })
    })
  })
  $.getJSON('/api/issubscribe/' + $('#catName').text().trim(), function(data) {
    if (data === true) {
      $('#subscribe').addClass("disabled").text("Subscribed");
    }
  })
  $(".jcarousel").jcarousel({
    wrap: "both"
  });
});
