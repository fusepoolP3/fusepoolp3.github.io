var global = {};

function initViewSpecificStuff() {
    switch (global.currentView) {
        case 'depotList':
            depotListInit();
            break;
        case 'depotImport':
            depotImportInit();
            break;
        case 'planning':
            planningInit();
            break;
        case 'users':
            usersInit();
            break;
        case 'settings':
            settingsInit();
            break;
        case 'projects':
            projectsInit();
            break;
        case 'project':
            projectInit();
            break;
        case 'index':
            break;
    }
}

function initAjaxHandlers(parameters) {
    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
        console.log("ajax error"); //TODO
    });
}

function initDraggers(leftSideSelector, draggerSelector, rightSideSelector, mapController) {

    // setting default values
    mapController = setDefaultValue(mapController, mc);

    $(draggerSelector).draggable({
        axis: "x",
        drag: function (event, ui) {
            var leftCalcWidth = ui.position.left;
            if (($(document).width() - ui.position.left) > 80 && leftCalcWidth > 80) {
                $(leftSideSelector).css('width', leftCalcWidth + 'px');
                $(rightSideSelector).css('left', (ui.position.left + 6) + 'px');
            }
            else {
                event.type = 'mouseup';
                $(draggerSelector).trigger(event);
            }
            mapController.updateSize();
        }
    });
}

function initNavbarHover() {
    var mq = window.matchMedia('(min-width: 768px)');
    if (mq.matches) {
        $('ul.navbar-nav > li').addClass('hovernav');
    } else {
        $('ul.navbar-nav > li').removeClass('hovernav');
    }
    ;

    if (matchMedia) {
        var mq = window.matchMedia('(min-width: 768px)');
        mq.addListener(WidthChange);
        WidthChange(mq);
    }
    function WidthChange(mq) {
        if (mq.matches) {
            $('ul.navbar-nav > li').addClass('hovernav');
        } else {
            $('ul.navbar-nav > li').removeClass('hovernav');
        }
    }
    ;
}

function getDateTimeString(timestamp) {
    var t = new Date(timestamp);
    t.toLocaleString();
    return t;
}

function setDefaultValue(variable, defaultValue) {
    return typeof variable !== 'undefined' ? variable : defaultValue;
}

function getFormattedDistance(distance) {
    return (distance / 1000).toFixed(1) + ' km';
}

function getFormattedDuration(duration) {
    var sec_num = parseInt(duration, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 1) {
        hours = "";
    }
    else {
        hours = hours+":";
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + '' + minutes + ':' + seconds;
    return time;
}

Number.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
};

function getTestDepotData() {
    return {"Data": [{"id": 16, "name": "Tesco", "latLon": {"lat": 47.02, "lon": 19.02}, "address": "Cím 2"}, {"id": 17, "name": "Lidl", "latLon": {"lat": 47.03, "lon": 19.03}, "address": "Cím 3"}, {"id": 18, "name": "Aldi", "latLon": {"lat": 47.04, "lon": 19.04}, "address": "Cím 4"}, {"id": 19, "name": "Coop", "latLon": {"lat": 47.05, "lon": 19.05}, "address": "Cím 5"}], "Success": "true"};
}

/** Showing '#loadingCover' popup panel. */
function showLoadingCover() {
    $('#loadingCover').hide().fadeIn(200);
}

/** Hiding '#loadingCover' popup panel. */
function hideLoadingCover() {
    $('#loadingCover').show().fadeOut(200);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

/** Calling all the patches that the app needs. */
function initPatches() {
    indexOfPatch();
    objectKeyPatch();
}

/** Giving IE support for the indexOf() JS function. */
function indexOfPatch() {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
                        this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
}

/** Giving IE support for JS Object key handling. */
function objectKeyPatch() {
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                    dontEnums = [
                        'toString',
                        'toLocaleString',
                        'valueOf',
                        'hasOwnProperty',
                        'isPrototypeOf',
                        'propertyIsEnumerable',
                        'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null)
                    throw new TypeError('Object.keys called on non-object');

                var result = [];

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop))
                        result.push(prop);
                }

                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i]))
                            result.push(dontEnums[i]);
                    }
                }
                return result;
            };
        })();
    }
    ;
}

function getExtension(filename) {
    var a = filename.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop().toLowerCase();
}

function isEmpty(data) {
    if (typeof data === 'undefined' || data === '' || data === null || data.length == 0) {
        return true;
    }
    return false;
}

/**
 * Megniytja a dialógust
 */
function openDialog(id) {
    if ($('#' + id).length) {
        $('#' + id).dialog('open');
    }
    return false;
}

/**
 * Bezárja a dialógust
 */
function closeDialog(id) {
    if ($('#' + id).length) {
        $('#' + id).dialog('close');
    }
    return false;
}

/**
 * Létrehoz egy alert dialógust
 */
