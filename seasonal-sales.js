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
    //Using this format to wrap sections in article tag correctly
      DOMOutput.innerHTML += `<article><section class='product'>${curProduct}</section>
      <section class='price'>${curPrice}</section>
      <footer class='genre'>${IDTest(curID, category)}</footer>
      </article>`
      
        function IDTest (productID, category) {
          for (var i = 0; i < category.length; i++) {
            if (productID === category[i].id){
              return category[i].name;
            };
          };
        };
  }; //end of first for loop
};
// Adds discount values/options to DOM Select Element
function seasonDiscounts(discount) {
  var DOMOutput = document.getElementById('discountSelect');
  for (var i = 0; i < discount.length; i++) {
    var season = discount[i].season_discount;
    DOMOutput.innerHTML += `<option value="${season}" id="${season}">${season}</option>`;
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
    seasonDiscounts(category);
    };
};
executeJSONs()


function executeOnFail () {
  console.log("FAILED TO LOAD", this);
  console.log("date", Date.now());
};
// listProdInfo(products)