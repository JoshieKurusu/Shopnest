var minValue = document.getElementById("smallView-min-value");
var maxValue = document.getElementById("smallView-max-value");

const minPriceCounter = document.querySelector("span #min-price-counter");
const maxPriceCounter = document.querySelector("span #max-price-counter");

const rangeFill = document.querySelector(".price-filter .price .range-slider .range-fill");

// Function to validate range and update the fill color on slider
function validateRange() {
    let minPrice = parseFloat(inputElements[0].value);
    let maxPrice = parseFloat(inputElements[1].value);

    // Swap the values if minPrice is greater than maxPrice
    if (minPrice > maxPrice) {
        let tempValue = maxPrice;
        maxPrice = minPrice;
        minPrice = tempValue;
    }

    // Calculate the percentage position for min and max values
    const minPercentage = ((minPrice - 25) / 54.99) * 100;
    const maxPercentage = ((maxPrice - 25) / 54.99) * 100;

    // Set the position and width of the fill color element to represent the selected range
    rangeFill.style.left = minPercentage + "%";
    rangeFill.style.width = maxPercentage - minPercentage + "%";

    // Update the displayed min and max values
    minValue.innerHTML = "₱" + minPrice;
    maxValue.innerHTML = "₱" + maxPrice;

    // Display the min and max price in the button
    minPriceCounter.innerHTML = minValue.textContent;
    maxPriceCounter.innerHTML = maxValue.textContent;
}

// Get references to the input elements
const inputElements = document.querySelectorAll(".price-filter .price .range-slider input");

// Add an event listener to each input element
inputElements.forEach((element) => {
  element.addEventListener("input", validateRange);
});

// Initial call to validateRange
validateRange();

var largeMinValue = document.getElementById("bigView-min-value");
var largeMaxValue = document.getElementById("bigView-max-value");

const largeRangeFill = document.querySelector(".price-filter .collapse .range-slider .range-fill");

// Function to validate range and update the fill color on slider
function largeValidateRange() {
    let minPrice = parseFloat(largeInputElements[0].value);
    let maxPrice = parseFloat(largeInputElements[1].value);

    // Swap the values if minPrice is greater than maxPrice
    if (minPrice > maxPrice) {
        let tempValue = maxPrice;
        maxPrice = minPrice;
        minPrice = tempValue;
    }

    // Calculate the percentage position for min and max values
    const minPercentage = ((minPrice - 25) / 54.99) * 100;
    const maxPercentage = ((maxPrice - 25) / 54.99) * 100;

    // Set the position and width of the fill color element to represent the selected range
    largeRangeFill.style.left = minPercentage + "%";
    largeRangeFill.style.width = maxPercentage - minPercentage + "%";

    // Update the displayed min and max values
    largeMinValue.innerHTML = "₱" + minPrice;
    largeMaxValue.innerHTML = "₱" + maxPrice;
}

// Get references to the input elements
const largeInputElements = document.querySelectorAll(".price-filter .collapse .range-slider input");

// Add an event listener to each input element
largeInputElements.forEach((el) => {
  el.addEventListener("input", largeValidateRange);
});

// Initial call to validateRange
largeValidateRange();

