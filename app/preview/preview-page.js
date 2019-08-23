// var frameModule = require("ui/frame");
var PreviewViewModel = require("./preview-view-model");
var previewViewModel = new PreviewViewModel();

function pageLoaded(args) {
  var page = args.object;

  page.bindingContext = previewViewModel;
}

exports.pageLoaded = pageLoaded;
