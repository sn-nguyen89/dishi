let authenticatedUser;
firebase.auth().onAuthStateChanged((somebody) => {
    if (somebody) authenticatedUser = somebody
    displayRestaurants()
})

function linkToRestaurantProfile(docID) {
    document.getElementById(docID)
        .addEventListener("click", function () {
            window.location.href = "restaurant_details.html?id=" + docID;
        });
}

function displayRestaurants() {
    db.collection("Favorites")
        .where('owner', '==', authenticatedUser.uid)

        .onSnapshot(function (snap) {
            snap.forEach(function (doc) {

                $("#restaurants").append(`<div class="col">
                <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-4">
                      <img src="${doc.data().image}" alt="..." class="restaurant-img">
                    </div>
                    <div class="col-7">
                      <div class="card-body">
                        <h4>${doc.data().name}</h4>
                        <i class='bx bxs-map'></i>  ${doc.data().address} <br />
                        ${doc.data().rating} <i class='bx bxs-star' ></i> <span class="review-count">(# ratings)</span> <p>
                          <span class="food-type">${doc.data().cuisine}</button>
                        </p>
                      </div>
                    </div>
                    <div class="col-1 arrow"><img src="/private/img/small-arrow.png" alt=""id ="${doc.data().restaurantID}"></div>
                  </div>
                </div>
              </div>`);

                linkToRestaurantProfile(doc.data().restaurantID);
            });
        });
}
