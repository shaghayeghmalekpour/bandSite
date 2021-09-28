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
 }

 function removeCardItems(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalPrice();
 }

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
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' +total
}