let restaurantDoc
$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id"));
    id = parsedUrl.searchParams.get("id");
    var ownerID;

    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("restaurants")
                .doc(id)
                .get()
                .then(function (doc) {
                    ownerID = doc.data().owner;
                    restaurantDoc = {
                        ...doc.data(),
                        restaurantID: id
                    }
                    console.log("this is ownerID: " + ownerID);
                    console.log("this is person uniqueID: " + somebody.uid);

                    //Hides edit field if not the owner of restaurant
                    if (ownerID !== somebody.uid) {
                        $("#add_dish").hide();
                        $("#edit_restaurant").hide();
                        $("#orders_confirmed").hide();
                    }

                    //Pulling data from firestore
                    var restName = doc.data().name;
                    var restAddress = doc.data().address;
                    var postalCode = doc.data().postal_code;
                    var restCuisine = doc.data().cuisine;
                    var restPhone = doc.data().phone;
                    var restRating = doc.data().rating;

                    console.log(
                        "" +
                        restName +
                        restAddress +
                        postalCode +
                        restPhone +
                        postalCode +
                        restRating
                    );

                    //Adding to the DOM
                    $("#restaurant_name").text(restName);
                    $("#restaurant_image").append(
                        `<img id="profile_pic" src="${doc.data().image
                        }" alt="avatar" class="rounded-circle" />`
                    );
                    $("#restaurant_info").append(
                        `<span class="font-weight-bold">${doc.data().name
                        }</span> <br /> <i class='bx bxs-map'></i> ${doc.data().address
                        }, ${doc.data().postal_code
                        } <br /> <i class='bx bxs-phone'></i> ${doc.data().phone
                        } <br /> <span class="food-type">${doc.data().cuisine
                        }</span> <br /> ${doc.data().rating
                        } <i class='bx bxs-star' ></i> `
                    );
                });
            $("#toTheFavoritePage").click(function (e) {
                e.preventDefault();
                window.location.href = "./../html/favorite.html?id=" + id;
            });

            //pulls dishes from database
            function displayDish() {
                db.collection("dish").where("restaurantID", "==", id).where("orderStatus", "==", "Waiting")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            //if not owner it will show dishes that you can order
                            if (ownerID !== somebody.uid) {
                                $("#dish_info").append(`<tr>
                    <td>${doc.data().name}</td><td><span class="strike">$${doc.data().regularPrice}</span> <span class="discounted">$${doc.data().discountedPrice}</td> <td><i class='bx bxs-time-five'></i> ${doc.data().pickupTime} - ${doc.data().pickupEnd} </td><td><button type="button" class="btn btn-success btn-sm" id="${doc.id}_order">Order</button></td>
                </tr>`)
                                linkToOrderConfirmation(doc.id);

                                //if owner a delete button ill show up for you to delete
                            } else {
                                console.log(doc.data().name, doc.data().pickupTime, doc.data().pickupEnd, doc.data().regularPrice, doc.data().discountedPrice);
                                $("#dish_info").append(`<tr>
                        <td>${doc.data().name}</td><td><span class="strike">$${doc.data().regularPrice}</span> <span class="discounted">$${doc.data().discountedPrice}</td> <td><i class='bx bxs-time-five'></i> ${doc.data().pickupTime} - ${doc.data().pickupEnd} </td><td><i class='bx bxs-trash-alt' id="${doc.id}_delete"></i></td>
                    </tr>`)
                                deleteDish(doc.id);
                            }
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            };
            displayDish();

            //Button to bring to confirmation screen
            function linkToOrderConfirmation(docID) {
                document.getElementById(docID + "_order")
                    .addEventListener("click", function () {
                        window.location.href = "order_confirmation.html?id=" + docID;
                    });
            };

            //Function to delete dish. Refreshes itself to show the dish has been deleted
            function deleteDish(docID) {
                document.getElementById(docID + "_delete")
                    .addEventListener("click", function () {
                        db.collection("dish").doc(docID).delete().then(() => {
                            window.location.href = window.location.href;
                        });
                    });
            };

            //Shows all dishes that have been confirmed and are waiting to be picked up
            function displayConfirmedDish() {
                db.collection("dish").where("restaurantID", "==", id).where("orderStatus", "==", "Confirmed")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.data().name, doc.data().pickupTime, doc.data().pickupEnd, doc.data().regularPrice, doc.data().discountedPrice);
                            $("#dish_info_confirmed").append(`<tr>
                    <td>${doc.data().name}</td><td><span>${doc.data().username}</span> <span>${doc.data().email}</span></td> <td><i class='bx bxs-time-five'></i> ${doc.data().pickupTime} - ${doc.data().pickupEnd} </td><td><button type="button" class="btn btn-success" id="${doc.id}" onClick = "orderComplete(this)">Done</button></td>
                </tr>`)
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            };
            displayConfirmedDish();

        } else {
            $("#add_dish").hide();
            $("#edit_restaurant").hide();
            $("#orders_confirmed").hide();
        }
    });
});

$("#edit_restaurant").click(function (e) {
    e.preventDefault();
    window.location.href = "/private/html/restaurant_edit.html?id=" + id;
});

$("#add_dish").click(function (e) {
    e.preventDefault();
    window.location.href = "/private/html/dish_form.html?id=" + id;
});

$("#review-button").click(function (e) {
    e.preventDefault();
    window.location.href = "./../html/write_review.html?id=" + id;
});

//Function to change dish from "Confirmed" to "Complete"
function orderComplete(elem) {
    var id = $(elem).attr("id");
    console.log(id);

    db.collection("dish").doc(id)
        .update({
            orderStatus: "Complete"
        })
        .then(function () {
            window.location.href = window.location.href;
        })
};
