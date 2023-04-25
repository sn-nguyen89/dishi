const logout = document.querySelector('#logout');
const auth = firebase.auth();
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.href = "/index.html";
    });
});

function displayUser() {
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
                    var email = doc.data().email;
                    var image = doc.data().profilepic;
                    user_email = email;
                    user_image = image;

                    $("#user-details").append(`<img id="thumbnail_profile"
                    src="${doc.data().profilepic}"
                    alt="avatar" class="rounded-circle" width="43px" /> &nbsp ${doc.data().email}`)
                });
        }
    });
}
displayUser();