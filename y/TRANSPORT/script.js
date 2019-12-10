function iniciarMap(){
    var coord = {lat: 4.654712 ,lng: -74.076426};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 30,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
} 