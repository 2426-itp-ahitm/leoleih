/**
 * Document imports
 */
const results = document.getElementById("results")
const cathegory = document.querySelector('.cathegory');
const categoryIcon = document.querySelector('.categoryIcon')

/**
 * General Variables
 */
let currentNavBarStatus = 0 //0=expandet 1=small


//NavBar Expantion
setInterval(checkIfResultsExist, 1000);
function checkIfResultsExist(){
    if(results.innerHTML.trim().length === 0){
        currentNavBarStatus = 0
    }else{
        currentNavBarStatus = 1
    }
    updateNavBarStatus()
}

function updateNavBarStatus(){
    if (currentNavBarStatus === 1){
        console.log("small");
        categoryIcon.style.transform = "scale(3)"
        cathegory.style.width = "70px"
        cathegory.style.height = "40px"

    }
}
