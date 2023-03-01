const allNewsCatagoris = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayAllcatagorics(data.data.news_category))
}

const displayAllcatagorics = (data) => {
    const catagoryContainer = document.getElementById('catagory-container');
    data.forEach(catagory => {
        // console.log(catagory)
        catagoryContainer.innerHTML += `
        <p>
           <a class="text-decoration-none fs-5" onclick=" getAllNewsById('${catagory.category_id}' , '${catagory.category_name}')">${catagory.category_name} </a>
        </p>
        `;
    });
}


const getAllNewsById = (category_id , name) =>{
    const URL =` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => showGetNews(data.data , name))
}

const showGetNews =(data , name) =>{
    document.getElementById('catagory-count').innerText = data.length;
    document.getElementById('catagory-name').innerText = name;
    data.forEach(singleNews =>{
        
    })
}

allNewsCatagoris()

