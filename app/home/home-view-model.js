const data = require("../data");
const frameModule = require("tns-core-modules/ui/frame");

function HomeViewModel() {
  const viewModel = {};

  viewModel.data = data;

  viewModel.print = () => {
    const topmostFrame = frameModule.topmost();
    return topmostFrame.navigate("print/print-page");
  };

  return viewModel;
}

module.exports = HomeViewModel;
