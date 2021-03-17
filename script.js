
	type="text/javascript"
	
		var volumeSlider = document.getElementById("volumeSlider"); // the volume slider 
		var volumeIndicator = document.getElementById("volumeIndicator"); // the volume index
		var btnSetVolume = document.getElementById("btnVolSet"); // hidden button to submit the form
		var baseSlider = document.getElementById("baseSlider"); // the base slider 
		var baseIndicator = document.getElementById("baseIndicator"); // the base index
		var btnSetBase = document.getElementById("btnBaseSet"); // hidden button to submit the form
		var stationDropDownMenu = document.getElementById("station");
		var btnSetStation = document.getElementById("btnStationSet");
		var selectedStationIndex;
		var macAddressField = document.getElementById("txtMAC");
		var macAddressInvalidWarning = document.getElementById("MacAddressInvalidWarning");
		var btnSetMac = document.getElementById("btnSaveMAC");


	// perform volumne change in machine after user releases the slider
	volumeSlider.onmouseup = function() {
	  volumeIndicator.innerHTML = this.value;
		console.log("external javscript test");
		
		if(!window.localStorage){
			console.log("This browser doesn not support localStorage");
			return false;
		}else{
			// set volume in loclaStorage
			var storage=window.localStorage;
			storage["volume"] = this.value;
		}
		// adjust volume in the machine
		adjustVolume(this.value);
	}
	
	// update the volumeIndicator whenever the slider has value change, so that the webpage looks responsive
	volumeSlider.oninput = function(){
		volumeIndicator.innerHTML = this.value;
	}
	
	// call when page loads
	function initVolume(){
		console.log("initVolume called");
		// check if the browser support localStorage 
		if(!window.localStorage){
			console.log("This browser doesn not support localStorage");
			return false;
		}else{
			var storage=window.localStorage;
			// check if the page is loaded in the browser at the first time, create a variable to store the volume
			if(localStorage.getItem("volume") === null){
				console.log("volume is not created, initalized");
				storage["volume"] = 6;		
				adjustVolume(localStorage.getItem("volume"));
				volumeSlider.value = localStorage.getItem('volume').toString();				
			}else{
			// if the page is previously loaded (reloaded in the brwoser), set the volume back to previously defined value
				volumeSlider.value = localStorage.getItem('volume').toString();
				volumeIndicator.innerHTML = localStorage.getItem('volume').toString();
				console.log("volume is set back to" + localStorage.getItem('volume'));
			}
		}
	}

	// adjust volume in the machine
	function adjustVolume(volume){
		console.log("set volume to "+volume);
		var storage=window.localStorage;
		if(this.volume != storage["volume"]){
			btnSetVolume.click();
		}else{
			console.log("volume is not changed");
		}
	}
	
	// perform base change in machine after 
	baseSlider.onmouseup = function(){
		baseIndicator.innerHTML = this.value;
		if(!window.localStorage){
			console.log("This browser doesn not support localStorage");
			return false;
		}else{
			// set base in loclaStorage
			var storage=window.localStorage;
			storage["base"] = this.value;
		}
		// adjust volume in the machine
		adjustBase(this.value);
	}
	
	// update the baseIndicator whenever the slider has value update, so that the wbpages 
	baseSlider.oninput = function(){
		baseIndicator.innerHTML = this.value;	
	}
	
	// call when page loads
	function initBase(){
		console.log("initBase called");
		// check if the browser support localStorage 
		if(!window.localStorage){
			console.log("This browser doesn not support localStorage");
			return false;
		}else{
			var storage=window.localStorage;
			// check if the page is loaded in the browser at the first time, create a variable to store the base
			if(localStorage.getItem("base") === null){
				console.log("base is not created, initalized");
				storage["base"] = 6;		
				adjustVolume(localStorage.getItem("base"));
				baseSlider.value = localStorage.getItem('base').toString();				
			}else{
			// if the page is previously loaded (reloaded in the brwoser), set the base back to previously defined value
				baseSlider.value = localStorage.getItem('base').toString();
				baseIndicator.innerHTML = localStorage.getItem('base').toString();
				console.log("base is set back to" + localStorage.getItem('base'));
			}
		}
	}
	
	// adjust base in the machine
	function adjustBase(baseValue){
		console.log("set base to " + baseValue);
		btnSetBase.click();
	}
	
	stationDropDownMenu.onchange = function (){
		if(!window.localStorage){
			console.log("This browser doesn not support localStorage");
			return false;
		}else{
			// set station in loclaStorage
			var storage=window.localStorage;
			storage["station"] = this.value;
		}
		// adjust volume in the machine
		changeStation(this.value);

	}
	
	// call when page loads
	function initStation(){
		console.log("initStation called");
		// check if the browser support localStorage 
		if(!window.localStorage){
			console.log("This browser doesn not support localStorage");
			return false;
		}else{
			var storage=window.localStorage;
			// check if the page is loaded in the browser at the first time, create a variable to store the selected station
			if(localStorage.getItem("station") === null){
				console.log("station is not created, initalized");
				storage["station"] = 1;		
			}else{
			// if the page is previously loaded (reloaded in the brwoser), set the base back to previously defined value
				//baseSlider.value = localStorage.getItem('station').toString();
				//baseIndicator.innerHTML = localStorage.getItem('station').toString();
				console.log("station is set back to" + localStorage.getItem('station'));
			}
			stationDropDownMenu.selectedIndex = localStorage.getItem('station') - 1;
		}
	}
	
	function changeStation(station){
		console.log("set station to " + station);
		btnSetStation.click();
	}
	
	window.onload = function() {
	  initVolume();
	  initBase();
	  initStation();
		console.log("window loaded");
	}
	
	macAddressField.oninput = function(){
		var regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
		var mac_address = macAddressField.value;
		if(!regexp.test(mac_address)) {
			macAddressInvalidWarning.textContent = "Invalid Mac Address!";
			btnSaveMAC.disabled = true;
		}else{
			macAddressInvalidWarning.textContent = "";		
			btnSaveMAC.disabled = false;
		}
	}
