const scrollDiv = document.querySelector('.horizontal_scroll');
// const leftArrow = document.querySelector(".leftright_arrow");
const rightArrow = document.querySelector('.right-arrow');
var width = document.querySelector('.inter_trip_button').offsetWidth ;
console.log("yooooooooo");
alert('yo');
leftArrow.addEventListener("click",()=>{
    console.log("yes");
});
function leftscroll(){
    scrollDiv.scrollBy({ left: -width-10, behavior: 'smooth' });
}
leftArrow.addEventListener('onClick', () => {
    console.log("yo");
    scrollDiv.scrollBy({ left: -width-10, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
    scrollDiv.scrollBy({ left: width + 10, behavior: 'smooth' });
});

