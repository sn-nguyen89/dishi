$(document).ready(function () {
    var user_email;
    var user_name;
    var userId;

    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {


            userID = somebody.uid;
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    //pulling data from firestore
                    var name = doc.data().name;
                    var email = doc.data().email;
                    var image = doc.data().profilepic;
                    user_email = email;
                    user_name = name;
                    user_image = image;

                    //Displays profile
                    $("#user_name").text(name);
                    $("#user_email").text(email);
                    $("#profilepic").append(`<img id="profile_pic"
                    src="${doc.data().profilepic}"
                    alt="avatar" class="rounded-circle" />`)

                    //Only verified owners will be able to see the add restaurants. 
                    //The owner verification process can be added on later but was removed from final version.
                    if (doc.data().verified !== "yes" || doc.data().verified == undefined) {
                        $("#add_restaurant").hide();
                    }
                });
        }
    });

    //Uses firebase auth to change password. An email from firebase will be mailed to user to change their password
    $("#change_password").click(function submit(e) {
        e.prevenDefault();
        var auth = firebase.auth();
        var emailAddress = user_email;
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            window.alert("Password reset link has been sent to your email");
        }).catch(function (error) {
            window.alert("Soemthing went wrong please try again later");
        });
    });

    //Updating user profile information
    $("#save_settings").click(function submit(e) {
        firebase.auth().onAuthStateChanged(function (somebody) {
            let new_name = $("#new_name").val();
            let new_email = $("#new_email").val();

            console.log("" + new_name + new_email);
            if (new_name == "") {
                new_name = user_name;
            }
            if (new_email == "") {
                new_email = user_email;
            }

            //Setting updated user info
            db.collection("users").doc(somebody.uid).update({

                name: new_name,
                email: new_email

            }, { merge: true }).then(function (doc) {
                window.location.href = "/private/html/profile.html";
            });

        });
    });
    $("#add_restaurant").click(function submit(e) {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(function (somebody) {
            console.log(somebody.uid);
            db.collection("restaurants").add({
                owner: somebody.uid,
                name: "Add New Restaurant Name",
                address: "Add New Address",
                postal_code: "Add New Postal Code",
                phone: "Add New Phone Number",
                cuisine: "Add Cuisine Type",
                rating: "Not Yet Rated",
                image: "blank"

            }).then(function (doc) {

                console.log(doc.id);
                window.location.href = "/private/html/restaurant_edit.html?id=" + doc.id;
            });
        });
    });
    $("#owner_verification").click(function submit(e) {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(function (somebody) {
            console.log(somebody.uid);
            db.collection("users").doc(somebody.uid).update({

                verified: "yes"

            }).then(function () {


                window.location.href = window.location.href;
            });
        });
    });

});















