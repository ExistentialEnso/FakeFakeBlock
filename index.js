#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const Twitter = require("twitter");

program
    .version('0.1.0')
    .option('-u, --username [username]', 'Username')
    .parse(process.argv);

console.log("Fetching followers for: " + program.username);

var client = new Twitter({
    consumer_key: 'wMeDS3fHFxC3vvx0R8uY7JMCh',
    consumer_secret: 'XbJRmgAYB5o5CFc4sSjvq7MMWsktyn6ofBTF8blkNmqP7pwQUd',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAG%2Fo2QAAAAAAcuno8WQMn89Y1czKUnWtWcvXf6o%3DviMHZl1lOGtidtUEDdV9a3vi1ZqM5JCZyjj4JryAwV0wl6r23M'
});

function fetchFollowerIds(username, cursor, currentIds, callback) {
    var body = {
        screen_name: username,
        cursor: cursor
    };

    client.get('followers/ids', body, function(error, data, response) {
        if(error) {
            if(error.length && error.length > 0 && error[0].code === 88) {
                console.log("Rate limit exceeded. Trying again in 15 minutes.");
                setTimeout(function() {
                    fetchFollowerIds(username, cursor, currentIds, callback);
                }, 900000);
            } else {
                console.log(error);
                callback([]);
            }
        } else {
            console.log(data);
            currentIds = currentIds.concat(data.ids);

            if(data.next_cursor !== 0) {
                fetchFollowerIds(username, data.next_cursor, currentIds, callback);
            } else {
                callback(currentIds);
            }
        }
    });
}

fetchFollowerIds(program.username, -1, [], function(ids) {
    formatted = '';

    for(var i=0; i<ids.length; i++) {
        formatted += ids[i] + "\r\n";
    }

    fs.writeFile(program.username + "_block_list.csv", formatted, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved to: " + program.username + "_block_list.csv");
    });
});