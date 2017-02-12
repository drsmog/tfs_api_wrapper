var rp = require('request-promise');

function TFSAPI(options) {
    this.instance = options.instance;
    this.projectName = options.instance;
    this.collectionName = options.collectionName;
    this.tfsApiVersion = options.tfsApiVersion;
    this.userName = options.userName;
    this.password = options.password;
    this.accessToken = new Buffer(this.userName + ':' + this.password).toString('base64');

}

TFSAPI.prototype.getProjects = function() {

    var uri =
        'http://' + this.instance + '/' +
        this.collectionName +
        '/_apis/projects?api-version=' + this.tfsApiVersion;

    console.log(uri);

    var options = {
        uri: uri,
        headers: {
            'Authorization': 'Basic ' + this.accessToken
        },
        json: true
    };

    return rp(options);

};

TFSAPI.prototype.getProjectDetails = function(projectName) {

    var uri =
        'http://' + this.instance + '/' +
        this.collectionName +
        '/_apis/projects/' + projectName + '?api-version=' + this.tfsApiVersion;

    var options = {
        uri: uri,
        headers: {
            'Authorization': 'Basic ' + this.accessToken
        },
        json: true
    };

    return rp(options);

};

TFSAPI.prototype.createWorkItem = function(params) {

    var uri =
        'http://' + this.instance + '/' +
        this.collectionName +
        '/' + params.projectName +
        '/_apis/wit/workitems/$' + params.workItemTypeName + '?api-version=' + this.tfsApiVersion;

    var options = {
        method: 'PATCH',
        uri: uri,
        body: [{
            "op": "add",
            "path": "/fields/System.Title",
            "value": params.title
        }, {
            'op': 'add',
            'path': '/fields/System.IterationPath',
            'value': params.projectName + '\\' + params.iterationName

        }, {
            'op': 'add',
            'path': '/fields/System.Description',
            'value': params.description
        }],
        json: true,
        headers: {
            'Authorization': 'Basic ' + this.accessToken,
            'Content-Type': 'application/json-patch+json'
        }
    };

    return rp(options)
        .then(function(body) {
            return body.id;
        });


};

TFSAPI.prototype.createLinkedWorkItem = function(params) {

    var uri =
        'http://' + this.instance + '/' +
        this.collectionName +
        '/' + params.projectName +
        '/_apis/wit/workitems/$' + params.workItemTypeName + '?api-version=' + this.tfsApiVersion;

    var options = {
        method: 'PATCH',
        uri: uri,
        body: [{
            "op": "add",
            "path": "/fields/System.Title",
            "value": params.title
        }, {
            'op': 'add',
            'path': '/fields/System.IterationPath',
            'value': params.projectName + '\\' + params.iterationName

        }, {
            'op': 'add',
            'path': '/fields/System.Description',
            'value': params.description
        }, {
            "op": "add",
            "path": "/relations/-",
            "value": {
                'rel': 'System.LinkTypes.Hierarchy-Reverse',
                'url': 'http://' + this.instance + '/_apis/wit/workitems/' + params.parentWorkItemId
            }
        }],
        json: true,
        headers: {
            'Authorization': 'Basic ' + this.accessToken,
            'Content-Type': 'application/json-patch+json'
        }
    };

    return rp(options);



};

module.exports = function (options) {
  return new TFSAPI(options);
} ;
