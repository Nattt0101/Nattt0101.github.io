// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let checkout= document.querySelector(".checkout");
let checkoutbutton=document.querySelector("#checkout");
let discountcoupon= document.querySelector("#discount");
let discountcalc=document.querySelector("#calcdiscount");
let discountamt=0;

discountcalc.onclick=()=>{
if (discountcoupon.value=="XKL280"){
	discountamt=25;
}
else{
alert("invalid coupon code!")
}
updatetotal();
}

checkoutbutton.onclick=()=>{
	checkout.classList.remove("active");
	alert("Your Order has been placed")
	var cartContent = document.getElementsByClassName("cart-content")[0];
	while(cartContent.hasChildNodes()){
		cartContent.removeChild(cartContent.firstChild);
	}
	updatetotal();
}

cartIcon.onclick = () =>{
	cart.classList.add("active");
};

closeCart.onclick = () =>{
	cart.classList.remove("active");
};

// Cart working JS
if (document.readyState == "loading"){
	document.addEventListener("DOMContentLoaded", ready)
}else{
	ready();
}

// Making function
function ready(){
	//Remove items from cart
	var removeCartButtons = document.getElementsByClassName("cart-remove")
	console.log(removeCartButtons)
	for(var i = 0; i < removeCartButtons.length; i++){
		var button = removeCartButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	// Quantity changes
	var quantityInputs = document.getElementsByClassName("cart-quantity")
	for(var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	// Add to cart
	var addCart = document.getElementsByClassName("add-cart")
	for(var i = 0; i < addCart.length; i++){
		var button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}
	// Buy button working
	document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Buy button working
function buyButtonClicked(){
	cart.classList.remove("active");
	checkout.classList.add("active");
}

//Remove items from cart
function removeCartItem(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
}

//Quantity changes
function quantityChanged(event){
	var input = event.target
	if (isNaN(input.value) || input.value <= 0){
		input.value = 1;
	}
	updatetotal();
}

//Add to cart
function addCartClicked(event){
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
	var price = shopProducts.getElementsByClassName("price")[0].innerText;
	var ProductImg = shopProducts.getElementsByClassName("product-img")[0].src;
	addProductToCart(title, price, ProductImg);
	updatetotal();
}

function addProductToCart(title, price, ProductImg){
	var cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	var cartItems = document.getElementsByClassName("cart-content")[0];
	var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
	for (var i = 0; i < cartItemsNames.length; i++){
		if (cartItemsNames[i].innerText == title){
			alert("Item is in the cart already");
			return;
		}
	}

var cartBoxContent = `
						<img src="${ProductImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remove Cart Item-->
                        <i class='bx bxs-trash-alt cart-remove' ></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

//update total
function updatetotal(){
	var cartContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = cartContent.getElementsByClassName("cart-box");
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++){
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-price")[0];
		var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		var price = parseFloat(priceElement.innerText.replace("$", ""));
		var quantity = quantityElement.value;
		total = total + price * quantity;
	}
		// If price contain some cents value
		total=total-discountamt;
		total = Math.round(total *100) / 100;

		if(total<0){
			total=0;
		}
		document.getElementsByClassName("total-price")[0].innerText = "$" + total;
} 