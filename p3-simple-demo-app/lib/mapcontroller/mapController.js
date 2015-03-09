if (typeof ol === 'undefined') {
    console.log('OpenLayers must be load before this lib.');
}

function MapController() {
    this.baseLayers = [];    // [ layerName, tileLayer, tileSource ]
    this.vectorLayers = [];  // [ layerName, vectorLayer, vectorSource ]
    this.interactions = [];  // [ interactionName, interaction ]
    this.mouseclickstate = 0;
}

MapController.prototype.initMap = function (divId) {
    divId = setDefaultValue(divId, "map");

    this.divId = divId;
    this.map = new ol.Map({
        target: divId,
        layers: [],
        view: new ol.View({
            center: ol.proj.transform([10.947157085473691, 46.01793310172717], 'EPSG:4326', 'EPSG:3857'),
            zoom: 8
        })
    });
    /*
     var main = this;
     $('#'+divId).bind('mousemove', function(e){
		 main.mouseclickstate = e.buttons;
		 if(main.mouseclickstate == 1) {
			 console.log(e);
		 }
     });*/	
};

MapController.prototype.createTextStyle = function (text, color, offset) {
    color = setDefaultValue(color, "#000000");
    offset = setDefaultValue(offset, [0, 0]);

    var textStyle = new ol.style.Style({
        text: new ol.style.Text({
            text: text,
            fill: new ol.style.Fill({
                color: color
            }),
            offsetX: offset[0],
            offsetY: offset[1]
        })
    });
    return textStyle;
};

MapController.prototype.createIconStyle = function (src, anchor, opacity) {
    anchor = setDefaultValue(anchor, [0, 0]);
    opacity = setDefaultValue(opacity, 1);

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({src: src, anchor: anchor, opacity: opacity})
    });
    return iconStyle;
};

MapController.prototype.createStrokeStyle = function (color, width, opacity) {
    color = setDefaultValue(color, "#000000");
    width = setDefaultValue(width, 2);
    opacity = setDefaultValue(opacity, 1);

    var strokeStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({color: color, opacity: opacity, width: width})
    });
    return strokeStyle;
};

MapController.prototype.getFeatureByIdOnLayer = function (layerName, id) {
    var layerItem = this.getVectorLayerItemByName(layerName);
    var feature = layerItem[2].getFeatureById(id);
    return feature;
};

MapController.prototype.setCenterToMarker = function (layerName, id) {
    var feature = this.getFeatureByIdOnLayer(layerName, id);
    var view = this.map.getView();
    view.setCenter(feature.getGeometry().getCoordinates());
};

MapController.prototype.setZoom = function (level) {
    this.map.getView().setZoom(level);
};

MapController.prototype.clearLayer = function (layerName) {
    var layerItem = this.getVectorLayerItemByName(layerName);
    layerItem[2].clear();
};

MapController.prototype.deleteMarker = function (layerName, id) {
    var layerItem = this.getVectorLayerItemByName(layerName);
    if (!$.isEmptyObject(layerItem)) {
        var feature = layerItem[2].getFeatureById(id);
        layerItem[2].removeFeature(feature);

        var interactionItem = this.getInteractionItemByName(id);
        if (!$.isEmptyObject(interactionItem)) {
            this.map.removeInteraction(interactionItem[1]);
            this.removeInteraction(id);
        }
    }
};

MapController.prototype.addMarkerWOTransformation = function (layerName, coo, styleSet, id, draggable, dragChangeFunction, visibleDragPoint) {
    styleSet = setDefaultValue(styleSet, []);
    id = setDefaultValue(id, null);
    draggable = setDefaultValue(draggable, false);
    dragChangeFunction = setDefaultValue(dragChangeFunction, function () {
    });
    visibleDragPoint = setDefaultValue(visibleDragPoint, true);

    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(coo)
    });
    iconFeature.setStyle(styleSet);
    iconFeature.setId(id);

    var layerItem = this.getVectorLayerItemByName(layerName);
    layerItem[2].addFeature(iconFeature); // adding feature to the Source of the Vector layer
};

