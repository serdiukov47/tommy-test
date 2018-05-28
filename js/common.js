var slides = document.querySelectorAll('.main-slider .slide'),
    currentSlide = 0,
    buttons = document.querySelectorAll(".slide__btn"),
    slideInterval = setInterval(nextSlide, 5000),
    slider = document.querySelector('.main-slider');

slider.style.height = slides[0].offsetHeight + 20 + 'px';
window.onresize = function(event) {
      slider.style.height = slides[0].offsetHeight + 20 + 'px';
};
function nextSlide(){
    slides[currentSlide].className = 'slide out';
    setTimeout(function() {
      slides[currentSlide].className = 'slide';
      currentSlide = (currentSlide+1)%slides.length;
      slides[currentSlide].className = 'slide active';
    }, 750);

}
function btnClick(event) {
    event.preventDefault();
    let link = this.querySelector('.icon'),
        currentDiv = this.closest('.active'),
        expanded = currentDiv.querySelector(".slide__expanded-area");
    console.log("this:"+ this +" "+link +"Current div :"+"Current expanded : " + expanded);
    if(link.classList.contains('open-icon')){
        link.classList.remove('open-icon');
        link.classList.add('close-icon');
        expanded.classList.add('open');
        expandedFunc(expanded);
        clearInterval(slideInterval);
    } else {
      link.classList.add('open-icon');
      link.classList.remove('close-icon');
      expanded.classList.remove('open');
      expanded.classList.add('closed');
      setTimeout(function() {
        expanded.classList.remove('closed');
        slideInterval = setInterval(nextSlide,5000);
      }, 2000);
    }

};
function expandedFunc(element){
      var items = element.querySelectorAll('.product-item'),
          itemsBlock = element.querySelector('.product-items');
      setTimeout(function() {
        var randomItem = setInterval(function(){
        if(element.classList.contains('open')){
            for( let i = 0; i < items.length; i++){
              let swapIdx = Math.trunc(Math.random() * items.length);
              itemsBlock.insertBefore(itemsBlock.children[swapIdx], itemsBlock.children[i]);
            }
        } else {
            clearInterval(randomItem);
        }

      }, 2000);
    }, 2000);

}
Array.from(buttons).forEach(function(element) {
    element.addEventListener('click', btnClick);
});
