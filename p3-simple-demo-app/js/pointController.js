
function PointController(mapController, renamablePoints, draggableMarkers, deletablePoints, havingStatus, statusIcons, deleteIcon, deletePointFunction, viewIcon, viewPointFunction){
    mapController = setDefaultValue(mapController, {});
    renamablePoints = setDefaultValue(renamablePoints, true);
    draggableMarkers = setDefaultValue(draggableMarkers, true);
    deletablePoints = setDefaultValue(deletablePoints, true);
    havingStatus = setDefaultValue(havingStatus, true);
    statusIcons = setDefaultValue(statusIcons, ["images/icons/status/1.png",
                                                "images/icons/status/2.png",
                                                "images/icons/status/3.png",
                                                "images/icons/status/4.png"]);
    deleteIcon = setDefaultValue(deleteIcon, "http://www.diningsmart.com/static/images/admin/delete.png");
    deletePointFunction = setDefaultValue(deletePointFunction, function(){});
    viewIcon = setDefaultValue(viewIcon, "http://arnirman.com/css/images/view_icon.png");
    viewPointFunction = setDefaultValue(viewPointFunction, function(){});
    
    this.mc = mapController;
    this.renamablePoints = renamablePoints;
    this.draggableMarkers = draggableMarkers;
    this.deletablePoints = deletablePoints;
    this.havingStatus = havingStatus;
    this.statusIcons = statusIcons;
    this.deleteIcon = deleteIcon;
    this.deletePointFunction = deletePointFunction;
    this.viewIcon = viewIcon;
    this.viewPointFunction = viewPointFunction;
    
    this.oTable = {};
    this.pointItems = [];
    
}

PointController.prototype.createColumnList = function() {
    var columnList = [];
     
    if(this.havingStatus) {
        columnList.push({ "sClass": "center iconWidth", "bSortable": true }); // status icon
    }    
    columnList.push({ "sTitle": "Name", "sClass": "center pointItemName", "bSortable": true }); // item name   
    columnList.push({ "sClass": "center iconWidth", "bSortable": true }); // index  
    if(this.deletablePoints) {
        columnList.push({ "sClass": "center iconWidth", "bSortable": false }); // delete icon
    }
    columnList.push({ "sClass": "center iconWidth", "bSortable": false }); // view icon
    
    return columnList;
};

PointController.prototype.addPointItems = function(pointItems) {
    for(var i=0; i<pointItems.length; i++){
        this.pointItems.push(pointItems[i]);
    }
};

PointController.prototype.getPointItems = function() {
    var pointItems = $.extend(true, [], this.pointItems); //clone
    return pointItems;
};

PointController.prototype.deletePointItem = function(id){
    var index = this.getPointIndexById(id);
    this.pointItems.splice(index,1);
};

PointController.prototype.deletePointItems = function(){
    this.pointItems = [];
};

PointController.prototype.reset = function(){
    $('#pointItemList tbody').empty();
    $('#pointItemList thead').empty();
    this.mc.clearLayer("first");
    //this.oTable.destroy();
    this.pointItems = [];
};

PointController.prototype.drawChangeFunction = function(event, pointId, geometry) {
    var ind = this.getPointIndexById(pointId);
    this.pointItems[ind].latLon.lat = geometry[1];
    this.pointItems[ind].latLon.lon = geometry[0];
    if(this.havingStatus) {
        this.pointItems[ind].status = 1;
        // TODO change-re hívódik, ezért túl erőforrás-igényes
        // this.oTable.fnUpdate("<abbr title='Geokódolási pontosság'><img src='"+this.statusIcons[0]+"' class='statusIcon' data-id='"+ind+"' /></abbr>", ind, 0);
    }
};

