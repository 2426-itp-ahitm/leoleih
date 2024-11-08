isClicked = false;

function showDropdown(){
if (!isClicked) {
    document.getElementById('dropdown-content').style.display = "block";    
    isClicked = true;
}else{
    document.getElementById('dropdown-content').style.display = "none";   
    isClicked = false; 
}



}