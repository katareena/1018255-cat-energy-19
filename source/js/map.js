function mapInit() {
  var screens = {
    sm: 320,
    md: 768,
    xl: 1300
  };
  var iconSize = {
    sm: [62, 53],
    md: [124, 106],
    xl: [124, 106]
  };
  var iconOffset = {
    sm: [-31, -53],
    md: [-62, -106],
    xl: [-62, -106]
  };
  var mapCenter = {
    sm: [59.938631, 30.323055],
    md: [59.938631, 30.323055],
    xl: [59.938631, 30.319809]
  };
  var mapZoom = {
    sm: 16,
    md: 16,
    xl: 17
  };

  function getScreenSize() {
    var documentWidth = document.documentElement.clientWidth;

    if (documentWidth < screens.md) {
      return 'sm';
    }

    if (documentWidth < screens.xl) {
      return 'md';
    }

    return 'xl';
  }

  var screenSize = getScreenSize();
  var map = new ymaps.Map(document.querySelector('.map'), {
    center: mapCenter[screenSize],
    zoom: mapZoom[screenSize],
    controls: ['zoomControl']
  });
  map.container.fitToViewport();
  map.behaviors.disable('scrollZoom');

  function createMarker(screenWidth) {
    return new ymaps.Placemark([59.938631, 30.323055], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.png',
      iconImageSize: iconSize[screenWidth],
      iconImageOffset: iconOffset[screenWidth]
    });
  }

  var marker = createMarker(screenSize);
  map.geoObjects.add(marker);
  map.events.add('sizechange', function (event) {
    var oldWidth = event.get('oldSize')[0];
    var newWidth = event.get('newSize')[0];

    function updateMarker() {
      map.geoObjects.remove(marker);
      marker = createMarker(getScreenSize());
      map.geoObjects.add(marker);
    }

    if (oldWidth < screens.md && newWidth >= screens.md) {
      updateMarker();
    }

    if (oldWidth >= screens.md && newWidth < screens.md) {
      updateMarker();
    }

    if (oldWidth < screens.xl && newWidth >= screens.xl) {
      map.setCenter(mapCenter.xl, mapZoom.xl);
    }

    if (oldWidth >= screens.xl && newWidth < screens.xl) {
      map.setCenter(mapCenter.md, mapZoom.md);
    }
  });
}

ymaps.ready(mapInit);