function createAlertDialog(bodyText) {
    $('<div id="alertDialog" style="padding-left: 1px; padding-right: 1px; padding-bottom: 0px;"></div>').appendTo('body')
            .html(
                    '<div class="col-sm-12">'
                    + '<div class="col-sm-2 text-left" style="padding-left: 0px; padding-right: 5px;">'
                    + '<img src="images/exclamation.png" height="40" width="40" style="margin: 0 auto;">'
                    + '</div>'
                    + '<div class="col-sm-10 text-left" style="padding-left: 20px; padding-right: 0px;">'
                    + '<p>'
                    + bodyText
                    + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<div class="col-sm-12" >'
                    + '<hr style="margin: 0 !important;">'
                    + '</div>'
                    + '<div class="col-sm-12 text-right" style="width: inherit; margin-top: 10px; margin-bottom: 10px; float: right;">'
                    + '<button id="btnCancel" type="button" class="btn btn-default" style="width: 80px" title="Bezárás" onclick="return closeDialog(\'alertDialog\');">'
                    + 'Bezárás'
                    + '</button>'
                    + '</div>'
                    ).dialog({
        modal: true, title: 'Hiba történt', autoOpen: true,
        width: 300, resizable: false,
        position: {my: "center", at: "center", collision: 'fit'},
        close: function (event, ui) {
            $(this).remove();
        },
        show: {
            duration: 100
        },
        hide: {
            duration: 100
        }
    }).dialog("widget").removeClass('ui-widget');
    ;
}

/**
 * Létrehoz egy success dialógust
 */
function createSuccessDialog(bodyText) {
    $('<div id="successDialog" style="padding-left: 1px; padding-right: 1px; padding-bottom: 0px;"></div>').appendTo('body')
            .html(
                    '<div class="col-sm-12">'
                    + '<div class="col-sm-2 text-left" style="padding-left: 0px; padding-right: 5px; padding-bottom: 5px;">'
                    + '<img src="images/check.png" height="40" width="40" style="margin: 0 auto;">'
                    + '</div>'
                    + '<div class="col-sm-10 text-left" style="padding-left: 20px; padding-right: 0px;">'
                    + '<p>'
                    + bodyText
                    + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<div class="col-sm-12" >'
                    + '<hr style="margin: 0 !important;">'
                    + '</div>'
                    + '<div class="col-sm-12 text-right" style="width: inherit; margin-top: 10px; margin-bottom: 10px; float: right;">'
                    + '<button id="btnCancel" type="button" class="btn btn-default" style="width: 80px" title="Bezárás" onclick="return closeDialog(\'successDialog\');">'
                    + 'Bezárás'
                    + '</button>'
                    + '</div>'
                    ).dialog({
        modal: true, title: 'Siker', autoOpen: true,
        width: 300, resizable: false,
        position: {my: "center", at: "center", collision: 'fit'},
        close: function (event, ui) {
            $(this).remove();
        },
        show: {
            duration: 100
        },
        hide: {
            duration: 100
        }
    }).dialog("widget").removeClass('ui-widget');
    ;
}

/**
 * Létrehoz egy confirm dialógust
 */
function createConfirmDialog(titleText, okBtnText, cancelBtnText, bodyText, confrimFunctionText) {
    $('<div id="confirmDialog" style="padding-left: 1px; padding-right: 1px; padding-bottom: 0px;"></div>').appendTo('body')
            .html(
                    '<div class="col-sm-12">'
                    + '<div class="col-sm-2 text-left" style="padding-left: 0px; padding-right: 5px;">'
                    + '<img src="images/question.png" height="40" width="40" style="margin: 0 auto;">'
                    + '</div>'
                    + '<div class="col-sm-10 text-left" style="padding-left: 5px; padding-right: 0px;">'
                    + '<p>'
                    + bodyText
                    + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<div class="col-sm-12" >'
                    + '<hr style="margin: 0 !important;">'
                    + '</div>'
                    + '<div class="col-sm-12 text-right" style="width: inherit; margin-top: 10px; margin-bottom: 10px; float: right;">'
                    + '<table><tr><td style="padding-right: 10px;">'
                    + '<button id="btnOk" type="button" style="width: 80px;" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="' + okBtnText + '" onclick="' + confrimFunctionText + '">'
                    + '<span class="glyphicon glyphicon-ok"></span> <span class="glyphicon-button">' + okBtnText + '</span>'
                    + '</button>'
                    + '</td><td>'
                    + '<button id="btnCancel" type="button" class="btn btn-primary" title="' + cancelBtnText + '" onclick="return closeDialog(\'confirmDialog\');" autofocus>'
                    + '<span class="glyphicon glyphicon-remove"></span> <span class="glyphicon-button">' + cancelBtnText + '</span>'
                    + '</button>'
                    + '</td></tr></table>'
                    + '</div>'

                    ).dialog({
        modal: true, title: titleText, autoOpen: true,
        width: 400, resizable: false,
        position: {my: "center", at: "center", collision: 'fit'},
        close: function (event, ui) {
            $(this).remove();
        },
        show: {
            duration: 100
        },
        hide: {
            duration: 100
        }
    }).dialog("widget").removeClass('ui-widget');
}