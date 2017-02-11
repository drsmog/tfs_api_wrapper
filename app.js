var rp = require('request-promise');


createTask();



function createTask() {


    //create user story

    // createNewUserStory().then(function(userStoryId) {
    //     console.log(userStoryId);
    // }).catch(function(err) {
    //     console.error(err.message);
    // });




    //create task / bug
    createTaskUnderUserStory(6)
        .then(function(result) {
            console.log(result);

        }).catch(function(err) {
            console.error(err);
        });




}

function createNewUserStory() {

    var options = {
        method: 'PATCH',
        uri: 'https://smogwhite.visualstudio.com/DefaultCollection/MyFirstProject/_apis/wit/workitems/$User Story?api-version=2.0',
        body: [{
            "op": "add",
            "path": "/fields/System.Title",
            "value": "Backlog From wrapper 2"
        }, {
            'op': 'add',
            'path': '/fields/System.IterationPath',
            'value': 'MyFirstProject\\Iteration 1'

        }],
        json: true,
        headers: {
            'Authorization': 'Basic c21vZzpBbGljZTEyMzQ1NkBA',
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
        uri: 'https://smogwhite.visualstudio.com/DefaultCollection/MyFirstProject/_apis/wit/workitems/$Task?api-version=2.0',
        body: [{
            "op": "add",
            "path": "/fields/System.Title",
            "value": "new task from api 5656"
        }, {
            'op': 'add',
            'path': '/fields/System.IterationPath',
            'value': 'MyFirstProject\\Iteration 1'

        }, {
            "op": "add",
            "path": "/relations/-",
            "value": {
                'rel': 'System.LinkTypes.Hierarchy-Reverse',
                'url': 'https://smogwhite.visualstudio.com/_apis/wit/workitems/6'
            }
        }],
        json: true,
        headers: {
            'Authorization': 'Basic c21vZzpBbGljZTEyMzQ1NkBA',
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
        uri: 'https://smogwhite.visualstudio.com/DefaultCollection/_apis/projects?api-version=2.0',

        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': 'Basic c21vZzpBbGljZTEyMzQ1NkBA'
        },
        json: true
    };

    rp(options)
        .then(function(result) {
            console.log(result);
        })
        .catch(function(err) {
            // API call failed...
        });

}

console.log("something on your mouse");
