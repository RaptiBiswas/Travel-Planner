let map;
let service;


function initialize(){
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),
  {
    types:['geocode']
  })
  document.getElementById("submit").addEventListener("click",nearbysrch);
  document.getElementById("submit").addEventListener("click",show);
}

function show(){
  document.getElementById("print").className="show";
}

function nearbysrch() {
  var place = autocomplete.getPlace();
  let selected_days = Number(document.querySelector("#day").value);
  map = new google.maps.Map(document.getElementById('map'), {
    center: place.geometry.location,
    zoom: 15
  });
  
  var request = {
    location: place.geometry.location,
    radius: '30000',
    type: ['tourist_attraction']
  };
  var request1 = {
    location: place.geometry.location,
    radius: '40000',
    type: ['hindu_temple']
  };
  var request2 = {
    location: place.geometry.location,
    radius: '10000',
    type: ['lodging']
  };
  
  service = new google.maps.places.PlacesService(map);
  if(selected_days == 1) {
    let head = document.querySelector("#head1");
    let content = document.querySelector("#hotels");
    head.innerHTML = ``;
    content.innerHTML = ``;
    service.nearbySearch(request, callback_loc);
  }
  else{
    service.nearbySearch(request2, callback_hotel);
    service.nearbySearch(request, callback_loc);
  }
  
}

function callback_hotel(results, status) {
  let head = document.querySelector("#head1");
  let content = document.querySelector("#hotels");
  let cardContent = "";
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < 5; i++) {
      if(results[i].user_ratings_total >= 200 && results[i].rating >= 3){
        console.log(results[i]);
        cardContent += `
                        <div id="card">
                          <div class="Heading">${results[i].name}</div>
                          <div class="Picture"><img src="${results[i].photos[0].getUrl()}" width="400px" height="auto" alt="img_${i}"></div>
                          <div class="Description">${results[i].rating}</div>
                        </div>
        `;
      }
    }
  }
  head.innerHTML = `<h1>Hotel Options</h1>`;
  content.innerHTML = cardContent;
}

function callback_loc(results, status) {
  let content = document.querySelector("#base");
  let cardContent = `<div id="head2"><h1>Itinerary</h1></div>`;
  let days = 1;
  let selected_days = Number(document.querySelector("#day").value);
  let q = 0;
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
      if(results[i].user_ratings_total >= 50 && results[i].rating >= 3){

          if(q == ((selected_days)*3)){
            break;
          }
       
          if(q % 3 == 0){
            cardContent += `
                    <div><h1 id="Day_count">Day ${days}</h1></div>
                      <div id="loc" class="content">
                        <div id="card">
                          <div class="Heading">${results[i].name}</div>
                          <div class="Picture"><img src="${results[i].photos[0].getUrl()}" width="400px" height="auto" alt="img_${i}"></div>
                          <div class="Description">${results[i].rating}</div>
                        </div>
                        `;
            days++;
            q++;

          }
          else if(q % 3 == 2){
            cardContent += `
                        <div id="card">
                          <div class="Heading">${results[i].name}</div>
                          <div class="Picture"><img src="${results[i].photos[0].getUrl()}" width="400px" height="auto" alt="img_${i}"></div>
                          <div class="Description">${results[i].rating}</div>
                        </div>
                        </div>
                        `;
            q++;
          }
          else{
            cardContent += `
                        <div id="card">
                          <div class="Heading">${results[i].name}</div>
                          <div class="Picture"><img src="${results[i].photos[0].getUrl()}" width="400px" height="auto" alt="img_${i}"></div>
                          <div class="Description">${results[i].rating}</div>
                        </div>
                        `;
            q++;
          }

      }
    }    
    content.innerHTML = cardContent;
  }
}

