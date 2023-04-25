const parsedUrl = new URL(window.location.href);

id = parsedUrl.searchParams.get("id");
let isfavorite = false
let authenticatedUser
let favDocId
firebase.auth().onAuthStateChanged((somebody) => {
    if (somebody) authenticatedUser = somebody
    checkFavorites()
})

var button = document.getElementById("fbutton");

document.addEventListener("DOMContentLoaded", function () {


    button.addEventListener("click", function (e) {
        button.classList.toggle("liked");
        if (!id || !restaurantDoc) {
            console.error('Restaurant is not present');
            return
        }

        $('#fbutton').prop('disabled', true);
        setTimeout(function () {
            $('#fbutton').prop('disabled', false);
        }, 2000);


        console.log({ auth: authenticatedUser });
        if (!authenticatedUser) {
            console.error('user is not loggedin');
            return
        }
        // already added to favorite then remove
        if (favDocId) {
            db.collection("Favorites").doc(favDocId).delete().then(() => {
                button.classList.remove('liked')
            })
        }
        else {
            //adding to favorite
            db.collection("Favorites").doc().set({
                ...restaurantDoc,
                owner: authenticatedUser.uid
            }).then(() => {
                console.log('added to fav');
            })

        }
    })


});

function checkFavorites() {
    if (!authenticatedUser) return

    db.collection("Favorites").where('restaurantID', '==', id).where('owner', '==', authenticatedUser.uid)
        .get().then(snapshot => {
            if (snapshot.docs.length > 0) {
                favDocId = snapshot.docs[0].id
                button.classList.add('liked')
            }
        })
}



















