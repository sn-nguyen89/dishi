//Price value for filter
var price_value = parseFloat(sessionStorage.getItem("price_value"));
if (price_value == null) {
    price_value = 0;
}

//Rating value for filter
var rating_value = parseFloat(sessionStorage.getItem("rating_value"));
if (rating_value == null) {
    rating_value = 0;
}

// filter application. If a filter is used filter = 1.
var filter = sessionStorage.getItem("filter");
if (filter == null) {
    filter = 0;
}
//Constant use for max ratings.
const MAX_RATING_VAL = 5;




//This function is a bit crazy. So it displays restaurant cards to the main page.
//But if a filter is used it needs to only display restaurant according to features added
function displayRestaurants() {
    db.collection("restaurants")
        .get()
        .then(function (snap) {
            snap.forEach(function (docRest) {

                //we are using 2 collections in 1 function, so we used these 2 variables to keep track 
                //of what UID was being used/
                var restID = docRest.id;
                var dishID;

                //set display to false to only display restaurants once. When it gets displayed, it is set to true.
                var display = false;

                //If a filter is used, it will run this part to display restaurant cards
                if (filter == 1) {
                    db.collection("dish").where("restaurantID", "==", restID).get()
                        .then(function (snapCollection) {
                            snapCollection.forEach(function (docDish) {

                                //This if statement is the filters being applied.
                                if (
                                    (docRest.data().rating >= rating_value || rating_value == 0) &&
                                    (display == false) &&
                                    (docDish.data().orderStatus == "Waiting") &&
                                    (price_value == 0 || (parseFloat(price_value)) >= parseFloat(docDish.data().discountedPrice))
                                ) {
                                    //This is the code that gets added to the dom to display restaurants
                                    $("#restaurants").append(`<div class="col">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-4">
                  <img src="${docRest.data().image}" alt="..." class="restaurant-img">
                </div>
                <div class="col-7">
                  <div class="card-body">
                    <h4>${docRest.data().name}</h4>
                    <i class='bx bxs-map'></i>  ${docRest.data().address} <br />
                    ${docRest.data().rating} <i class='bx bxs-star' ></i> <span class="review-count"></span> <p>
                      <span class="food-type">${docRest.data().cuisine}</button>
                    </p>
                  </div>
                </div>
                <div class="col-1 arrow"><img src="/private/img/small-arrow.png" alt=""id ="${docRest.id}" onclick = "linkToRestaurantProfile(this.id)"></div>
              </div>
            </div>
          </div>`);
                                    display = true;
                                }

                            })

                        })

                    //If not filter is used, the default is to only display dishes that have an active order
                } else {
                    db.collection("dish").where("restaurantID", "==", restID).get()
                        .then(function (snapCollection) {
                            snapCollection.forEach(function (docDish) {
                                if (docDish.data().orderStatus == "Waiting" && display == false) {
                                    $("#restaurants").append(`<div class="col">
          <div class="card mb-3" id ="${docRest.id}" onclick = "linkToRestaurantProfile(this.id)">
            <div class="row g-0">
              <div class="col-4">
                <img src="${docRest.data().image}" alt="..." class="restaurant-img">
              </div>
              <div class="col-7">
                <div class="card-body">
                  <h4>${docRest.data().name}</h4>
                  <i class='bx bxs-map'></i>  ${docRest.data().address} <br />
                  ${docRest.data().rating} <i class='bx bxs-star' ></i> <span class="review-count"></span> <p>
                    <span class="food-type">${docRest.data().cuisine}</button>
                  </p>
                </div>
              </div>
              <div class="col-1 arrow"><img src="/private/img/small-arrow.png" alt=""></div>
            </div>
          </div>
        </div>`);
                                    display = true;
                                }
                            })
                        })
                };
            })
        })
}
displayRestaurants();



function linkToRestaurantProfile(docID) {
    window.location.href = "restaurant_details.html?id=" + docID;

}

