var frameModule = require("ui/frame");
var PrintViewModel = require("./print-view-model");
var printViewModel = new PrintViewModel();

function pageLoaded(args) {
  var page = args.object;

  page.bindingContext = printViewModel;
}

exports.pageLoaded = pageLoaded;
