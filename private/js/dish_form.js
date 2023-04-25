$(document).ready(function () {
    //Gets the UID of specific restaurant in database. This ID is used to identify which dish belongs to which restaurant
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id"));
    id = parsedUrl.searchParams.get("id");

    //Form submit button to grab all the information about the dish and writes it to the database
    $("#form_submit").submit(function submit(e) {
        e.preventDefault();
        //Gets value from form
        var dishName = $("#dish_name").val();
        var dishPriceRegular = $("#regular_price").val();
        var dishPriceDiscounted = $("#discounted_price").val();
        var pickupStartTime = $("#pickup_start").val();
        var pickupEndTime = $("#pickup_end").val();

        //Writes to database with form values
        db.collection("dish")
            .doc()
            .set({
                restaurantID: id,
                name: dishName,
                regularPrice: dishPriceRegular,
                discountedPrice: dishPriceDiscounted,
                pickupTime: pickupStartTime,
                pickupEnd: pickupEndTime,
                //Sets the status of the dish to waiting. 
                //This value is used to display only active "waiting dishes on main"
                orderStatus: "Waiting",
                date: Date.now(),
            })
            .then(function () {
                window.location.href =
                    "/private/html/restaurant_details.html?id=" + id;
            });
    });
});
