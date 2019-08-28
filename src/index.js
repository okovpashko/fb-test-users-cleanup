#!/usr/bin/env node

'use strict'

const program = require('commander');
const Queue = require('queue');
const ProgressBar = require('progress');
const initGraphApi = require('./graph-api');

program
    .option('-i, --app-id <id>', 'Facebook app id')
    .option('-t, --app-token <token>', 'Facebook app token')
    .option('-c --concurrency <number>', 'concurrency level for deleting request ', 5)
    .option('-m --max-users <number>', 'maximum amount of user to delete per run', 100);

program.parse(process.argv);

if (!program.appId) {
    throw new Error('Facebook app id is required');
}

if (!program.appToken) {
    throw new Error('Facebook app token is required');
}

const graphApi = initGraphApi({appId: program.appId, appToken: program.appToken});

graphApi.fetchUsers({
    limit: program.maxUsers,
})
    .then(response => {
        const q = new Queue({concurrency: program.concurrency});

        response.data.forEach(user => {
            q.push(() => graphApi.deleteUser(user.id));
        });

        const progress = new ProgressBar(':bar Deleting :current of :total users', {total: q.length});

        q.on('success', () => {
            progress.tick();
        });

        q.start((err) => {
            if (err) {
                console.error('Queue error: ', err.message);
                return;
            }

            console.log('Finished');
        });
    })
    .catch(error => {
        if (error.name === 'StatusCodeError') {
            console.error('Graph API error: ', error.message);
        } else {
            console.error('Unknown error: ', error);
        }
    });