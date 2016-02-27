/* global client, plugin */
/* global MSG_COMMASP */

// PLUGIN ENVIRONMENT //

plugin.id = 'activity-in-title';

plugin.init =
function _init(glob) {
    this.major = 1;
    this.minor = 0;
    this.version = this.major + '.' + this.minor + ' (27 Feb 2016)';
    this.description = 'Shows activity status in titlebar. ' +
    'By James Ross <chatzilla-plugins@james-ross.co.uk>.';

    this.prefary.push(['display.symbol', false, '']);
    this.prefary.push(['display.crop', 0, '']);
    this.prefary.push(['titlebar.event', false, '']);
    this.prefary.push(['titlebar.chat', true, '']);
    this.prefary.push(['titlebar.stalk', true, '']);

    return 'OK';
}

plugin.enable =
function _enable() {
    client.mainWindow.updateTitle = observeAfter(client.mainWindow.updateTitle, updateTitle);
    client.mainWindow.updateTitle();
    return true;
}

plugin.disable =
function _disable() {
    client.mainWindow.updateTitle = unwrap(client.mainWindow.updateTitle);
    return true;
}

plugin.onPrefChanged =
function _onPrefChanged() {
    client.mainWindow.updateTitle();
}

// UTILITIES //

function observeAfter(original, wrapper) {
    var wrapped = function () {
        var rv = original ? original.apply(this, arguments) : undefined;
        try {
            wrapper.apply(this, arguments);
        } catch (ex) { }
        return rv;
    };
    wrapped[plugin.id + '-original'] = original;
    return wrapped;
}

function unwrap(wrapped) {
    return wrapped[plugin.id + '-original'] || wrapped;
}

// PLUGIN WORK //

function updateTitle(obj) {
    if (!(('currentObject' in client) && client.currentObject) || (obj && obj != client.currentObject)) {
        return;
    }
    var activity = [[], [], []];
    for (var i in client.activityList) {
        if (i in client.viewsArray) {
            if (plugin.prefs['display.symbol']) {
                var name = client.activityList[i];
            } else {
                var view = client.viewsArray[i].source;
                name = view.displayName || view.viewName;
                if (plugin.prefs['display.crop'] > 0) {
                    name = name.substr(0, plugin.prefs['display.crop']);
                }
            }
            activity['!+-'.indexOf(client.activityList[i])].push(name);
        }
    }
    var title = '';
    if (plugin.prefs['display.symbol']) {
        if (activity[0].length > 0 && plugin.prefs['titlebar.stalk']) {
            title = title + activity[0].join('');
        }
        if (activity[1].length > 0 && plugin.prefs['titlebar.chat']) {
            title = title + activity[1].join('');
        }
        if (activity[2].length > 0 && plugin.prefs['titlebar.event']) {
            title = title + activity[2].join('');
        }
    } else {
        if (activity[0].length > 0 && plugin.prefs['titlebar.stalk']) {
            title = title + '<' + activity[0].join(MSG_COMMASP) + '> ';
        }
        if (activity[1].length > 0 && plugin.prefs['titlebar.chat']) {
            title = title + '[' + activity[1].join(MSG_COMMASP) + '] ';
        }
        if (activity[2].length > 0 && plugin.prefs['titlebar.event']) {
            title = title + '(' + activity[2].join(MSG_COMMASP) + ') ';
        }
    }
    if (title.length > 0) {
        document.title = title + document.title;
    }
}
