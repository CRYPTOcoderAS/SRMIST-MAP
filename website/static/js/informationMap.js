/*jslint bitwise: true, plusplus: true, white: true */
/*global google, console, document, Float32Array, XMLHttpRequest */

function initMap() {
  "use strict";
  var

    map = new google.maps.Map(document.getElementById('map'), {

      center: {
        lat: 40.158491930800095,
        lng: -76.988089083625
      },
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      rotateControl: false,
      streetViewControl: false
    }),

    freyCoordinates = [
      [40.15746567118362, -76.98794424533844],
      [40.15729752547384, -76.98775112628937],
      [40.15735550680011, -76.98767602443695],
      [40.156961232805116, -76.98712885379791],
      [40.15718156267276, -76.98692500591278],
      [40.157517854250294, -76.98722004890442],
      [40.157610624047564, -76.9875419139862],
      [40.15753524859693, -76.9875955581665],
      [40.15760482593892, -76.98778867721558]
    ],

    freyCoordinates_tilt0 = [
      [40.157348165046045, -76.98794960975647],
      [40.157221068101755, -76.9877564907074],
      [40.1572743668493, -76.98767602443695],
      [40.15695867365777, -76.98716640472412],
      [40.157126770215164, -76.98697328567505],
      [40.157434262840916, -76.98748826980591],
      [40.15742196316259, -76.98751509189606],
      [40.15746706197212, -76.98772966861725]
    ],

    libraryCoordinates = [
      [40.15719895710555, -76.9880622625351],
      [40.15718736081751, -76.98799788951874],
      [40.157135177496876, -76.98797106742859],
      [40.15708879228931, -76.9878476858139],
      [40.156775691309456, -76.98797106742859],
      [40.15643939605634, -76.98783159255981],
      [40.15625965135878, -76.98845386505127],
      [40.15667132399533, -76.98868453502655],
      [40.15714097564559, -76.98822855949402]
    ],

    libraryCoordinates_tilt0 = [
      [40.15658967975539, -76.98863625526428],
      [40.156495380991984, -76.98858797550201],
      [40.15666347869628, -76.98801934719086],
      [40.15699967285646, -76.98785305023193],
      [40.157073471351765, -76.98805689811707],
      [40.15696687349948, -76.9880998134613],
      [40.15697917326022, -76.98816418647766],
      [40.15675777722624, -76.98827147483826],
      [40.15663887905823, -76.98866307735443]
    ],

    boyerCoordinates = [
      [40.15644519426447, -76.99009001255035],
      [40.156306037132744, -76.98980033397675],
      [40.15639880858557, -76.98973059654236],
      [40.15635822109056, -76.98947846889496],
      [40.15644519426447, -76.98940336704254],
      [40.15661334208485, -76.98960721492767],
      [40.156914847478724, -76.98939263820648],
      [40.15712937934767, -76.98973059654236],
      [40.157007618099826, -76.98982179164886],
      [40.15694963647649, -76.98974668979645],
      [40.15666552580652, -76.98992908000946],
      [40.15671770948808, -76.99002027511597],
      [40.156468387092055, -76.99012756347656]
    ],

    boyerCoordinates_tilt0 = [
      [40.15699557293771, -76.98974132537842],
      [40.156417481914744, -76.99010610580444],
      [40.15626988341807, -76.98974668979645],
      [40.15633548278956, -76.98971450328827],
      [40.156302683111754, -76.98948383331299],
      [40.1564379816806, -76.98940873146057],
      [40.1565322805237, -76.9896125793457],
      [40.156884875037676, -76.98939800262451]
    ],

    unionCoordinates = [
      [40.158776033828296, -76.98641538619995],
      [40.158648477513715, -76.9863885641098],
      [40.158625285430766, -76.98596477508545],
      [40.15832958567884, -76.98581993579865],
      [40.158358575907556, -76.98560535907745],
      [40.15882241788328, -76.9857931137085],
      [40.15890358990326, -76.98591649532318],
      [40.158776033828296, -76.98641002178192]
    ],

    unionCoordinates_tilt0 = [
      [40.15857402336054, -76.9863885641098],
      [40.158467427863904, -76.98634564876556],
      [40.15847972735282, -76.98627591133118],
      [40.15847972735282, -76.98596477508545],
      [40.158184539003834, -76.98581993579865],
      [40.158246036682364, -76.98561072349548],
      [40.15872161684884, -76.98581993579865]
    ],

    highCenterCoordinates = [
      [40.15572621268088, -76.99264347553253],
      [40.155650835138516, -76.99255764484406],
      [40.15572621268088, -76.99250400066376],
      [40.155610247196414, -76.99228942394257],
      [40.15569722132834, -76.99121654033661],
      [40.1561378885514, -76.9912701845169],
      [40.1561378885514, -76.9911789894104],
      [40.15624225668539, -76.9911789894104],
      [40.156248054910336, -76.99108242988586],
      [40.15634662465893, -76.99109315872192],
      [40.156352422874996, -76.99100732803345],
      [40.15653796552721, -76.99101269245148],
      [40.15653796552721, -76.99111998081207],
      [40.15643359784773, -76.99111998081207],
      [40.15641620321887, -76.99120581150055],
      [40.15632343178977, -76.99120581150055],
      [40.15632343178977, -76.99129164218903],
      [40.15621326555314, -76.99131309986115],
      [40.156555360124855, -76.9919353723526],
      [40.155859572743225, -76.99248254299164],
      [40.15591175704413, -76.99255228042603],
      [40.15572621268088, -76.99265956878662]
    ],

    highCenterCoordinates_tilt0 = [
      [40.15583938597034, -76.9925844669342],
      [40.15568358622144, -76.99228405952454],
      [40.155753286153306, -76.9916296005249],
      [40.15585578592312, -76.99167251586914],
      [40.15588038584486, -76.99122726917267],
      [40.15620428398325, -76.99125409126282],
      [40.15622478381346, -76.99115753173828],
      [40.156442081633, -76.99098587036133],
      [40.15654048041691, -76.99102342128754],
      [40.15654048041691, -76.99116826057434],
      [40.1562985831509, -76.9913774728775],
      [40.15640108209764, -76.99155986309052],
      [40.15636828245151, -76.9917744398117],
      [40.15647488124348, -76.9919890165329]
    ],

    rafikiCoordinates = [
      [40.15882821588793, -76.98528349399567],
      [40.15867166958872, -76.98517084121704],
      [40.15869486165582, -76.98506891727448],
      [40.15890358990326, -76.98516011238098]
    ],

    rafikiCoordinates_tilt0 = [
      [40.15866831923728, -76.9852727651596],
      [40.158500226496066, -76.98518693447113],
      [40.158537124938334, -76.98504745960236],
      [40.158713417219, -76.98516547679901]
    ],


    fryDCoordinates = [
      [40.1594659933763, -76.98565363883972],
      [40.15923407498277, -76.98549270629883],
      [40.1593326403968, -76.98533177375793],
      [40.15939061998527, -76.98533177375793],
      [40.159570356394944, -76.98547124862671],
      [40.159570356394944, -76.98555707931519],
      [40.159535568739884, -76.98559999465942],
      [40.15941960976097, -76.98564291000366]
    ],

    fryDCoordinates_tilt0 = [
      [40.15924639109781, -76.98562681674957],
      [40.15930993770422, -76.98546051979065],
      [40.15913774676199, -76.98531299829483],
      [40.15905575092173, -76.98548465967178]
    ],

    lottieCoordinates = [
      [40.15797590389219, -76.98947846889496],
      [40.15784834607451, -76.98900640010834],
      [40.15791792309567, -76.98897421360016],
      [40.15787153842282, -76.98888301849365],
      [40.15803388463923, -76.98885083198547],
      [40.15795271157953, -76.98871672153473],
      [40.15821362464033, -76.98860943317413],
      [40.158491930800096, -76.98929607868195]
    ],

    lottieCoordinates_tilt0 = [
      [40.15798774605823, -76.98945701122284],
      [40.15784015097473, -76.98889374732971],
      [40.15796724676028, -76.98884010314941],
      [40.157946747456116, -76.98873281478882],
      [40.15816403976529, -76.98860943317413],
      [40.15818043915662, -76.98866844177246],
      [40.158291134944555, -76.98862016201019],
      [40.15843462921591, -76.98917269706726]
    ],

    gymCoordinates = [
      [40.15921668107131, -76.9890707731247],
      [40.15910072154776, -76.98871672153473],
      [40.15903114573857, -76.98875427246094],
      [40.15910072154776, -76.98909759521484]
    ],

    gymCoordinates_tilt0 = [
      [40.15916029560071, -76.98904395103455],
      [40.15904140163952, -76.98909759521484],
      [40.158951206081824, -76.98881328105927],
      [40.159094698958214, -76.98873817920685]
    ],

    ultimateFieldCoordinates = [
      [40.15929205465541, -76.99392020702362],
      [40.159825465320765, -76.99201047420502],
      [40.15855570913442, -76.9913238286972],
      [40.15783095180807, -76.99327647686005]
    ],

    ultimateFieldCoordinates_tilt0 = [
      [40.15929205465541, -76.99392020702362],
      [40.159825465320765, -76.99201047420502],
      [40.15855570913442, -76.9913238286972],
      [40.15783095180807, -76.99327647686005]
    ],

    parkingLotCoordinates = [
      [40.15989504031601, -76.98511183261871],
      [40.15976168817918, -76.98510646820068],
      [40.159744294402905, -76.98446810245514],
      [40.159918231965236, -76.98446273803711]
    ],

    parkingLotCoordinates_tilt0 = [
      [40.159635869363555, -76.98518693447113],
      [40.15950057716658, -76.98518693447113],
      [40.159521076001624, -76.98441445827484],
      [40.1596973657276, -76.98443591594696]
    ],

    markerList_tilt45 = [
      ['Boyer', 40.15708299413614, -76.98961794376373],
      ['Library', 40.156896, -76.988213],
      ['Lottie', 40.157981701969135, -76.98892593383789],
      ['Gym', 40.159083327602154, -76.9888186454773],
      ['Fry D', 40.159384822028656, -76.98548197746277],
      ['Rafiki', 40.15883401389207, -76.98524057865143],
      ['Union', 40.15857890124111, -76.98574483394623],
      ['Frey', 40.15751205613374, -76.98748290538788],
      ['High Center', 40.15650897452122, -76.99105024337769],
      ['Field', 40.158625285430766, -76.99150621891022],
      ['Parking Lot', 40.15979647571839, -76.9848221540451]
    ],

    markerList_tilt0 = [
      ['Boyer', 40.15686027547984, -76.98958039283752],
      ['Library', 40.15678647675284, -76.98815882205963],
      ['Lottie', 40.157946747456116, -76.98893666267395],
      ['Gym', 40.15901270306597, -76.9888561964035],
      ['Fry D', 40.15913979665674, -76.98546588420868],
      ['Rafiki', 40.15863962050605, -76.98518693447113],
      ['Union', 40.158319833823086, -76.98577165603638],
      ['Frey', 40.157372764427144, -76.98756337165833],
      ['High Center', 40.15649128104278, -76.9910717010498],
      ['Field', 40.15854942441462, -76.9917744398117],
      ['Parking Lot', 40.15963176960397, -76.98480069637299]
    ],

    markerListInfo = [
      ['Boyer', '<h4><b>Boyer Hall</b></h4> <h5><b> SAB Lost Films </b></h5> ' +
        'Friday: 6 and 9 PM <br>' +
        'Saturday: 3, 6 and 9 PM'
      ],

      ['Library', '<h4><b> Murray Library </b></h4> <h5><b> Opening Hours </b></h5>' +
        'Mon - Thurs: 7:30 AM - Midnight <br>' +
        'Friday: 7:30 AM - 6:00 PM <br>' +
        'Saturday: 10:00 AM - 8:00 PM <br>' +
        'Sunday: 2:00 PM - Midnight <br><br>' +
        '<a href="http://library.messiah.edu/vwebv/searchBasic"> Library Catalog </a>'
      ],

      ['Lottie', '<h4><b> Lottie </h4> <h5> Opening Hours </b></h5>' +
        'Mon - Fri: 7 - 10 AM; 11 AM - 3 PM; 4:30 PM - 7:30 PM <br>' +
        'Saturday: 7 - 10 AM; 11 AM - 2 PM; 4:30 PM - 7:30 PM <br>' +
        '<h5><b> Prices </b></h5>' +
        'Breakfast: $5.05 <br>' +
        'Lunch: $7.25 <br>' +
        'Dinner: $9.30'
      ],

      ['Gym', '<h4><b> Falcon Fitness Center </h4> <h5> Opening Hours </b></h5>' +
        'Mon - Thurs: 6 - 8 AM; 9 AM - 10 PM <br>' +
        'Friday: 6 - 8 AM; 9 AM - 6:30 PM <br>' +
        'Saturday: 9 AM - 5 PM <br>' +
        'Sunday: 2 - 8 PM'
      ],

      ['Fry D', '<h4><b> Fry D Apartments </h4> <h5> Visitation Hours </b></h5>' +
        'Sun - Thurs: Noon - Midnight <br>' +
        'Fri - Sat: Noon - 1 AM'
      ],

      ['Rafiki', '<h4><b> Rafiki House </h4> <h5> People </b></h5>' +
        'Katrina Chan<br>' +
        'Kucha Ganeng <br>' +
        'Abigail Hing <br>' +
        'Jodie Howard <br>' +
        'Sharlene Oong <br>' +
        'Rukshani Perera<br>' +
        'Leah Robinson'
      ],

      ['Union', '<h4><b> Union Cafe </h4> <h5> Opening Hours </b></h5>' +
        'Mon - Thurs: 7:30 AM - 11 PM <br>' +
        'Friday: 7:30 AM - Midnight <br>' +
        'Saturday: 1 PM - Midnight <br>' +
        'Sunday: 1 PM - 11 PM <br>' +

        '<h5><b> Prices </b></h5>' +
        'Salad: $ 6.95 <br>' +
        'Flatbread: $ 6.00 <br><br>' +
        '<a href="http://union.messiah.edu/"> union.messiah.edu </a>'
      ],


      ['Frey', '<h4><b> Frey Hall </h4> <h5> Office Hours </b></h5>' +
        'CIS 487: Dr. Owen: Mon - Fri: 1 PM - 2 PM'
      ],

      ['High Center', '<h4><b> High Center </h4> <h5> Piano Practice Room Opening Hours </b></h5>' +
        '..to be included..'
      ],

      ['Field', '<h4><b> Field </h4> <h5> Ultimate Training Times </b></h5>' +
        'Tues: 4:30 PM - 6:30 PM <br>' +
        'Thurs: 4:30 PM - 6:30 PM'
      ],

      ['Parking Lot', '<h4><b> Parking Lot </h4> <h5> Resources</b></h5>' +
        '<a href="http://exchange.aaa.com/safety/roadway-safety/winter-driving-tips/#.VqFGjTaP2i4"> Winter Driving Tips </a>'
      ]
    ],

    allMarkers = [],
    allInfoWindows = [],
    getInfoBool = false,
    counter = 0,
    allPolygonWalls = [],
    allPolygonRoofs = [],
    allPolygonFields = [],
    bounds = new google.maps.LatLngBounds();

  map.setTilt(45);

  // Developing tool: get lat and long when click on the map
  google.maps.event.addListener(map, 'click', function(event) {
    console.log("[" + event.latLng.lat() + ", " + event.latLng.lng() + "], ");
  });

  function drawField(map, name, coordinates, strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity) {
    var coords = [],
      i, polygonField;

    for (i = 0; i < coordinates.length; i++) {
      coords.push(new google.maps.LatLng(
        coordinates[i][0],
        coordinates[i][1]
      ));
    }

    polygonField = new google.maps.Polygon({
      paths: coords,
      strokeColor: strokeColor,
      strokeOpacity: strokeOpacity,
      strokeWeight: strokeWeight,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      zIndex: 10
    });

    polygonField.id = name;
    polygonField.setMap(map);

    allPolygonFields.push(polygonField);
  }

  function drawBuilding(map, name, coordinates, height, strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity) {
    var pairs = [],
      roofCoords = [],
      i, polygonRoof, point, otherIndex, otherPoint, first, second, wallCoords = [],
      polygonWalls;

    // Get coordinates for roof
    for (i = 0; i < coordinates.length; i++) {
      roofCoords.push(new google.maps.LatLng(
        coordinates[i][0] + height,
        coordinates[i][1]
      ));
    }

    polygonRoof = new google.maps.Polygon({
      paths: roofCoords,
      strokeColor: '#8C4646',
      strokeOpacity: 1.0,
      strokeWeight: 1,
      fillColor: '#8C4646',
      fillOpacity: 1.0,
      zIndex: 100
    });

    polygonRoof.id = name;
    polygonRoof.setMap(map);

    allPolygonRoofs.push(polygonRoof);

    // Build line pairs for each wall
    for (i = 0; i < coordinates.length; i++) {

      point = coordinates[i];
      otherIndex = (i === coordinates.length - 1) ? 0 : i + 1;
      otherPoint = coordinates[otherIndex];

      pairs.push([point, otherPoint]);
    }

    // draw excrusions
    for (i = 0; i < pairs.length; i++) {

      first = pairs[i][0];
      second = pairs[i][1];

      wallCoords = [
        new google.maps.LatLng(first[0], first[1]),
        new google.maps.LatLng(first[0] + height, first[1]),
        new google.maps.LatLng(second[0] + height, second[1]),
        new google.maps.LatLng(second[0], second[1])
      ];

      polygonWalls = new google.maps.Polygon({
        paths: wallCoords,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWeight: strokeWeight,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        zIndex: i
      });

      polygonWalls.id = name;

      polygonWalls.setMap(map);

      allPolygonWalls.push(polygonWalls);
    }
  }

  function undrawBuilding(name) {
    var i;
    for (i = 0; i < allPolygonWalls.length; i++) {
      if (allPolygonWalls[i].id === name) {
        allPolygonWalls[i].setMap(null);
      }
    }

    for (i = 0; i < allPolygonRoofs.length; i++) {
      if (allPolygonRoofs[i].id === name) {
        allPolygonRoofs[i].setMap(null);
      }
    }
  }

  function undrawAllBuildings() {
    var i;

    for (i = 0; i < allPolygonRoofs.length; i++) {
      undrawBuilding(allPolygonRoofs[i].id);
    }
  }

  function undrawField(name) {
    var i;
    for (i = 0; i < allPolygonFields.length; i++) {
      if (allPolygonFields[i].id === name) {
        allPolygonFields[i].setMap(null);
      }
    }
  }

  function undrawAllFields() {
    var i;

    for (i = 0; i < allPolygonFields.length; i++) {
      undrawField(allPolygonFields[i].id);
    }
  }


  // Display multiple markers: http://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
  // Icon change color: http://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker
  // Loop through our array of markers & place each one on the map
  function drawMarkers(markerList) {
    var i, position, marker, infoWindow;

    for (i = 0; i < markerList.length; i++) {
      position = new google.maps.LatLng(markerList[i][1], markerList[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        id: markerList[i][0],
        text: markerListInfo[i][1]
      });

      console.log(marker.id);

      infoWindow = new google.maps.InfoWindow();
      infoWindow.id = marker.id;
      infoWindow.setContent(infoWindow.id);
      infoWindow.open(map, marker);

      allInfoWindows.push(infoWindow);
      allMarkers.push(marker);
      marker.setMap(map);

      // Add a field clickedBool to marker
      marker.clickedBool = false;

      // For future use (not yet used in individual project)
      getInfoBool = true;

      // When a marker is clicked, the marker changes color and
      // displays the facility's information
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {

          if (marker.clickedBool === false && getInfoBool === true) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

            for (i = 0; i < allInfoWindows.length; i++) {

              if (counter > 0 && allMarkers[i].id !== marker.id) {
                allMarkers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                allInfoWindows[i].setContent(allInfoWindows[i].id);
              }

              allInfoWindows[i].close();

              if (allInfoWindows[i].id === marker.id) {
                allInfoWindows[i].setContent(marker.text);
                allInfoWindows[i].open(map, marker);
              }
            }

            counter++;

            marker.clickedBool = true;

          } else if (marker.clickedBool === true && getInfoBool === true) {

            for (i = 0; i < allInfoWindows.length; i++) {

              if (allInfoWindows[i].id === marker.id) {
                allInfoWindows[i].setContent(allInfoWindows[i].id);

              }

              allInfoWindows[i].open(map, allMarkers[i]);

              if (counter === 0) {
                allInfoWindows[i].setContent(allInfoWindows[i].id);
                allInfoWindows[i].open(map, allMarkers[i]);
              }

            }

            marker.clickedBool = false;
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            counter--;

          }
        };
      })(marker));

      map.fitBounds(bounds); // Fit the map according to window size and
    } // for loop
  } // function createMarkers


  function changeMarkersPositions() {
    var i, latlng;
    if (map.getTilt() === 0) {
      // Change position of marker
      for (i = 0; i < allMarkers.length; i++) {
        latlng = new google.maps.LatLng(markerList_tilt0[i][1], markerList_tilt0[i][2]);
        allMarkers[i].setPosition(latlng);
      }
    } else {

      for (i = 0; i < allMarkers.length; i++) {
        latlng = new google.maps.LatLng(markerList_tilt45[i][1], markerList_tilt45[i][2]);
        allMarkers[i].setPosition(latlng);
      }
    }
  }

  function drawInitMap() {
    drawField(map, 'Field', ultimateFieldCoordinates, '#eeeeee', 0.6, 1, '#8BA870', 0.6);
    drawField(map, 'Parking Lot', parkingLotCoordinates, '#eeeeee', 0.6, 1, '#8BA870', 0.6);

    drawBuilding(map, 'Frey', freyCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Library', libraryCoordinates, 0.00005, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Boyer', boyerCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Union', unionCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'High Center', highCenterCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Rafiki', rafikiCoordinates, 0.00005, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Lottie', lottieCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Fry D', fryDCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
    drawBuilding(map, 'Gym', gymCoordinates, 0.00001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);

    drawMarkers(markerList_tilt45);
  }

  drawInitMap();

  // Change building coordinates if tilt changes between 0 and 45.
  // Tilt change may happen when zooming in and out or when changing the map type
  // between satellite and map (road).
  map.addListener('tilt_changed', function() {

    if (map.getTilt() === 0) {

      undrawAllBuildings();
      undrawAllFields();

      drawField(map, 'Parking Lot', parkingLotCoordinates_tilt0, '#eeeeee', 0.6, 1, '#8BA870', 0.6);
      drawField(map, 'Field', ultimateFieldCoordinates_tilt0, '#eeeeee', 0.6, 1, '#8BA870', 0.6);

      drawBuilding(map, 'Frey', freyCoordinates_tilt0, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Library', libraryCoordinates_tilt0, 0.00005, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Boyer', boyerCoordinates_tilt0, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Union', unionCoordinates_tilt0, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'High Center', highCenterCoordinates_tilt0, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Rafiki', rafikiCoordinates_tilt0, 0.00005, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Lottie', lottieCoordinates_tilt0, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Fry D', fryDCoordinates_tilt0, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Gym', gymCoordinates_tilt0, 0.00001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);

      changeMarkersPositions();

    } else {
      undrawAllBuildings();
      undrawAllFields();

      drawField(map, 'Field', ultimateFieldCoordinates, '#eeeeee', 0.6, 1, '#8BA870', 0.6);
      drawField(map, 'Parking Lot', parkingLotCoordinates, '#eeeeee', 0.6, 1, '#8BA870', 0.6);

      drawBuilding(map, 'Frey', freyCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Library', libraryCoordinates, 0.00005, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Boyer', boyerCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Union', unionCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'High Center', highCenterCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Rafiki', rafikiCoordinates, 0.00005, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Lottie', lottieCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Fry D', fryDCoordinates, 0.0001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);
      drawBuilding(map, 'Gym', gymCoordinates, 0.00001, '#eeeeee', 0.6, 1, '#f2e394', 1.0);

      changeMarkersPositions();
    }
  });
}
