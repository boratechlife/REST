let express = require('express');
let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
let multer = require('multer');
let router = express.Router();
let fs = require('fs');
const allData = require('../data/gsas_studies_bm_only.json');
const jsonData = require('../data/db.json');
const genes = require('../data/genes_response.json');
const summary = require('../data/summary_response.json');
const summary_response = require('../data/summary-id_response.json');
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
    cb(null, uuidv4() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (
      file.mimetype ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype == 'application/msword'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('File type not accepted (.docx, .doc)'));
    }
  },
});

router.get('summary', (req, res) => {
  console.log('okay');
  res.send('ok');
});

router.get('/clinicaldata/study/GS-US-454-4378/biomarkers', (req, res) => {
  return res.json([
    'Serum Ratio of Total Cholic Acid to Total Chenodeoxycholic Acid',
    'Serum Ratio of Total Lithocholic Acid to Total BA',
    'Serum Secondary Bile Acid',
    'Serum Total Bile Acid',
    'Serum Total Chenodeoxycholic Acid',
    'Serum Unconjugated Bile Acid',
    'Serum Ratio of Primary BA to Total BA',
    'Serum Ratio of Secondary BA to Total BA',
    'Serum Total Cholic Acid',
    'Serum Primary Bile Acid',
    'Serum Total Lithocholic Acid',
    'Serum Conjugated Bile Acid',
    'Serum Ratio of Conjugated BA to Unconjugated BA',
    'Serum Ratio of Primary BA to Secondary BA',
  ]);
});

router.get('/clinicaldata/study/{study_id}/genes', (req, res) => {
  res.json(genes);
});

router.get('/clinicaldata/study/{study_id}/tissuesources', (req, res) => {
  res.json(['Liver']);
});

router.get(
  '/clinicaldata/study/{study_id}/treatments/biomarker',
  (req, res) => {
    res.json([
      'Cilofexor, 30 mg + Selonsertib, 18 mg',
      'Cilofexor, 30 mg + Firsocostat, 20 mg',
      'Placebo',
      'Cilofexor, 30 mg',
      'Firsocostat, 20 mg',
      'Selonsertib, 18 mg',
      'Firsocostat, 20 mg + Selonsertib, 18 mg',
    ]);
  }
);

router.get('/clinicaldata/study/{study_id}/treatments/gene', (req, res) => {
  res.json([
    'Placebo',
    'Cilofexor, 30 mg + Selonsertib, 18 mg',
    'Cilofexor, 30 mg + Firsocostat, 20 mg',
    'Cilofexor, 30 mg',
    'Selonsertib, 18 mg',
    'Firsocostat, 20 mg',
    'Firsocostat, 20 mg + Selonsertib, 18 mg',
  ]);
});

router.get('/clinicaldata/summary/{study_id}', (req, res) => {
  res.json(summary_response);
});

console.log(jsonData['differential-gene-expression']);
module.exports = router;
