var prodRequest = new XMLHttpRequest();
var catRequest = new XMLHttpRequest();
var products; // empty on load
var category;

// Function to output products onto the page
function listProdInfo (productData) {
  var DOMOutput = document.getElementById('container');
  for (var i = 0; i < productData.length; i++) {
    var curProduct = productData[i].name;
    var curPrice = productData[i].price;
    var curID = productData[i].category_id;
    //Lists the products from the JSON file
      DOMOutput.innerHTML += `<article><section>${curProduct}</section>`;
      DOMOutput.innerHTML += `<section>${curPrice}</section>`;
      DOMOutput.innerHTML += `<footer>${IDTest(curID, category)}</footer>`;
        function IDTest (productID, category) {
          for (var i = 0; i < category.length; i++) {
            if (productID === category[i].id){
              return category[i].name;
            };
          };
        };
  }; //end of first for loop
};

function listDiscounts(discount) {
  var DOMOutput = document.getElementById('discountSelect');
  for (var i = 0; i < discount.length; i++) {
    DOMOutput.innerHTML += `<option>${discount[i].season_discount}</option>`;
  };
};




//stuck listProdInfo function inside second execution so not to bother with callbacks yet
function executeJSONs() {
  prodRequest.open("GET", "products.JSON");
  prodRequest.send();
  catRequest.open("GET", "category.JSON");
  catRequest.send();
  prodRequest.addEventListener("load", executeProduct);
  prodRequest.addEventListener("error", executeOnFail);
  catRequest.addEventListener("load", executeCategory);
  catRequest.addEventListener("error", executeOnFail); 
    //Parses the products json
    function executeProduct () {
    var data = JSON.parse(this.responseText);
    products = data.products; 
    };
    //parses the categories json and calls listProductInfo function
    function executeCategory () {
    var data = JSON.parse(this.responseText);
    category = data.categories;

    listProdInfo(products);
    listDiscounts(category);
    };
};
executeJSONs()


function executeOnFail () {
  console.log("FAILED TO LOAD", this);
  console.log("date", Date.now());
};
// listProdInfo(products)