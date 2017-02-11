var rp = require('request-promise');


createTask();




function createTask() {

    createNewUserStory()
    .then(createTaskUnderUserStory)
    .catch(function(err) {
        console.error(err.message);
    });



}

function createNewUserStory() {

    var options = {
        method: 'PATCH',
        uri: 'http://172.17.111.16:8080/tfs/DefaultCollection/testproject/_apis/wit/workitems/$Product Backlog Item?api-version=2.0',
        body: [{
            "op": "add",
            "path": "/fields/System.Title",
            "value": "Backlog From wrapper 3434"
        }, {
            'op': 'add',
            'path': '/fields/System.IterationPath',
            'value': 'testproject\\Sprint 3'

        }],
        json: true,
        headers: {
            'Authorization': 'Basic aXN2YW5pZHplOlRmc3VzZXIxMjMj',
            'Content-Type': 'application/json-patch+json'
        }
    };

    return rp(options)
        .then(function(body) {
            return body.id;
        });

}

function createTaskUnderUserStory(userStoryId) {


    var options = {
        method: 'PATCH',
        uri: 'http://172.17.111.16:8080/tfs/DefaultCollection/testproject/_apis/wit/workitems/$Task?api-version=2.0',
        body: [{
            "op": "add",
            "path": "/fields/System.Title",
            "value": "new task from api 345"
        }, {
            'op': 'add',
            'path': '/fields/System.IterationPath',
            'value': 'testproject\\Sprint 3'

        }, {
            "op": "add",
            "path": "/relations/-",
            "value": {
                'rel': 'System.LinkTypes.Hierarchy-Reverse',
                'url': 'http://172.17.111.16:8080/tfs/_apis/wit/workitems/' + userStoryId
            }
        }],
        json: true,
        headers: {
            'Authorization': 'Basic aXN2YW5pZHplOlRmc3VzZXIxMjMj',
            'Content-Type': 'application/json-patch+json'
        }
    };

    return rp(options)
        .then(function(body) {
            console.log(body);
            return body.id;

        });
}

function getProjects() {

    var options = {
        uri: 'http://172.17.111.16:8080/tfs/DefaultCollection/_apis/projects?api-version=2.0',

        headers: {

            'Authorization': 'Basic aXN2YW5pZHplOlRmc3VzZXIxMjMj'
        },
        json: true
    };

    rp(options)
        .then(function(result) {
            console.log(result);
        })
        .catch(function(err) {
          console.error(err.message);

            // API call failed...
        });

}

console.log("something on your mouse");
