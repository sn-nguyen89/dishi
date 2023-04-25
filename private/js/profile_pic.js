$(document).ready(function () {
    var user_email;
    var user_name;
    var userId;

    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {

            console.log(somebody.uid);
            userID = somebody.uid;
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    //pulling data from firestore
                    var name = doc.data().name;
                    var email = doc.data().email;
                    user_email = email;
                    user_name = name;

                    //updating profile
                    $("#user_name").text(name);
                    $("#user_email").text(email);
                    $("#profilepic").append(`<img id="profile_pic"
                    src="${doc.data().profilepic}"
                    alt="avatar" class="rounded-circle" />`)
                });
        }
    });

    $("#save_settings").click(function submit(e) {
        firebase.auth().onAuthStateChanged(function (somebody) {
            //Updates the email in user auth DOES NOT WORK FOR NOW
            // var user = firebase.auth().currentUser;
            // user.updateEmail(new_email).then(function () {
            //     // Update successful.
            // }).catch(function (error) {
            //     // An error happened.
            // });

            var fileInput = document.getElementById("mypic-input");
            var file = fileInput.files[0];
            //store using this name
            var storageRef = storage.ref("profileImages/" + file.name);
            //upload the picked file into storage
            storageRef.put(file)
                .then(function (snapshot) {
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        db.collection("users").doc(somebody.uid).update({
                            profilepic: downloadURL
                        }).then(function () {
                            // Redirect
                            window.location.href = "/private/html/profile.html";
                        })
                    })
                });

        });
    });

});