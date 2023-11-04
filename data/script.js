
mapboxgl.accessToken = "pk.eyJ1IjoiYXlvdWJiZW5yZ3VpZyIsImEiOiJjbGc1dWExaTYwNzVtM2lwZGx6c3hkdzN2In0.FjPYgK_oZZMKpaz1vuFN3A";
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-7.619892, 33.480358], // starting position
  zoom: 12 // starting zoom
});


fetch('/database.csv')
  .then(response => response.text())
  .then(data => {
 

    // Création de la liste des marqueurs
    var markers = [];

    // Séparation des lignes du fichier
    var lines = data.split('\n');

    // Parcours des lignes (en excluant la première ligne contenant les noms des variables)
    for (var i = 1; i < lines.length; i++) {
      var elements = lines[1].split(',');

      // Extraction de la latitude et de la longitude
      var latitude = parseFloat(elements[1]);
      var longitude = parseFloat(elements[2]);
      var poids = parseFloat(elements[3]);
      var remplissage = parseFloat(elements[4]);

      console.log(poids);

      var element = document.getElementById("latlong");
      element.innerHTML = "("+latitude+longitude+")";
      var element = document.getElementById("poids");
      element.innerHTML = poids;
      var element = document.getElementById("remplissage");
      element.innerHTML = remplissage;
      


      // Vérification si les valeurs de latitude et de longitude sont valides
      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Création d'un objet de marqueur avec les coordonnées et les informations
        var marker = {
          coordinates: [longitude, latitude],
          info: 'Informations sur le point ' + i
        };

        // Ajout du marqueur à la liste des marqueurs
        markers.push(marker);
      }
    }



    // Boucle pour ajouter les marqueurs à la carte
markers.forEach(function(markerInfo) {
  var marker = new mapboxgl.Marker()
    .setLngLat(markerInfo.coordinates)
    .addTo(map);

  // Ajoutez un gestionnaire d'événements de clic au marqueur
  marker.getElement().addEventListener('click', function() {
    // Affichez les informations du marqueur dans la console
    apparitionDiv();
    // Vous pouvez également afficher les informations dans une boîte de dialogue ou d'autres actions
  });
});

var divVisible = false; // Variable pour suivre l'état actuel de la div

function apparitionDiv() {
  var mapDiv = document.getElementById("map");
  var otherDiv = document.getElementById("otherDiv");

  if (divVisible) {
    // Si la div est visible, la masquer
    mapDiv.style.width = "88%";
    otherDiv.style.right = "-50%";
    otherDiv.style.width = "50%";
  } else {
    // Si la div est masquée, l'afficher
    mapDiv.style.width = "80%";
    otherDiv.style.right = "0";
    otherDiv.style.width = "30%";
  }

  divVisible = !divVisible; // Inverser l'état de la div
}


  })
  .catch(error => {
    console.log('Erreur lors de la demande du fichier :', error);
  });

var serverAddress = "ws://" + window.location.hostname + "/ws";
var ws = new WebSocket(serverAddress);

ws.onopen = function () {
    console.log("Connexion WebSocket établie");
};

ws.onmessage = function (event) {

    if (event.data.includes("remplissage")) {
      console.log(event.data);
      var remplissage = event.data.split(":")[1];
      var element = document.getElementById("remplissage");
      element.innerHTML = remplissage;
    }



    if (event.data.includes("poids")) {
      console.log(event.data);
      var poids = event.data.split(":")[1];
      var element = document.getElementById("poids");
      element.innerHTML = poids;
    }



  }
