$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (somebody) {
        const parsedUrl = new URL(window.location.href);
        console.log(parsedUrl.searchParams.get("id"));

        id = parsedUrl.searchParams.get("id");

        var restaurantID;
        var name;
        var email;
        db.collection("users")
            .doc(somebody.uid)
            .get()
            .then(function (doc) {
                //pulling data from firestore
                name = doc.data().name;
                email = doc.data().email;
            });

        //Displays the dish that we want to confirm.
        db.collection("dish").doc(id)
            .get()
            .then(function (doc) {
                restaurantID = doc.data().restaurantID;
                console.log(doc.data().name, doc.data().pickupTime, doc.data().pickupEnd, doc.data().regularPrice, doc.data().discountedPrice);
                $("#dish_info").append(`<tr>
                <td>${doc.data().name}</td><td><span class="strike">$${doc.data().regularPrice}</span><span class="discounted">$${doc.data().discountedPrice}</td> <td><i class='bx bxs-time-five'></i> ${doc.data().pickupTime} - ${doc.data().pickupEnd} </td>
            </tr>`)
            });

        //When order is confirmed, the dish status is changed to "Confirmed". The restaurant owner can now see that it is confirmed in his restaurant.
        $("#confirm_order").click(function (e) {
            db.collection("dish").doc(id)
                .update({
                    orderStatus: "Confirmed",
                    user: somebody.uid,
                    username: name,
                    email: email
                }).then(function () {
                    window.location.href = "/private/html/restaurant_details.html?id=" + restaurantID;
                });
        });
    });

});