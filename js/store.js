let removeCardItem = document.getElementsByClassName('btn-danger');

//giving eventlistener to all of remove buttons
for(let i=0; i<removeCardItem.length; i++){
    let button = removeCardItem[i];
    button.addEventListener('click' , function(event){
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
    })
}
