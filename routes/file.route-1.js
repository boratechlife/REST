let express = require('express');
let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
let multer = require('multer');
let router = express.Router();
let fs = require('fs');

let rawdata = fs.readFileSync('./data/publication.json');
let publications = JSON.parse(rawdata);


const DIR = './public/';
let File = require('../models/File');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});


var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File type not accepted (.docx, .doc)'));
        }
    }
});

router.post('/multi-images-upload', upload.array('file1', 8), (req, res, next) => {
    const reqFiles = [];

    const url = req.protocol + '://' + req.get('host')

    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }

    const user = new File({
        _id: new mongoose.Types.ObjectId(),
        imagesArray: reqFiles
    });

    user.save().then(result => {
        res.status(201).json({
            message: "Uploaded!",
            userCreated: {
                _id: result._id,
                imagesArray: result.imagesArray
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    File.find().then(response => {
        res.status(200).json({
            message: "Images fetched!",
            posts: response
        });
    });
});

router.get("/publication/search", function(req, res){
    var search = req.query.search
    var tableData=[
        {
          trialID:"GS-US-558-5915",
          nickname: "",
          TA:"Oncology",
          indication:"MM",
          full_path:"",
          type:"Manucripts",
          product_Code:"",
          product:"GS-4721 Magrolimab",
          file_type:"BAP",
          id:"123"
        },
        {
          trialID:"GS-US-558-5915",
          nickname: "",
          TA:"Oncology",
          indication:"ONC",
          full_path:"",
          type:"Manucripts",
          product_Code:"",
          product:"GS-3583 Flt3R Agonist",
          file_type:"BAP",
          id:"123"
        },
  
        {
          trialID:"GS-US-558-5915",
          nickname: "",
          TA:"Oncology",
          indication:"ONC",
          full_path:"",
          type:"Manucripts",
          product_Code:"",
          product:"GS-3583 Flt3R Agonist",
          file_type:"BAR",
          id:"123"
        }];
        var searchTerm =search !==null ? search?.toLowerCase() : '';
        const data= tableData.filter(item => {
        for (let index = 0; index < values.length; index++) {
          const element = values[index]?.toLowerCase();
         if(element.includes(searchTerm)) {
          return true;
         }
        }})


    console.log("Search Data:", data)
    return res.json(data);
})


router.get("/publications", function(req, res){
    console.log("publications", publications);
    return res.json(publications);
})

module.exports = router;