const express = require('express');
const bodyParser = require('body-parser');
const genes = require('./data/GS-US-418-3898_Cohort_A-genes.json');
const biomakerPayload = require('./data/biomarker-payload-GS-US-418-3898_Cohort_A.json');
const genePayload = require('./data/biomarker-payload-GS-US-418-3898_Cohort_A-example2.json');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
const summary = require('./data/summary_response.json');
const summaryByID = require('./data/clinicaldata-summary-GS-US-418-3898_Cohort_A.json');
const studyBiomarkers = require('./data/GS-US-418-3898_Cohort_A-biomarkers.json');

const typesummary = require('./data/clinicaldata-typesummary.json');
const BIOMARKER = require('./data/GS-US-384-1943-BIOMARKER.json');
const GENE_EXPRESSION = require('./data/GS-US-384-1943-GENE_EXPRESSION.json');





//BIOMARKER
app.get('/clinicaldata/summary/:study_id/BIOMARKER', (req, res) => {
  console.log('yes');
  res.json(BIOMARKER);
});

//GENE_EXPRESSION
app.get('/clinicaldata/summary/:study_id/GENE_EXPRESSION', (req, res) => {
  console.log('yes');
  res.json(GENE_EXPRESSION);
});

//TYPE SUMMARY
app.get('/clinicaldata/typesummary', (req, res) => {
  console.log('yes');
  res.json(typesummary);
});

app.get('/clinicaldata/study/:study_id/biomarkers', (req, res) => {
  return res.json(studyBiomarkers);
});

app.get('/clinicaldata/study/:study_id/genes', (req, res) => {
  console.log('Gens');
  res.json(genes);
});

app.get('/clinicaldata/study/:study_id/tissuesources', (req, res) => {
  res.json(['Mucosal Biopsy']);
});

app.get('/clinicaldata/study/:study_id/treatments/biomarker', (req, res) => {
  res.json(['Filgotinib, 100 mg', 'Filgotinib, 200 mg', 'Placebo']);
});

app.get('/clinicaldata/study/:study_id/treatments/gene', (req, res) => {
  res.json(['Placebo', 'Filgotinib, 100 mg', 'Filgotinib, 200 mg']);
});
app.get('/clinicaldata/summary', (req, res) => {
  console.log('yes');
  res.json(summary);
});
app.get('/clinicaldata/summary/:study_id', (req, res) => {
  res.json(summaryByID);
});

app.post('/biostats/biomarker', (req, res) => {
  res.json(biomakerPayload);
});

app.post('/biostats/geneexpression', (req, res) => {
  res.json(genePayload);
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// let express = require('express');
// let mongoose = require('mongoose');
// let bodyParser = require('body-parser');
// let cors = require('cors');

// const REST_API = require('./routes/file.route');

// mongoose
//   .connect('mongodb://127.0.0.1:27017/vuedb')
//   .then((x) => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch((err) => {
//     console.error('Error connecting to mongo', err.reason);
//   });

// const app = express();
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.use(cors());

// app.use('/public', express.static('public'));
// app.use('/api/v1/', REST_API);
// app.use('/clinicaldata/', REST_API);

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   console.log('Connected : ' + port);
// });

// app.use((req, res, next) => {
//   setImmediate(() => {
//     next(new Error('Error occurred'));
//   });
// });
