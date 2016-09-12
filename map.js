



var map;
var marker;
var myResult;
var time;
var addressInput;
var country;
var rawOffset;
var dstOffset;

function initialize() {

	var mapOptions = {

		center: new google.maps.LatLng(40.7609, -111.8270400),
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	//document.getElementById("temp").style.visibility ="hidden";

}


google.maps.event.addDomListener(window, 'load', initialize);

function searchAddress() {

	 addressInput = document.getElementById('address-input').value;
	 country = document.getElementById('country-input').value;

	

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

       myResult = results[0].geometry.location;

       //alert(myResult);

      createMarker(myResult);

      

      map.setCenter(myResult);

      map.setZoom(16);


    
	var query = {
		q: addressInput + ',' +  country ,
		appid: '923f737721a1d52088a411da063b19ab'

	
	}
	

	getWeatherData(query);
      
		}

	});



}	

 function createMarker(latlng) {

 	if(marker != undefined && marker != '') {
 		marker.setMap(null);
 		marker ='';
 	}

 	 marker = new google.maps.Marker({
 		map: map,
 		position: latlng
 	});

 }


 


function getWeatherData(query) {

	

	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?',
		
		type: 'GET',
		
		data: query,
		
		success : function(response){
			console.log(response);
			data = response;

			


			var weather = document.getElementById('weather');
			weather.innerHTML += data.weather[0].main + ' - ' +data.weather[0].description;
			weather.style.visibility="visible";

			var temp = document.getElementById('temp');
			temp.innerHTML += convertKelvintoFarhenheit(data.main.temp) + '°F / ' +  convertKelvintoCelcius(data.main.temp) + '°C' ;
			temp.style.visibility="visible";

			var humidity = document.getElementById('humidity');
			humidity.innerHTML += data.main.humidity + '%'; 
			humidity.style.visibility="visible";

			//var sunrise = document.getElementById('sunrise');
			//sunrise.innerHTML += convertDate(data.sys.sunrise);
			//sunrise.style.visibility="hidden";

			//var sunset = document.getElementById('sunset');
			//sunset.innerHTML += convertDate(data.sys.sunset);
			//sunset.style.visibility="hidden";


			console.log("success");
		 
		 },
		error : function (error) {
		 	console.log("error");
		 	alert('Sorry! Looks like the weather update services are down currently. Please try again later.')
		 }
	});

	
}


	
function convertDate (epochDataa) {	
var myDate = new Date(epochDataa *1000) ;


var gmtTime = (myDate.toGMTString());


var offSet = 0; //
console.log(myResult);
offSet = timeConverter(myDate);


return (gmtTime + ' ' + offSet );
}

 
function convertKelvintoFarhenheit (tempInKelvin) {

	return ((tempInKelvin * 9/5 ) - 459.67).toFixed(2);
}

function convertKelvintoCelcius(tempInKelvin) {
	return  (tempInKelvin- 273.15).toFixed(2);
}


function timeConverter(myDate) {

	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/timezone/json?',
		type: 'GET',
		dataType: 'json',
		data: {
			location: myResult,
			timestamp: myDate,
			
		},	
		success: function(response) {
			data = response;
			rawOffset = data.rawOffset;
			dstOffset = data.dstOffset;
		},
		error: function(error) {
			console.log(error);
		}
	});

	return ((rawOffset + dstOffset)/3600);
	
	
}

function getCoordinates(addressInp, country) {

	$.$.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json?',
		type: 'GET',
		dataType: 'json',
		data: {address: addressInp + ', ' + country},
		success: function(response) {
			data= response;
			console.log('');
		},
		error: function(response){
			console.log('');
		} 
	
	});
	
}
