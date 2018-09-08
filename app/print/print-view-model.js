const data = require("../data");
const imagepicker = require("nativescript-imagepicker");
const frameModule = require("tns-core-modules/ui/frame");

function PrintViewModel() {
  const viewModel = {};

  viewModel.data = data;

  viewModel.print = () => {
    const topmostFrame = frameModule.topmost();
    const context = imagepicker.create({
      mode: "single" // use "multiple" for multiple selection
    });

    context
      .authorize()
      .then(function () {
        return context.present();
      })
      .then(function (selection) {
        selection.forEach(function (selected) {
          data.photo = selected;
        });
        return topmostFrame.navigate("preview/preview-page");
      }).catch(function (e) {
        // process error
      });
  }

  return viewModel;
}

module.exports = PrintViewModel;
