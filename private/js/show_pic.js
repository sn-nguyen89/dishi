function showTxtPic() {
	var fileInput = document.getElementById("mypic-input"); // Pointer to file location 
	const image = document.getElementById("mypic-goes-here"); // Pointer to file image 
	fileInput.addEventListener('change', function (e) { //event listener
		var file = e.target.files[0];
		var restaurantImage = URL.createObjectURL(file);
		image.src = restaurantImage; //change DOM image
	})
}
showTxtPic();