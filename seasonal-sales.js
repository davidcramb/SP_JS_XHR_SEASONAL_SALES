var prodRequest = new XMLHttpRequest();
var catRequest = new XMLHttpRequest();
var products; // empty on load
var category;
function listProdInfo (productData) {
  var DOMOutput = document.getElementById('container');
  for (var i = 0; i < productData.length; i++) {
    var curProduct = productData[i].name;
    var curPrice = productData[i].price;
    var curID = productData[i].category_id;


    DOMOutput.innerHTML += `<article><section>${curProduct}</section>`
    DOMOutput.innerHTML += `<section>${curPrice}</section>`
    DOMOutput.innerHTML += `<section>placeholder</section></article>`
  };

};


function executeProduct () {
  // console.log("this", this);
  // console.log("date", Date.now());
  var data = JSON.parse(this.responseText);
  products = data.products; 
    
    catRequest.addEventListener("load", executeCategory);
    catRequest.addEventListener("error", executeOnFail);    
      function executeCategory () {
        var data = JSON.parse(this.responseText);
        category = data.categories;
        console.log(category)
        };
  listProdInfo(products)

};

function executeJSONs() {
  
}


prodRequest.open("GET", "products.JSON");
prodRequest.send();
catRequest.open("GET", "category.JSON");
catRequest.send();
prodRequest.addEventListener("load", executeProduct);
prodRequest.addEventListener("error", executeOnFail);
function executeOnFail () {
  console.log("FAILED TO LOAD", this);
  console.log("date", Date.now());
};
// listProdInfo(products)