MapController.prototype.addMarker = function (layerName, lon, lat, styleSet, id, draggable, dragChangeFunction, visibleDragPoint) {
    styleSet = setDefaultValue(styleSet, []);
    id = setDefaultValue(id, null);
    draggable = setDefaultValue(draggable, false);
    dragChangeFunction = setDefaultValue(dragChangeFunction, function () {
    });
    visibleDragPoint = setDefaultValue(visibleDragPoint, true);

    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
    });
    iconFeature.setStyle(styleSet);
    iconFeature.setId(id);

    var layerItem = this.getVectorLayerItemByName(layerName);
    layerItem[2].addFeature(iconFeature); // adding feature to the Source of the Vector layer

    if (draggable) {
        var modify = new ol.interaction.Modify({
            features: new ol.Collection([iconFeature]),
            pixelTolerance: 13
        });

        var main = this;
        iconFeature.on('change', function (event) {
            var coo = this.getGeometry().getCoordinates();
            dragChangeFunction(event, id, ol.proj.transform(coo, 'EPSG:3857', 'EPSG:4326'));
        }, iconFeature);

        if (!visibleDragPoint) {
            modify.setStyle(new ol.style.Style({stroke: null, fill: null}));
        }
        this.map.addInteraction(modify);
        this.interactions.push([id, modify]);
    }
};

MapController.prototype.deletePolygon = function (layerName, id) {
    var layerItem = this.getVectorLayerItemByName(layerName);
    if (!$.isEmptyObject(layerItem)) {
        var feature = layerItem[2].getFeatureById(id);
        layerItem[2].removeFeature(feature);

        var interactionItem = this.getInteractionItemByName(id);
        if (!$.isEmptyObject(interactionItem)) {
            this.map.removeInteraction(interactionItem[1]);
            this.removeInteraction(id);
        }
    }
};

MapController.prototype.addLineString = function (layerName, cooArray, styleSet, id) {
    styleSet = setDefaultValue(styleSet, []);
    id = setDefaultValue(id, null);

    var points = [];
    for (var i = 0; i < cooArray.length; i++) {
        var point = ol.proj.transform([cooArray[i][0], cooArray[i][1]], 'EPSG:4326', 'EPSG:3857');
        points.push(point);
    }
    var feature = new ol.Feature({
        geometry: new ol.geom.LineString(points)
    });

    feature.setStyle(styleSet);
    feature.setId(id);

    var layerItem = this.getVectorLayerItemByName(layerName);
    layerItem[2].addFeature(feature); // adding feature to the Source of the Vector layer
};

MapController.prototype.removeInteraction = function (interactionName) {
    for (var i = 0; i < this.interactions.length; i++) {
        if (this.interactions[i][0] == interactionName) {
            this.interactions.splice(i, 1);
            return;
        }
    }
};

MapController.prototype.getInteractionItemByName = function (interactionName) {
    var interactionItem = [];
    for (var i = 0; i < this.interactions.length; i++) {
        if (this.interactions[i][0] == interactionName) {
            interactionItem = this.interactions[i];
            return interactionItem;
        }
    }
    return {};
};

MapController.prototype.getVectorLayerItemByName = function (layerName) {
    var layerItem = [];
    for (var i = 0; i < this.vectorLayers.length; i++) {
        if (this.vectorLayers[i][0] == layerName) {
            layerItem = this.vectorLayers[i];
            return layerItem;
        }
    }
    return {};
};

MapController.prototype.addBaseLayer = function (layerName, sourceType, options) {
    options = setDefaultValue(options, {layer: "sat"});

    switch (sourceType) {
        case "OSM":
            var tileSource = new ol.source.OSM();
            var tileLayer = new ol.layer.Tile({source: tileSource});
            this.baseLayers.push([layerName, tileLayer, tileSource]);
            this.map.addLayer(tileLayer);
            break;
        case "MapQuest":
            var tileSource = new ol.source.MapQuest(options);
            var tileLayer = new ol.layer.Tile({source: tileSource});
            this.baseLayers.push([layerName, tileLayer, tileSource]);
            this.map.addLayer(tileLayer);
            break;
    }
};

MapController.prototype.addVectorLayer = function (layerName) {

    layerName = setDefaultValue(layerName, "layer-" + this.vectorLayers.length); // törlés utáni hozzáadásnál ez hibaforrás

    var vectorSource = new ol.source.Vector({features: []});
    var vectorLayer = new ol.layer.Vector({source: vectorSource});

    this.vectorLayers.push([layerName, vectorLayer, vectorSource]);

    this.map.addLayer(vectorLayer);
};

MapController.prototype.updateSize = function () {
    this.map.updateSize();
};

MapController.prototype.setDefaultValue = function (variable, defaultValue) {
    return typeof variable !== 'undefined' ? variable : defaultValue;
};
