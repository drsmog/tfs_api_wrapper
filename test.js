var tfs = new require('./tfsapi.js')({
    instance: '172.17.111.16:8080/tfs',
    projectName: 'testproject',
    collectionName: 'DefaultCollection',
    tfsApiVersion: '2.0',
    userName: 'isvanidze',
    password: 'Tfsuser123#'
});

tfs.getProjects()
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err) {
        console.error(err);
    });

//
// //Create Work item under iteration (backlog)
// tfs.createWorkItem({
//         projectName: 'testproject',
//         workItemTypeName: 'Product Backlog Item',
//         iterationName: 'Sprint 3',
//         title: 'sxcvxcvsdf',
//         description: 'description aaaaa'
//     })
//     .then(function(result) {
//         console.log('Status Success');
//         console.log(result);
//     })
//     .catch(function(err) {
//         console.error(err.message);
//     });





tfs.createLinkedWorkItem({
        projectName: 'testproject',
        workItemTypeName: 'Task',
        iterationName: 'Sprint 3',
        title: 'Linked Task',
        description: 'Task Description',
        parentWorkItemId: '15'
    })
    .then(function(result) {
        console.log('Status Success');
        console.log(result);
    })
    .catch(function(err) {
        console.error(err.message);
    });



console.log('done');
