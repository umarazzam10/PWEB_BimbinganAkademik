var express = require('express');
var router = express.Router();

const { showReport, generatePdf } = require('../controllers/generateFile');

  router.get("/", showReport);
  router.post("/", generatePdf)
