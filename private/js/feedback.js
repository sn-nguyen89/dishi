const form = document.querySelector("form");
const totalRatingEl = document.querySelector("#ratingCount");
const avgRatingEl = document.querySelector("#avgRating");
let allReviews = [];
let avg;

const parsedUrl = new URL(window.location.href);
id = parsedUrl.searchParams.get("id");

function getRestaurant() {
    db.collection("restaurants").doc(id)
        .onSnapshot(function (c) {
            $('#restaurant_name').text(c.data().name);
            $('#restaurant_address').text(c.data().address);
            $('#restaurant_postalcode').text(c.data().postal_code);
            $('#restaurant_phone').text(c.data().phone);
            $('#restaurant_cuisine').text(c.data().cuisine);
            $('#restaurant_image').append(`<img src='${c.data().image}' id="profile_pic" alt="" class="rounded-circle">`);
        })
}
getRestaurant();

$("#see-all").click(function (e) {
    e.preventDefault();
    window.location.href = "./../html/reviews.html?id=" + id;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const ratingInput = document.querySelector('input[type="radio"]:checked');
    if (!ratingInput) {
        alert("Please select star rating");
        return;
    }
    const star = parseInt(ratingInput.value);
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;

    db.collection("reviews")
        .doc()
        .set({
            star,
            title,
            description,

            createdAt: Date.now(),
            restaurant: id,
        })

        .then(() => {
            window.location.href = "./allReview.html?id=" + id;
        });
});

const fetchReviews = async () => {
    db.collection("reviews")
        .where("restaurant", "==", id)
        .get()
        .then(async (querySnapshot) => {
            totalRatingEl.innerHTML = querySnapshot.size + " ratings";
            allReviews = await querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            calculateAverage();
        });
};

const calculateAverage = () => {
    let totalStarSum = 0;
    for (let review of allReviews) {
        totalStarSum += parseInt(review.star);
    }
    avg = (totalStarSum / allReviews.length).toFixed(1);
    avgRatingEl.innerHTML = avg + "/5";
    db.collection("restaurants").doc(id).set(
        {
            rating: avg,
        },
        { merge: true }
    );
};



window.onload = fetchReviews;


