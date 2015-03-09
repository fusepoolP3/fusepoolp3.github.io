var POIData = [];
// var currentLocation = ol.proj.transform([10.947157085473691, 46.01793310172717], 'EPSG:4326', 'EPSG:3857');
var currentLocation = [10.947157085473691, 46.01793310172717]

$(document).ready(function() {
    initPatches();
	depotListInit();
});

function depotListInit() {	
	showLoadingCover();
    initMap();
    initPointController();
    initDraggers('.listPanel', '.listDragger', '.mapPanel', mc);
	initInputs();
	extractContainerURI();
    drawDepots(window.events);
}

function initInputs() {	
    $(".dateInput").keyup(function(event) {
		if(event.keyCode == 13) { // ENTER
			drawDepots(window.events);
		}
	});
	
    $("#searchBtn").click(function(event) {
		drawDepots(window.events);
	});
	
}

function initMap() {	
    window.mc = new MapController();
    mc.initMap("map");
    // mc.addBaseLayer("MapQuest", "MapQuest");
    mc.addBaseLayer("OSM", "OSM");
    mc.addVectorLayer("first");
    mc.addVectorLayer("marker");
	
	var markerIconStyle = mc.createIconStyle("images/basemarker.png", [0.5,1]);
	mc.addMarker("marker", currentLocation[0], currentLocation[1], [markerIconStyle], "marker", false, $.proxy(focusToMarker, this), false);
    mc.updateSize();
	
	mc.map.on('click', function(event) {	
		
		//MARKER
		mc.clearLayer("marker");		
		currentLocation = ol.proj.transform( [event.coordinate[0], event.coordinate[1] ], 'EPSG:3857', 'EPSG:4326');		        
        var markerIconStyle = mc.createIconStyle("images/basemarker.png", [0.5,1]);
		mc.addMarker("marker", currentLocation[0], currentLocation[1], [markerIconStyle], "marker", false, $.proxy(focusToMarker, this), false);

		//POIS
		mc.clearLayer("first");
		drawDepots(window.events);
		
        mc.updateSize();		
	});
}

function focusToMarker(id) {
    mc.setCenterToMarker("first", id);
    mc.setZoom(16);
}

function initPointController() {
    window.pc = new PointController(mc, // mapController
            false, // renamablePoints
            false, // draggableMarkers
            true, // deletablePoints
            false, // havingStatus
            [], // statusIcons
            "http://www.veryicon.com/icon/png/System/Fugue/information%20button.png", // deleteIcon
            info, // deletePointFunction
            "http://arnirman.com/css/images/view_icon.png", // viewIcon
            focusToMarker // viewPointFunction
            );
}

function info(POIId) {
	var POIItem = getPOIItemById(POIId);
	if(!isEmpty(POIItem)) {
		alert(POIItem.address);
	}
}

function getPOIItemById(POIId) {
	for(var i=0; i<POIData.length; i++) {
		if(POIData[i].id == POIId) {
			return POIData[i];
		}
	}
	return null;
}

