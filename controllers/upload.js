var mongoose = require("mongoose");

var SourceGif = mongoose.model("SourceGif");
var Gif = mongoose.model("Gif");

module.exports = function (req, res) {
  var url = req.query.url;
  
  if (url.toLowerCase().substring(url.length-4) != ".gif") {
    return res.render(500);
  }
  
  if (req.params.format == "json") {
    SourceGif.getOrCreate(url, function (err, src) {
      if (err) {
        console.error(err);
        return res.render(500);
      }
    
      Gif.fromSource(src, function (err, gif) {
        if (err) {
          console.error(err);
          return res.render(500);
        }
        res.send({message: "success", redirect: "/edit/"+gif._id+"/"+gif.key});
      });
    });
  } else {
    res.render("uploading", {url: url});
  }
}