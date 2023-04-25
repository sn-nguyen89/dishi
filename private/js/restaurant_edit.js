$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);

    id = parsedUrl.searchParams.get("id");

    firebase.auth().onAuthStateChanged(function (somebody) {

        db.collection("restaurants").doc(id).get().then(function (doc) {

            //Pulling data from firestore
            var restName = doc.data().name;
            var restAddress = doc.data().address;
            var postalCode = doc.data().postal_code;
            var restCuisine = doc.data().cuisine;
            var restPhone = doc.data().phone;
            var restRating = doc.data().rating;

            $("#restaurant_name").text(restName);
            $("#restaurant_address").text(restAddress);
            $("#restaurant_postalcode").text(postalCode);
            $("#restaurant_phone").text(restPhone);
            $("#restaurant_cuisine").text("Type of Cuisine: " + restCuisine);
            $("#restaurant_rating").text(restRating);

        })

    });

    $("#form_submit").submit(function submit(e) {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(function (somebody) {



            var new_name = $("#new_name").val();
            if (new_name == "") {
                new_name = "Add New Restaurant Name"
            }
            var new_address = $("#new_address").val();
            if (new_address == "") {
                new_address = "Add New Address"
            }

            var new_city = $("#new_city").val();
            if (new_address == "") {
                new_address = "Add New City"
            }

            var new_province = $("#new_province").val();
            if (new_address == "") {
                new_address = "Add New Province"
            }

            var new_postal_code = $("#new_postal_code").val();
            if (new_postal_code == "") {
                new_postal_code = "Add New Postal Code"
            }
            var new_number = $("#new_number").val();
            if (new_number == "") {
                new_number = "Add New Phone Number"
            }
            var new_cuisine = $("#new_cuisine").val();
            if (new_cuisine == "") {
                new_cuisine = "Cuisine Type"
            }

            var fileInput = document.getElementById("mypic-input");
            var file = fileInput.files[0];
            //store using this name
            var storageRef = storage.ref("restaurantImages/" + file.name);
            //upload the picked file into storage
            storageRef.put(file)
                .then(function (snapshot) {
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        db.collection("restaurants").doc(id).update({
                            name: new_name,
                            address: new_address,
                            postal_code: new_postal_code,
                            phone: new_number,
                            cuisine: new_cuisine,
                            image: downloadURL
                        }).then(function () {
                            // Redirect
                            window.location.href = "/private/html/restaurant_details.html?id=" + id;
                        })
                    })
                });

            let locations_address = new_address + new_city + new_province + new_postal_code;
            var location;
            var lat;
            var lng;

            geocode();
            function geocode() {
                location = locations_address;
                axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: location,
                        key: 'AIzaSyDY7qKGafiA2kFlmTIOZ2n61Q7ta8VXzGQ'
                    }
                })
                    .then(function (response) {
                        location = response.data.results[0].formatted_address;
                        lat = response.data.results[0].geometry.location.lat;
                        lng = response.data.results[0].geometry.location.lng;
                        db.collection("locations").add({
                            address: location,
                            geoPoint: new firebase.firestore.GeoPoint(lat, lng)
                        }, { merge: true }).then(function (doc) {

                            window.location.href = "/private/html/restaurant_details.html?id=" + id;
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        });

    });


});