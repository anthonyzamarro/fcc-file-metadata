'use strict';

var express = require('express');
var cors = require('cors');

// ###    User stories:
// 1. I can submit a form that includes a file upload.
// 2. The form file input field  has the "name" attribute set to "upfile". We rely on this in testing.
// 3. When I submit something, I will receive the file name and size in bytes within the JSON response


// require and use "multer"...

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


// POST Single File
// app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
//   res.send({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
// });


// POST multiple files
app.post('/api/fileanalyse', upload.array('upfile', 10), (req, res, next) => {
  let mappedFiles = req.files.map(file => {
    return {name: file.originalname, type: file.mimetype, size: file.size};
  });
  // console.log(mappedFiles)
  res.send(mappedFiles);
  // next();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
