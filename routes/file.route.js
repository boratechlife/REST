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

router.post(
  '/multi-images-upload',
  upload.array('file1', 8),
  (req, res, next) => {
    const reqFiles = [];

    const url = req.protocol + '://' + req.get('host');

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/public/' + req.files[i].filename);
    }

    const user = new File({
      _id: new mongoose.Types.ObjectId(),
      imagesArray: reqFiles,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'Uploaded!',
          userCreated: {
            _id: result._id,
            imagesArray: result.imagesArray,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  }
);

router.get('/', (req, res, next) => {
  File.find().then((response) => {
    res.status(200).json({
      message: 'Images fetched!',
      posts: response,
    });
  });
});

router.get('/publication/search', function (req, res) {
  var search = req.query.search;
  var tableData = [
    {
      trialID: 'GS-US-420-5372',
      full_path:
        '/Volumes/biodata/cb-deliverables/viral-diseases/p420/s5372/BAP_BAR/GS-US-420-5372_BAP_20211117.pdf',
      type: 'BAP',
      nickname: 'HIV Combo HV',
      productCode: '420',
      product: 'GS-9722 Elipovimab (EVM)',
      indication: 'HIV Cure',
      TA: 'Virology',
      id: '40f74e3e-80e5-48e7-9031-1c19381cf36c',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'MM',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-4721 Magrolimab',
      file_type: 'BAP',
      id: '123',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAP',
      id: '123',
    },

    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAR',
      id: '123',
    },
    {
      trialID: 'GS-US-420-5372',
      full_path:
        '/Volumes/biodata/cb-deliverables/viral-diseases/p420/s5372/BAP_BAR/GS-US-420-5372_BAP_20211117.pdf',
      type: 'BAP',
      nickname: 'HIV Combo HV',
      productCode: '420',
      product: 'GS-9722 Elipovimab (EVM)',
      indication: 'HIV Cure',
      TA: 'Virology',
      id: '40f74e3e-80e5-48e7-9031-1c19381cf36c',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'MM',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-4721 Magrolimab',
      file_type: 'BAP',
      id: '123',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAP',
      id: '123',
    },

    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAR',
      id: '123',
    },
    {
      trialID: 'GS-US-420-5372',
      full_path:
        '/Volumes/biodata/cb-deliverables/viral-diseases/p420/s5372/BAP_BAR/GS-US-420-5372_BAP_20211117.pdf',
      type: 'BAP',
      nickname: 'HIV Combo HV',
      productCode: '420',
      product: 'GS-9722 Elipovimab (EVM)',
      indication: 'HIV Cure',
      TA: 'Virology',
      id: '40f74e3e-80e5-48e7-9031-1c19381cf36c',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'MM',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-4721 Magrolimab',
      file_type: 'BAP',
      id: '123',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAP',
      id: '123',
    },

    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAR',
      id: '123',
    },
    {
      trialID: 'GS-US-420-5372',
      full_path:
        '/Volumes/biodata/cb-deliverables/viral-diseases/p420/s5372/BAP_BAR/GS-US-420-5372_BAP_20211117.pdf',
      type: 'BAP',
      nickname: 'HIV Combo HV',
      productCode: '420',
      product: 'GS-9722 Elipovimab (EVM)',
      indication: 'HIV Cure',
      TA: 'Virology',
      id: '40f74e3e-80e5-48e7-9031-1c19381cf36c',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'MM',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-4721 Magrolimab',
      file_type: 'BAP',
      id: '123',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAP',
      id: '123',
    },

    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAR',
      id: '123',
    },
    {
      trialID: 'GS-US-420-5372',
      full_path:
        '/Volumes/biodata/cb-deliverables/viral-diseases/p420/s5372/BAP_BAR/GS-US-420-5372_BAP_20211117.pdf',
      type: 'BAP',
      nickname: 'HIV Combo HV',
      productCode: '420',
      product: 'GS-9722 Elipovimab (EVM)',
      indication: 'HIV Cure',
      TA: 'Virology',
      id: '40f74e3e-80e5-48e7-9031-1c19381cf36c',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'MM',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-4721 Magrolimab',
      file_type: 'BAP',
      id: '123',
    },
    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAP',
      id: '123',
    },

    {
      trialID: 'GS-US-558-5915',
      nickname: '',
      TA: 'Oncology',
      indication: 'ONC',
      full_path: '',
      type: 'Manucripts',
      product_Code: '',
      product: 'GS-3583 Flt3R Agonist',
      file_type: 'BAR',
      id: '123',
    },
  ];

  var searchTerm = search !== null ? search?.toLowerCase() : '';
  if (searchTerm == '') {
    return res.json(tableData);
  }
  const data = tableData.filter((item) => {
    const values = Object.values(item);
    for (let index = 0; index < values.length; index++) {
      const element = values[index]?.toLowerCase();
      if (element.includes(searchTerm)) {
        return true;
      }
    }
  });
  d;
  return res.json(data);
});

router.get('/publications', function (req, res) {
  console.log('publications', publications);
  return res.json(publications);
});

router.get('/plot-options/scatter-plot-query', function (req, res) {
  //add your code here
  const study_param = req.query.study_param;
});

router.get('/publication/search', (req, res) => {
  // add your code here
  const search = req.query.search;
  //if search is empty,
});

router.get('/plot-options/scatter-plot-parameters/', (req, res) => {
  const study_id = req.query.study_id;
  const category = req.query.category;
  const study = req.query.study;
  console.log('study', study);
  return res.json(jsonData['scatter-plot-parameters']);
  //add your code here
  //study_id
});
router.get('/plot-options/all-gene-ids', (req, res) => {
  return res.json(jsonData['all-gene-ids']);
});
// router.get('/posts/:id', (req, res) => {
//   //add your code here
//   //ge the parameter here
// });
router.get('/plot-options/all-gene-alias', (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit;

  return res.json(jsonData['all-gene-alias']);
});
router.get('/plot-options/study-data/', (req, res) => {
  return res.json(allData);
});

router.get('/plot-options/all-biomarker-names', (req, res) => {
  const study = req.query.study;
  res.json(jsonData['all-biomarker-names']);
});

router.get('/plot-options/biomarkers', (req, res) => {
  const study = req.query.study;
  res.json(
    allData.filter((item) => {
      return item.PROTOCOLNUMBER === study;
    })
  );
});
router.get('/plot-options/pathway-expression', (req, res) => {
  const study = req.query.study;
  res.json(
    allData.filter((item) => {
      return item.PROTOCOLNUMBER === study;
    })
  );
});
router.get('/plot-options/differential-gene-expression', (req, res) => {
  const study = req.query.study;
  res.json(jsonData['differential-gene-expression']);
});

function getDataFromStudy(study) {
  return allData.filter((item) => {
    return item.PROTOCOLNUMBER === study;
  });
}

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

router.get('/clinicaldata/summary', (req, res) => {
  res.json(summary);
});

router.get('/clinicaldata/summary/{study_id}', (req, res) => {
  res.json(summary_response);
});

console.log(jsonData['differential-gene-expression']);
module.exports = router;