PointController.prototype.tableDrawCallback = function(nRow, aData, iDisplayIndex) { 
    if(this.renamablePoints) {
        var main = this;
        $('#pointItemList tbody td.pointItemName').addClass('editable');
        $('#pointItemList tbody td.pointItemName').editable(function (value, settings) {
                return (value);
            }, {
                onblur: 'submit',
                callback: function (value, settings) {
                    var aPos = main.oTable.fnGetPosition(this);
                    main.pointItems[aPos[0]].name = value;
                    main.oTable.fnUpdate(value, aPos[0], aPos[1]);
                    $('#pointItemList').prop('style', '');
                }
            });
        // $('#pointItemList tbody tr').on("mouseover", function(sdf) { console.log(sdf);});
    }
};

PointController.prototype.getPointIndexById = function(id){
    for(var i=0; i<this.pointItems.length; i++) {
        if(this.pointItems[i].id == id) {
            return i;
        }
    }
    return null;
};

PointController.prototype.onDeleteIconClick = function(event){
    this.deletePointFunction($(event.target).data('id'));
};

PointController.prototype.deleteRow = function(id){
    var tr = $('#pointItemList').find('.deleteIcon[data-id="'+id+'"]').parent().parent()[0];
    this.oTable.fnDeleteRow(tr);
};

PointController.prototype.onViewIconClick = function(event){
    this.viewPointFunction($(event.target).data('id'));
};

PointController.prototype.drawPoints = function(layerName, markerIcon, iconOffset){
	if(this.pointItems.length > 0) {
        
        // setting default values
        layerName = setDefaultValue(layerName, "first");
        markerIcon = setDefaultValue(markerIcon, "images/marker.png");
        iconOffset = setDefaultValue(iconOffset, [0.5,1]);

        // creating table column header
        var columnList = this.createColumnList();
        
        var tableRows = [];
        var row = [];
        var markerIconStyle = this.mc.createIconStyle(markerIcon, iconOffset);
        for(var i=0; i<this.pointItems.length; i++) {
            var item = this.pointItems[i];
            
            // putting markers to the map
            var markerTextStyle = this.mc.createTextStyle((i+1), "#000000", [0, -20]);
            this.mc.addMarker(layerName, item.latLon.lon, item.latLon.lat, [markerIconStyle, markerTextStyle], item.id, this.draggableMarkers, $.proxy(this.drawChangeFunction, this), true);

            // creating table rows
            var row = [];
            if(this.havingStatus) {                
                row.push("<abbr title='Geokódolási pontosság'><img src='"+this.statusIcons[item.status-1]+"' data-id='"+item.id+"' class='statusIcon' /></abbr>");  // status icon
            }
            row.push(item.name);    // item name  
            row.push(i+1);  // index
            if(this.deletablePoints) {
                row.push( "<img src='"+this.deleteIcon+"' class='deleteIcon actionIcon' title='info' data-id='"+item.id+"' />"); // info icon
            }
            row.push( "<img src='"+this.viewIcon+"' class='viewIcon actionIcon' title='show' data-id='"+item.id+"' />"); // view icon
            tableRows.push(row);
        }
        
        // table settings
        var main = this;
        var settings = {
            destroy: true,
            aaData: tableRows,
            aoColumns: columnList,
            bPaginate: false,
            bInfo: false,
            bSort: true,
            bFilter: false,
            bStateSave: true,
            bAutoWidth: false,
            asStripeClasses: ['odd', 'even'],
            fnDrawCallback: function(nRow, aData, iDisplayIndex){ main.tableDrawCallback(nRow, aData, iDisplayIndex); }
        };

        this.oTable = $('#pointItemList').dataTable(settings);
        $('#pointItemList tbody th.iconWidth').prop('style', 'width: 22px;');
        
        $('.viewIcon').on('click', function(event) { main.onViewIconClick(event); });
        if(this.deletablePoints) {
             $('.deleteIcon').on('click', function(event) { main.onDeleteIconClick(event); });
        }
        
        this.mc.updateSize();
    }
    else {
       // console.log('No points, nothing to do here.');
    }
};