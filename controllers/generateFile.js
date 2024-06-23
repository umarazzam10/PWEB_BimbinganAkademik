const pdf = require('pdf-creator-node')
const fs = require('fs')
const pengajuan = require('../models/pengajuan')


const showReport = (req, res, next) => {
  try {
    const data = {
      title: "Bimbingan Akademik",
      layout: "mahasiswa/home",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("mahasiswa/home", data);
  } catch (error) {
    next(
      new Error(
        "controllers/generateFile.js:showReport - " + err.message
      )
    );
  }
};

const generatePdf = async (req, res, next) => {
  try {
    let pathFile = "./file-output";
    let fileName = "KartuBimbingan.pdf";
    let fullPath = pathFile + "/" + fileName;
    let html = fs.readFileSync("./public/templatePDF.html", "utf-8");
    let options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "5mm",
        contents: '<div style="text-align: center;">Author: Pojok Code</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };
    const data = await pengajuan.find({});
    let pengajuans = [];
    data.forEach((pengajuan, no) => {
      pengajuans.push({
        no: no + 1,
        tanggal: pengajuan.jadwal,
        topic: pengajuan.topic,
        detail: pengajuan.detail,
      });
    });
    let document = {
      html: html,
      data: {
        pengajuans: pengajuans,
      },
      path: fullPath,
      type: "",
    };
    const process = await pdf.create(document, options);
    if (process) {
      res.download(fullPath, fileName, (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.unlinkSync(fullPath);
        }
      });
    }
  } catch (error) {
    next(
      new Error(
        "controllers/generateFile.js:generatePdf - " + err.message
      )
    );
  }
};

module.exports = { showReport, generatePdf };