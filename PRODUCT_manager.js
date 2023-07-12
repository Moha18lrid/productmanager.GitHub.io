let title = document.getElementById('title');
let price = document.getElementById('prix');
let price_s = document.getElementById('prix_s');
let total = document.getElementById('total');
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let category = document.getElementById('categorie');
let mood = 'create';
let tmp;

//console.log(title,price,price_s,total,count,submit);

//get total
function gertotl() {
    if (price.value != '') {
        let result = +price.value - +price_s.value;
        total.style.background = '#040';
        if (result < 0) {
            total.style.background = 'rgb(172, 0, 0)';
        }
        total.innerHTML = result;
    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgb(172, 0, 0)';
    }
}
//creat
let datap;
if (localStorage.product != null) {
    datap = JSON.parse(localStorage.product);
}
else (
    datap = []
);
submit.onclick = function () {
    let newp = {
        title: title.value.toLowerCase(),
        price: price.value,
        price_s: price_s.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && count.value>1 &&count.value < 100 && category.value != '') {

        if (mood === 'create') {
            if (newp.count > 1) {
                for (let j = 0; j < newp.count; j++) {
                    datap.push(newp);
                }
            } else { datap.push(newp); }
        }

        else {
            datap[tmp] = newp;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearall();
    }

    localStorage.setItem('product', JSON.stringify(datap))
    console.log(datap);


    showd();

}
//save
//clear all
function clearall() {
    title.value = '';
    price.value = '';
    price_s.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.background = 'rgb(172, 0, 0)';

}
//read
function showd() {
    let table = '';
    for (let i = 0; i < datap.length; i++) {
        table += `<tr>
        <th>${i+1}</th>
        <th>${datap[i].title}</th>
        <th>${datap[i].price}</th> 
        <th>${datap[i].price_s}</th> 
        <th>${datap[i].total}</th> 
        <th>${datap[i].category}</th> 
        <th><button onclick="update(${i})">update</button></th>
        <th><button onclick="deleted(${i})">delete</button></th> 
        </tr>`
            ;
    }
    document.getElementById('table').innerHTML = table;
    let btnd = document.getElementById('dall');
    if (datap.length > 0) {
        btnd.innerHTML = `
       <button onclick="deletall()">delete all (${datap.length})</button> `
    }
    else {
        btnd.innerHTML = '';
    }
}
showd()
//count

//dlete
function deleted(i) {
    datap.splice(i, 1);
    localStorage.product = JSON.stringify(datap);
    showd();

}
function deletall() {
    localStorage.clear();
    datap.splice(0);
    showd();

}
//update
function update(i) {
    title.value = datap[i].title;
    price.value = datap[i].price;
    price_s.value = datap[i].price_s;
    category.value = datap[i].category;
    gertotl();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//search
let smood = 'title';


function getsearch(id) {
    let search = document.getElementById('search');
    if (id == 'stitre') {
        smood = 'title';
        search.placeholder = 'searche by titel';
    }
    else {
        smood = 'category';
        search.placeholder = 'searche by category';
    }
    search.focus();
    search.value = '';
    showd();

}
function searchd(value) {
    let table = '';
    if (smood == 'title') {
        for (let z = 0; z < datap.length; z++) {
            if (datap[z].title.includes(value.toLowerCase())) {
                table += `<tr>
        <th>${z}</th>
        <th>${datap[z].title}</th>
        <th>${datap[z].price}</th> 
        <th>${datap[z].price_s}</th> 
        <th>${datap[z].total}</th> 
        <th>${datap[z].category}</th> 
        <th><button onclick="update(${z})">update</button></th>
        <th><button onclick="deleted(${z})">delete</button></th> 
        </tr>`
                    ;
            }
        }





    }
    else {
        for (let z = 0; z < datap.length; z++) {
            if (datap[z].category.includes(value.toLowerCase())) {
                table += `<tr>
        <th>${z}</th>
        <th>${datap[z].title}</th>
        <th>${datap[z].price}</th> 
        <th>${datap[z].price_s}</th> 
        <th>${datap[z].total}</th> 
        <th>${datap[z].category}</th> 
        <th><button onclick="update(${z})">update</button></th>
        <th><button onclick="deleted(${z})">delete</button></th> 
        </tr>`
                    ;
            }
        }
    }
    document.getElementById('table').innerHTML = table;

}

//clean data