//Add to Cart
const listItemsCount = document.querySelectorAll(".listItem .card").length;
document.querySelector(".quantity").innerText = listItemsCount;

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
/*
// Product List
const item_data = [
    {
        id: 1,
        name: "EcoChic Vegan Leather Handbag",
        img: "img/11062b_0e8a225f5d424cc0ab6ec38a522202a3~mv2.webp",
        amount: 79.99,
        category: "Eco-Friendly Fashion",
        type: "Recommended",
    },
    {
        id: 2,
        name: "Bamboo Shades",
        img: "img/nsplsh_426f6667655646472d5f77~mv2_d_4187_6274_s_4_2.webp",
        amount: 45.99,
        category: "Eco-Friendly Fashion",
        type: "Newest",
    },
    {
        id: 3,
        name: "Organic Cotton Tee",
        img: "img/11062b_dc64a726dac849d1895cf9a5bfa9a645~mv2_d_4296_2864_s_4_2.webp",
        amount: 25.00,
        category: "Eco-Friendly Fashion",
        type: "Recommended",
    },
    {
        id: 4,
        name: "Minimalist Vegan Leather Strap Watch",
        img: "img/177be88defb24aa6bfb93b859de0cb72.webp",
        amount: 49.99,
        category: "Minimalist Essentials",
        type: "Newest",
    },
    {
        id: 5,
        name: "Minimalist Vegan Leather Wallet",
        img: "img/11062b_6ce54fd498074e949698fb6dfa8d889b~mv2.webp",
        amount: 29.99,
        category: "Minimalist Essentials",
        type: "Recommended",
    },
    {
        id: 6,
        name: "Trendy Vegan Leather Tote Bag",
        img: "img/11062b_76ecfc12b433417a841d170372c9e91b~mv2.webp",
        amount: 75.00,
        category: "Vegan Leather Accessories",
        type: "Newest",
    },
    {
        id: 7,
        name: "EcoChic Recycled Backpack",
        img: "img/11062b_c1fec228c54541e68d46d06faca94bd8~mv2.webp",
        amount: 49.99,
        category: "Eco-Friendly Fashion",
        type: "Recommended",
    },
    {
        id: 8,
        name: "Sleek Vegan Leather Phone Case",
        img: "img/11062b_1b7ca1ff5f5541a6ab4176aaafc59121~mv2_d_1576_2117_s_2.webp",
        amount: 25.99,
        category: "Vegan Leather Accessories",
        type: "Newest",
    },
    {
        id: 9,
        name: "Organic Cotton Minimalist T-Shirt",
        img: "img/11062b_3aeb220403954d9bb93f0f3ebb0e3df0~mv2.webp",
        amount: 25.00,
        category: "Minimalist Essentials",
        type: "Recommended",
    },
];

const itemsContainer = document.querySelector(".item-list");
const categoryList = document.getElementById("productType");
function displayItems(items) {
    if (items.length > 0) {
        const item_details = items
        .map(
            (item) => 
            `<div class="card">
                <img src="${item.img}" alt="${item.name}"/>
                <div class="card-body">
                    <h6 class="name">${item.name}</h6>
                    <p class="amount">₱${item.amount}</p>
                </div>
            </div>`
        )
        .join("");
        itemsContainer.innerHTML = item_details;
        const cardOfList = document.querySelectorAll(".card").length;
        document.getElementById("item-counter").innerHTML = cardOfList;
        document.getElementById("smallScreen-item-counter").innerHTML = cardOfList;
    }
}

let dropdown = document.querySelector('.dropdown-menu');
// Example product array
dropdown.addEventListener('change', function() {
    let selectedSort = this.options[this.selectedIndex].text;

    switch (selectedSort) {
        case 'Recommended':
            item_data.sort((a, b) => a.type.localeCompare(b.type));
            document.getElementById("dropdown-choice").innerHTML = "Recommended";
            break;
        case 'Newest':
            item_data.sort((a, b) => a.type.localeCompare(b.type));
            document.getElementById("dropdown-choice").innerHTML = "Newest";
            break;
        case 'Price (low to high)':
            item_data.sort((a, b) => a.price - b.price);
            document.getElementById("dropdown-choice").innerHTML = "Price (low to high)";
            break;
        case 'Price (high to low)':
            item_data.sort((a, b) => b.price - a.price);
            document.getElementById("dropdown-choice").innerHTML = "Price (high to low)";
            break;
        case 'Name A-Z':
            item_data.sort((a, b) => a.name.localeCompare(b.name));
            document.getElementById("dropdown-choice").innerHTML = "Name A-Z";
            break;
        case 'Name Z-A':
            item_data.sort((a, b) => b.name.localeCompare(a.name));
            document.getElementById("dropdown-choice").innerHTML = "Name Z-A";
            break;
    }

    displayItems(item_data);
});

function setCategories() {
    const allCategories = item_data.map((item) => item.category);
    //console.log(allCategories);
    const categories = [
        "All Products",
        ...allCategories.filter((item, index) => {
            return allCategories.indexOf(item) === index;
        }),
    ];

    //console.log(categories);
    categoryList.innerHTML = categories
    .map(
        (category) => 
        //`<li>${category}</li>`
        `<div class="${category}">
            <input type="checkbox" name="productTypeCheckbox" id="${category}" value="${category}"/>
            <label for="${category}">${category}</label>
        </div>`
        )
        .join("");
    categoryList.addEventListener("click", (e) => {
        const selectedcategory = e.target.textContent;
        selectedcategory === "All Products" ? displayItems(item_data) : displayItems(item_data.filter((item) => item.category == selectedcategory));
    });
}

if (categories === onclick) {
    document.getElementById('allProd').classList.add('.live');
}
function handleCheckboxClick(event) {
    const checkbox = event.target;
    const categoryName = checkbox.parentElement.textContent.trim();
    const cat = categories.find((category) => category.name === categoryName);
    if (cat) {
        cat.active = checkbox.checked;
        setCategories();
    }
}
const checkboxes = document.querySelectorAll('input[name="productTypeCheckbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', handleCheckboxClick);
});

displayItems(item_data);
setCategories();
setPrices(); // Display products initially
*/

