let filter_html = "<div class=\"filter_container\">"

var filter = sessionStorage.getItem("filter");
if (filter == null) {
    filter = 0;
}

// Price
var price_slider = document.getElementById("price_slider");
var price_output = document.getElementById("price_slider_value");
price_output.innerHTML = price_slider.value; // Display the default slider value

//Price value for filter
var price_value = sessionStorage.getItem("price_value");
if (price_value == null) {
    price_value = 0;
}


//Rating value for filter
var rating_value = sessionStorage.getItem("rating_value");
if (rating_value == null) {
    rating_value = 0;
}

// Update the current slider value (each time you drag the slider handle)
price_slider.oninput = function () {
    price_output.innerHTML = this.value;
    price_value = this.value;
}

price_slider.onchange = function () {
    let p = document.getElementById("price_add");

    p.style.display = "block";
    p.innerHTML = filter_html + "<li>Price: $0 - " + price_value + "</li>";

}

//Add rating
function add_rating_1() {
    rating_value = document.getElementById("1").value;
    document.getElementById("rating_add").style.display = "block";
    document.getElementById("rating_add").innerHTML = filter_html + "<li>Rating: " + rating_value + "</li>";
}

function add_rating_2() {
    rating_value = document.getElementById("2").value;
    document.getElementById("rating_add").style.display = "block";
    document.getElementById("rating_add").innerHTML = filter_html + "<li>Rating: " + rating_value + "</li>";
}

function add_rating_3() {
    rating_value = document.getElementById("3").value;
    document.getElementById("rating_add").style.display = "block";
    document.getElementById("rating_add").innerHTML = filter_html + "<li>Rating: " + rating_value + "</li>";
}

function add_rating_4() {
    rating_value = document.getElementById("4").value;
    document.getElementById("rating_add").style.display = "block";
    document.getElementById("rating_add").innerHTML = filter_html + "<li>Rating: " + rating_value + "</li>";
}

function add_rating_5() {
    rating_value = document.getElementById("5").value;
    document.getElementById("rating_add").style.display = "block";
    document.getElementById("rating_add").innerHTML = filter_html + "<li>Rating: " + rating_value + "</li>";
}

//Clear filters
function clearAll() {
    document.getElementById("rating_add").style.display = "none";
    rating_value = 0;

    document.getElementById("time_add").style.display = "none";
    pickupStartTime = 0;
    pickupEndTime = 0;

    document.getElementById("price_add").style.display = "none";
    price_value = 0;

    document.getElementById("distance_add").style.display = "none";
    distance_value = 0;

    filter = 0;
}

//Removed pickup time filters, but keeping this code if we add in the future.
// $(document).ready(function () {
//     $("#form_submit").submit(function submit(e) {
//         e.preventDefault();

//         pickupStartTime = $("#pickup_start").val();
//         pickupEndTime = $("#pickup_end").val();
//         let w = document.getElementById("warnings");

//         if (pickupStartTime > pickupEndTime || pickupEndTime == pickupStartTime) {
//             w.style.display = "block";
//             w.innerHTML = "<div class=\"bs-example\"> <div class=\"alert alert-warning alert-dismissible fade show\"><strong>Warning!</strong> Please confirm end pickup time is greater than start pickup time.</div></div>"
//         } else {
//             w.style.display = "none";
//             document.getElementById("time_add").style.display = "block";
//             document.getElementById("time_add").innerHTML = filter_html + "<p>Time: " + pickupStartTime + " - " + pickupEndTime + "</p></div>";
//         }
//     })
// });

//Checks to see if any filters are applied, if not sets the values  in the session storage to be used in main
function getFilterValues() {
    if (pickupStartTime == 0
        && pickupEndTime == 0
        && price_value == 0
        && distance_value == 0
        && rating_value == 0) {
        filter = 0;
    } else {
        filter = 1;
    }

    sessionStorage.setItem("pickupStartTime", pickupStartTime);
    sessionStorage.setItem("pickupEndTime", pickupEndTime);
    sessionStorage.setItem("price_value", price_value);
    sessionStorage.setItem("distance_value", distance_value);
    sessionStorage.setItem("rating_value", rating_value);
    sessionStorage.setItem("filter", filter);

}