//Blog Page
function allPost() {
    document.getElementById("post_content").style.display = "none";
    document.getElementById("all_post").style.display = "block";
}
function showPostContent() {
    document.getElementById("all_post").style.display = "none";
    document.getElementById("post_content").style.display = "block";
}
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

//Hamburger Menu
/*const cart = document.getElementById("cart");
const offcanvas = document.getElementById("offcanvasContent");*/
const navbar_btn = document.querySelector(".navbar-toggler");
navbar_btn.onclick = function() {
    document.body.classList.toggle("show");
}

//Add to Cart Button
const addtoCartButton = document.querySelectorAll('.btn');
addtoCartButton.forEach(button => {
	button.addEventListener('click', cartClick);
});
function cartClick() {
	let button = this;
	button.classList.add('clicked');
}
const listItemsCount = document.querySelectorAll(".listItem .card").length;
document.querySelector(".quantity").innerText = listItemsCount;

/*const myCarousel = document.getElementById('carouselFade');
myCarousel.addEventListener('slide.bs.carousel', event =>{
    var prevbtn = document.getElementById('carousel-control-prev');
    var nextbtn = document.getElementById('carousel-control-next');
    prevbtn.onclick = function() {
        document.getElementById("text-item").textContent="EcoChic Vegan Leather Handbag";
    }
    nextbtn.onclick = function() {
        document.getElementById("text-item").textContent="Bamboo Shades";
    }
})*/

//Quantity Form
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
            // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//Product Section Carousel (Home Page)
const wrapper = document.querySelector(".products");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".products i");
const carouselChildrens = [...carousel.children];
let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

/*function getPageList(totalPages, page, maxLength){
    function range(start, end){
        return Array.from(Array(end - start + 1), (_,i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftwidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    
    if(totalPages <= maxLength){
        return range(1, totalPages);
    }
    if(page <= maxLength - sideWidth - 1 - rightWidth){
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
    if(page >= totalPages - sideWidth - 1 - rightWidth){
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftwidth, totalPages));
    }
    return range(1, sideWidth).concat(0, range(page - leftwidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}*/

//Product Page
$(function(){
    var numberOfItems = $(".outer-row2 .card").length;
    var limitPerPage = 1; //How many card items visible per a page
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    //var paginationSize = 1; //How many page elements visible in the pagination
    var currentPage;

    function showPage(widthPage){
        if (whichPage < 1 || whichPage > totalPages) return false;

        currentPage = whichPage;

        $(".outer-row2 .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
        $(".second-opt .pagination li").slice(1, -1).remove();

        /*getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
            .toggleClass("active", item == currentPage).append($("<a>").addClass("page-link")
            .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
        });*/
        
        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
    }
    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
        $("<span>").text("|"),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next").append($("<span>").addClass("fa fa-angle-right")))
    );

    $(".outer-row2").show();
    showPage(1);
    
    $(document).on("click", ".pagination li.current-page:not(.active)", function(){
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function(){
        return showPage(currentPage + 1);
    });

    $(".previous-page").on("click", function(){
        return showPage(currentPage - 1);
    });
});

/*let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range-fill");

// Function to validate range and update the fill color on slider
function validateRange() {
  let minPrice = parseInt(inputElements[0].value);
  let maxPrice = parseInt(inputElements[1].value);

  if (minPrice > maxPrice) {
    let tempValue = maxPrice;
    maxPrice = minPrice;
    minPrice = tempValue;
  }

  const minPercentage = ((minPrice - 10) / 490) * 100;
  const maxPercentage = ((maxPrice - 10) / 490) * 100;

  rangeFill.style.left = minPercentage + "%";
  rangeFill.style.width = maxPercentage - minPercentage + "%";

  minValue.innerHTML = "₱" + minPrice;
  maxValue.innerHTML = "₱" + maxPrice;
}

const inputElements = document.querySelectorAll(".price-range");

// Add an event listener to each input element
inputElements.forEach((element) => {
  element.addEventListener("input", validateRange);
});

// Initial call to validateRange
validateRange();*/

/*
$(window).width(function() {
    if ($(window).width() <= 767) {
        cart.onclick = function() {
            document.location = "./cart.html";
            offcanvas.remove();
            document.body.removeAttribute("class");
            document.body.removeAttribute("style");
            document.querySelector(".offcanvas-backdrop").remove();
        }
    }
});
*/