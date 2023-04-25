$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (somebody) {
        //Display user profile
        db.collection("users")
            .doc(somebody.uid)
            .get()
            .then(function (doc) {
                var name = doc.data().name;
                var email = doc.data().email;
                $("#user_name").text(name);
                $("#user_email").text(email);
                $("#profilepic").append(`<img id="profile_pic"
            src="${doc.data().profilepic}"
            alt="avatar" class="rounded-circle" />`)
            });

        //Displays all confirmed dishes that needs to be picked up
        db.collection("dish")
            .where("user", "==", somebody.uid)
            .where("orderStatus", "==", "Confirmed")
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    $("#dish_confirmed").append(`<tr>
                    <td>${doc.data().name}</td><td><span class="strike">$${doc.data().regularPrice}</span><span class="discounted">$${doc.data().discountedPrice}</td> <td><i class='bx bxs-time-five'></i> ${doc.data().pickupTime} - ${doc.data().pickupEnd} </td>
                </tr>`)
                })

            });

        //Display all completed transaction between user and restaurant.
        db.collection("dish")
            .where("user", "==", somebody.uid)
            .where("orderStatus", "==", "Complete")
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    $("#dish_completed").append(`<tr>
                    <td>${doc.data().name}</td><td><span class="strike">$${doc.data().regularPrice}</span><span class="discounted">$${doc.data().discountedPrice}</td> <td><i class='bx bxs-time-five'></i> ${doc.data().pickupTime} - ${doc.data().pickupEnd} </td>
                </tr>`)
                })
            });
    });
});