/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./home-view-model");
const homeViewModel = new HomeViewModel();

function onNavigatingTo(args) {
  const page = args.object;
  page.bindingContext = homeViewModel;
}

exports.onNavigatingTo = onNavigatingTo;

function layoutSwiped(args) {
  if (args.direction == 2) {
    // left
    homeViewModel.data.category =
      (homeViewModel.data.category ||
        homeViewModel.data.categories.length) - 1;
  }
  if (args.direction == 1) {
    // right
    homeViewModel.data.category =
      (homeViewModel.data.category + 1) %
      homeViewModel.data.categories.length;
  }
}

exports.layoutSwiped = layoutSwiped;
