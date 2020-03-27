function mapInit() {
  var map = new ymaps.Map(document.querySelector('.map'), {
    center: [59.939246, 30.330042],
    zoom: 16,
    controls: ['zoomControl'],
  });

  var placemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140],
  });

  map.geoObjects.add(placemark);
}

ymaps.ready(mapInit);