// Product Filter Choice
function reset_btn() {
    document.querySelector(".product-filter-choice").remove();
}


var allProductBtn = document.getElementById('all-products');
var ecofriendlyBtn = document.getElementById('eco-friendly');
var minimalistBtn = document.getElementById('minimalist');
var veganBtn = document.getElementById('vegan');

var productFilter = document.querySelector('.product-filter');
var productFilterSmall = document.querySelector(".offcanvas-body .product-filter");

var allProduct = document.querySelector('.allProduct');
var ecofriendly = document.querySelector('.ecofriendly');
var minimalist = document.querySelector('.minimalist');
var vegan = document.querySelector('.vegan');

var allProductItem = document.querySelector('.allProductItem');
var ecofriendlyItem = document.querySelector('.ecofriendlyItem');
var minimalistItem = document.querySelector('.minimalistItem');
var veganItem = document.querySelector('.veganItem');

allProductBtn.addEventListener('click', function(){
    // Change the Title based on the button clicked
    document.querySelector('.category-name').innerHTML = "All Products";

    // Add active class on the buttons when clicked
    this.classList.add('active');
    ecofriendlyBtn.classList.remove('active');
    minimalistBtn.classList.remove('active');
    veganBtn.classList.remove('active');

    // Display the product filter on sidebar
    productFilter.style.display = 'block';
    productFilterSmall.style.display = 'block';

    // Display the Div for title and paragraph
    allProduct.classList.add('active');
    ecofriendly.classList.remove('active');
    minimalist.classList.remove('active');
    vegan.classList.remove('active');

    // Display the div for the item products
    allProductItem.classList.add('effective');
    ecofriendlyItem.classList.remove('effective');
    minimalistItem.classList.remove('effective');
    veganItem.classList.remove('effective');

    // No of products visible in the item-list on Category Page
    const cardOfList = document.querySelectorAll(".item-list .effective .card").length;
    document.getElementById("item-counter").innerHTML = cardOfList;
    document.getElementById("smallScreen-item-counter").innerHTML = cardOfList;
});
ecofriendlyBtn.addEventListener('click', function(){
    // Change the Title based on the button clicked
    document.querySelector('.category-name').innerHTML = "Eco-Friendly Fashion";

    // Add active class on the buttons when clicked
    this.classList.add('active');
    allProductBtn.classList.remove('active');
    minimalistBtn.classList.remove('active');
    veganBtn.classList.remove('active');

    // Display the product filter on sidebar
    productFilter.style.display = 'none';
    productFilterSmall.style.display = 'none';

    // Display the Div for title and paragraph
    ecofriendly.classList.add('active');
    allProduct.classList.remove('active');
    minimalist.classList.remove('active');
    vegan.classList.remove('active');

    // Display the div for the item products
    ecofriendlyItem.classList.add('effective');
    allProductItem.classList.remove('effective');
    minimalistItem.classList.remove('effective');
    veganItem.classList.remove('effective');

    // No of products visible in the item-list on Category Page
    const cardOfList = document.querySelectorAll(".item-list .effective .card").length;
    document.getElementById("item-counter").innerHTML = cardOfList;
    document.getElementById("smallScreen-item-counter").innerHTML = cardOfList;
});
minimalistBtn.addEventListener('click',function(){
    // Change the Title based on the button clicked
    document.querySelector('.category-name').innerHTML = "Minimalist Essentials";

    // Add active class on the buttons when clicked
    this.classList.add('active');
    allProductBtn.classList.remove('active');
    ecofriendlyBtn.classList.remove('active');
    veganBtn.classList.remove('active');

    // Display the product filter on sidebar
    productFilter.style.display = 'none';
    productFilterSmall.style.display = 'none';

    // Display the Div for title and paragraph
    minimalist.classList.add('active');
    allProduct.classList.remove('active');
    ecofriendly.classList.remove('active');
    vegan.classList.remove('active');

    // Display the div for the item products
    minimalistItem.classList.add('effective');
    allProductItem.classList.remove('effective');
    ecofriendlyItem.classList.remove('effective');
    veganItem.classList.remove('effective');

    // No of products visible in the item-list on Category Page
    const cardOfList = document.querySelectorAll(".item-list .effective .card").length;
    document.getElementById("item-counter").innerHTML = cardOfList;
    document.getElementById("smallScreen-item-counter").innerHTML = cardOfList;
});
veganBtn.addEventListener('click', function(){
    // Change the Title based on the button clicked
    document.querySelector('.category-name').innerHTML = "Vegan Leather Accessories";

    // Add active class on the buttons when clicked
    this.classList.add('active');
    allProductBtn.classList.remove('active');
    ecofriendlyBtn.classList.remove('active');
    minimalistBtn.classList.remove('active');

    // Display the product filter on sidebar
    productFilter.style.display = 'none';
    productFilterSmall.style.display = 'none';

    // Display the Div for title and paragraph
    vegan.classList.add('active');
    allProduct.classList.remove('active');
    ecofriendly.classList.remove('active');
    minimalist.classList.remove('active');

    // Display the div for the item products
    veganItem.classList.add('effective');
    allProductItem.classList.remove('effective');
    ecofriendlyItem.classList.remove('effective');
    minimalistItem.classList.remove('effective');

    // No of products visible in the item-list on Category Page
    const cardOfList = document.querySelectorAll(".item-list .effective .card").length;
    document.getElementById("item-counter").innerHTML = cardOfList;
    document.getElementById("smallScreen-item-counter").innerHTML = cardOfList;
});

// No of products visible in the item-list on Category Page
const cardOfList = document.querySelectorAll(".item-list .effective .card").length;
document.getElementById("item-counter").innerHTML = cardOfList;
document.getElementById("smallScreen-item-counter").innerHTML = cardOfList;

var allCheckboxes = document.querySelectorAll('.collapse input[type=checkbox]');
var allItems = Array.from(document.querySelector('.item-list .card'));
var checked = {};

getChecked('productTypeCheckbox');

Array.prototype.forEach.call(allCheckboxes, function(el){
    el.addEventListener('change', toggleCheckbox);
});

function toggleCheckbox(e){
    getChecked(e.target.name);
    setVisibility();
}

function getChecked(name){
    checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function(el){
        return el.ariaValueMax;
    });
}

function setVisibility(){
    allItems.map(function(el){
        var productTypeCheckbox = checked.productTypeCheckbox.length ? _.intersection(Array.from(el.classList), checked.productTypeCheckbox).length : true;
        if (productTypeCheckbox){
            el.style.display = "block";
        }
        else {
            el.style.display = "none";
        }
    });
}
