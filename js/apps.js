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
           <a class="text-decoration-none fs-5 " onclick=" getAllNewsById('${catagory.category_id}' , '${catagory.category_name}')">${catagory.category_name} </a>
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
    const showAllNews = document.getElementById('all-items');
    showAllNews.innerHTML = ' ';
    data.forEach(singleNews =>{
        console.log(singleNews)

        showAllNews.innerHTML +=`
          <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${singleNews.title}</h5>
                            <p class="card-text">
                               ${singleNews.details.slice(0 , 200)}
                            </p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    })
}

allNewsCatagoris()

