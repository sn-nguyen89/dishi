let allReviews = [];
const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id"));
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


const fetchReviews = async () => {
    db.collection("reviews")
        .where("restaurant", "==", id)
        .get()
        .then(async (querySnapshot) => {
            allReviews = await querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            renderList();
        });
};

const renderList = () => {
    let html = "";
    for (let review of allReviews) {
        html += `
        <div class="col">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-4 arrow justify-content-center">
                <img src="/private/img/star-solid-24.png" alt="">&nbsp;  ${review.star
            } stars</div>
                            <div class="col-8 justify-content-left">
                            <div class="card-body justify-content-left"><h6>Title: ${review.title}</h6><h6>Date: ${new Date(
                review.createdAt
            ).toDateString()}</h6>"${review.description
            }"                  </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
        `;
    }
    document.querySelector("#list-container").innerHTML = html;
};

const rateSortEl = document.querySelector("#rateSort");
const newestSortEl = document.querySelector("#newestSort");
const oldestSortEl = document.querySelector("#oldestSort");

rateSortEl.addEventListener("click", async () => {
    allReviews = await allReviews.sort((a, b) => (a.star > b.star ? -1 : 1));
    renderList();
});

newestSortEl.addEventListener("click", async () => {
    allReviews = await allReviews.sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : 1
    );
    renderList();
});

oldestSortEl.addEventListener("click", async () => {
    allReviews = await allReviews.sort((a, b) =>
        a.createdAt < b.createdAt ? -1 : 1
    );
    renderList();
});

$("#goBack").click(function (e) {
    e.preventDefault();
    window.location.href = "./../html/feedback.html?id=" + id;
});

window.onload = fetchReviews;
