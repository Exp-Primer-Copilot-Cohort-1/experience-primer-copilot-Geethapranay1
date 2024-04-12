// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

// POST /comments
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        const comments = JSON.parse(data);
        const newComment = req.body;
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Comment added');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Run the server
// $ node comments.js
// Server is running on http://localhost:3000
// Open your browser and enter http://localhost:3000
// You will see the message "Cannot GET /"
// To test the server, you need to use a tool like Postman

// Test the GET /comments endpoint
// Open Postman
// Create a new request and set the method to GET
// Enter the URL http://localhost:3000/comments
// Click the Send button
// You will see the response body with the content of comments.json
// Test the POST /comments endpoint
// Create a new request and set the method to POST
// Enter the URL http://localhost:3000/comments
// Set the body to raw and select JSON
// Enter the following JSON data
// {
//   "name": "Alice",
//   "message": "Hello, World!"
// }
// Click the Send button
// You will see the response body with the message "Comment added"
// Open Postman
// Create a