function drawDepots(container){
	
	showLoadingCover();
	
    eventClause = setDefaultValue('FROM <' + container + '> ', '');
				
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> '
				+ 'PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> '
				+ 'PREFIX schema: <http://schema.org/> '
				+ 'SELECT distinct ?name ?type ?lat ?long ?eventLabel ?eventDescription ?eventCategory ?eventCategory ?eventStart ?eventEnd '
				+ 'FROM <http://sandbox.fusepool.info:8181/ldp/tuscany-museums-1/y-csv-transformed> '
				+ 'FROM <http://sandbox.fusepool.info:8181/ldp/tuscany-restaurants-1/c-csv-transformed> '
				+ 'FROM <http://sandbox.fusepool.info:8181/ldp/tuscany-accommodations-1/v-csv-transformed> '
				+ 'FROM <http://sandbox.fusepool.info:8181/ldp/trentino-pharmacies/c> '
				+ eventClause
				+ 'WHERE { '
				+ '{ '
				+ '	?entity schema:address ?address ;  '
				+ '			geo:lat ?lat ;'
				+ '			geo:long ?long ;'
				+ '			rdf:type ?type ;'
				+ '			rdfs:label ?name .'
				+ '	} '
				+ '  UNION { '
				+ '	?entity schema:event ?event ; '
				+ '			geo:lat ?lat ; '
				+ '			geo:long ?long ; '
				+ '			rdf:type ?type ; '
				+ '			rdfs:label ?name . '
				+ '	?event rdfs:label ?eventLabel ; '
				+ '		   schema:description ?eventDescription ; '
				+ '		   schema:category ?eventCategory ; '
				+ '		   schema:startDate ?eventStart ; '
				+ '		   schema:endDate ?eventEnd . '
				+ '	FILTER ( ?eventStart >= "' + $('#startDate').val() + '"^^xsd:date && ?eventEnd <= "' + $('#startDate').val() + '"^^xsd:date ) '
				+ '	FILTER(langMatches(lang(?eventLabel), "it")) '
				+ '	FILTER(langMatches(lang(?eventCategory), "it")) '
				+ '	FILTER(langMatches(lang(?eventDescription), "it")) '
				+ '	} '
				// + '  FILTER ( ( ?lat >= 46.20 && ?lat <= 46.50 ) && ( ?long >= 11.50 && ?long <= 11.90 ) ) '
				+ '  FILTER ( ( ?lat >= ' + (currentLocation[1]-0.05) +' && ?lat <= ' + (currentLocation[1]+0.05) +' ) '
				+ ' && ( ?long >= ' + (currentLocation[0]-0.05) + ' && ?long <= ' + (currentLocation[0]+0.05) + ' ) ) '
				+ '} '
				+ 'ORDER BY ?name ';
		
	var request = $.ajax({
        type: 'POST',
        url: 'http://sandbox.fusepool.info:8181/sparql/select',
		headers: { 
			'Accept' : 'application/sparql-results+json',
			'Content-Type': 'application/sparql-query;charset=UTF-8'
		},
		data: query
    });
	
	request.done(function (data) {
		pc.deletePointItems();
		if(data.results.bindings.length > 0) {
			window.POIData = transformResult(data.results.bindings);
			pc.addPointItems(POIData);
		}
		pc.drawPoints("first");
		hideLoadingCover();
    });
	
	request.fail(function (xhr, textStatus, errorThrown) {
		alert('error');
		hideLoadingCover();
        console.error(xhr, textStatus, errorThrown);
    });
}

function transformResult(SPARQLResult) {
	var points = [];
	for(var i=0; i<SPARQLResult.length; i++) {
		if(isEmpty(SPARQLResult[i].name.value)) { continue; }
		var point = {};
		point.id = i;
		
		var obj = {};
		obj.lat = parseFloat(SPARQLResult[i].lat.value);
		obj.lon = parseFloat(SPARQLResult[i].long.value);
		point.latLon = obj;
		
		if(!isEmpty(SPARQLResult[i].eventCategory)) {
			point.address = SPARQLResult[i].name.value + ' [' + SPARQLResult[i].eventCategory.value + ']\n' + SPARQLResult[i].eventDescription.value + '\n\n (' + SPARQLResult[i].eventStart.value + ' - ' + SPARQLResult[i].eventEnd.value + ')';
			point.name = SPARQLResult[i].name.value + ' (event)';
		}
		else {
			point.address = SPARQLResult[i].name.value;
			point.name = SPARQLResult[i].name.value;
		}
		
		points.push(point);
	}
	return points;
}

function extractContainerURI() {
	var set = getURLParameter("events");
	if(set.length > 0) {
		window.events = set[0];
		return true;
	}
	else {
		return false;
	}
}

function getURLParameter(paramName){
	var result = [];
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var parameterName = sURLVariables[i].split('=');
		if (parameterName[0] === paramName){
			result.push(decodeURIComponent(parameterName[1]));
		}
	}
	return result;
}


