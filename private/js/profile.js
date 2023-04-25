$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            $("#uid").html(somebody.uid);
            console.log(somebody.uid);
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    console.log(doc.data().name);
                    var name = doc.data().name;
                    var email = doc.data().email;

                    //updating profile to display
                    $("#user_name").text(name);
                    $("#user_email").text(email);
                    $("#profilepic").append(`<img id="profile_pic"
                    src="${doc.data().profilepic}"
                    alt="avatar" class="rounded-circle" />`)
                });


            //displays restaurants currently owned
            db.collection("restaurants")
                .where("owner", "==", somebody.uid)
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {

                        $("#restaurant_info").append(`<div class="col">
                        <div class="card card-restaurant">
                          <img src="${doc.data().image}" alt="..." class="rounded-circle restaurant-thumbnail">
                          <div class="card-body rest-body">
                            <a href="restaurant_details.html?id=${doc.id}" class="restaurant-link">${doc.data().name}</a>
                          </div>
                          </div>
                        </div>`
                        );
                    });
                });
        }
    });
});
