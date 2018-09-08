const data = require("../data");
const frameModule = require("tns-core-modules/ui/frame");

function PreviewViewModel() {
  const viewModel = {};

  viewModel.data = data;

  viewModel.home = () => {
    const topmostFrame = frameModule.topmost();
    return topmostFrame.navigate("home/home-page");
  }

  return viewModel;
}

module.exports = PreviewViewModel;
