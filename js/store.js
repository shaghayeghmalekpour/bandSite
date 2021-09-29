if( document.readyState == 'loading' ){
    document.addEventListener('DOMContentLoaded' , ready)
}else{
    ready();
}

 function ready(){
    let removeCardItem = document.getElementsByClassName('btn-danger');
    //giving eventlistener to all of remove buttons
    for(let i=0; i<removeCardItem.length; i++){
        let button = removeCardItem[i];
        button.addEventListener('click' , removeCardItems)
    }

    let quantityInput = document.getElementsByClassName('cart-quantity-input');
    for(let i=0; i<quantityInput.length; i++){
        let quantity= quantityInput[i];
        quantity.addEventListener('change' , quantityChanged);
 }

    let addToCartButton = document.getElementsByClassName('shop-item-button');
    for(let i=0; i<addToCartButton.length; i++){
        let button = addToCartButton[i];
        button.addEventListener('click' , addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click' , purchaseClicked)
 }

//purchase button 
function purchaseClicked(){
    alert('thanks for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotalPrice();
}

// we have a bug for removing for items that we add in cart done
 function removeCardItems(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalPrice();
 }

  //change number of item 
  function quantityChanged(event){
    let input = event.target
    if( input.value <=0 || isNaN(input.value)){
        input.value = 1;
    }
    updateTotalPrice();
}

function addToCartClicked(event){
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
        addItemToCart(title , price , imgSrc);
        updateTotalPrice();
}

function addItemToCart(title , price , imgSrc){
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cardRow = document.createElement('div');
    cardRow.classList = "cart-row"
    //this part is for dont add other tekrari item in card
    let cartItemsName = document.getElementsByClassName('cart-item-title');
    for(let i=0; i<cartItemsName.length; i++){
        if(cartItemsName[i].innerText == title){
            alert('This Item is already in your cart.');
            return;
        }
    }
    const cardRowContents =` 
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cardRow.innerHTML = cardRowContents;
    cartItems.append(cardRow);
    //ina ba document be jay cardrow kar nemikonn dalilesh chie? jvbesh ine ke ma cardrow ro khodemon create elemenr kardim va baray dastrest behesh dg document bi manir
    cardRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCardItems);
    cardRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}



//change total after click on remove button
function updateTotalPrice(){
    let cartItem = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItem.getElementsByClassName('cart-row')
    let total = 0;
    for(let i=0; i<cartRows.length; i++){
        let cartRow = cartRows[i]; 
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        // change type of price: string to number
        let price = parseFloat(priceElement.innerText.replace('$' , ''))
        let quantity = quantityElement.value
        total += price * quantity
}
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' +total
}