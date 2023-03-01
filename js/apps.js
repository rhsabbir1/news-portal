let fetchData = [];

const allNewsCatagoris = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data =>displayAllcatagorics(data.data.news_category))
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


const getAllNewsById = (category_id, name) => {
    const URL = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(URL)
        .then(res => res.json())
        .then(data =>{
            fetchData = data.data;
            showGetNews(data.data, name)
        } )
}

const showGetNews = (data, name) => {
    document.getElementById('catagory-count').innerText = data.length;
    document.getElementById('catagory-name').innerText = name;
    const showAllNews = document.getElementById('all-items');
    showAllNews.innerHTML = ' ';
    data.forEach(singleNews => {
        // console.log(singleNews)

        showAllNews.innerHTML += `
          <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 d-flex flex-column">
                        <div class="card-body">
                            <h5 class="card-title">${singleNews.title}</h5>
                            <p class="card-text">
                               ${singleNews.details.slice(0, 200)}...
                            </p>
                            
                        </div>
                        <div class="card-footer border-o d-flex justify-content-between align-items-center">
                             <div class="d-flex gap-4 align-items-center">
                                <img src="${singleNews.author.img}"class="rounded-circle" height="40" width="40" alt="">
                                <div>
                                  <p class="p-0 m-0">${singleNews.author.name ? singleNews.author.name : 'No user'}</p>
                                  <p class="p-0 m-0">Published Date : ${singleNews.author.published_date}</p>
                                </div>
                             </div>
                             <div>
                             <p>Total views : ${singleNews.total_view ? singleNews.total_view : 'No views'} M</p>
                             </div>
                             <div>
                              <button onclick="getNewsDetails('${singleNews._id}')" type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#showDetailsMOdal">Details</button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    })
}

const getNewsDetails = (news_id) => {
    const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => showDetails(data.data[0]))

}

const showDetails = (data) => {
 
    const showDetailsMOdals = document.getElementById('showDetailsMOdal')
    showDetailsMOdals.innerHTML = '';
    const creatDiv = document.createElement('div')
    creatDiv.classList.add('modal-dialog')
    creatDiv.innerHTML = `
  <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="showDetailsMOdalLabel">News Title : 
                            ${data.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           
                        <div class="col-md-12">
                        <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-12 d-flex flex-column">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5><span class="badge bg-warning text-dark">${data.others_info.is_trending ? 'Trending' : 'No result' || data.is_todays_pick ? 'Today Pick' : 'No result'}</span>
                            <p class="card-text">
                               ${data.details}
                            </p>
                            
                        </div>

                        <div class="card-footer border-o d-flex justify-content-between   align-items-center">
                      <div class="d-flex gap-4 align-items-center">
                             <img src="${data.author.img}"class="rounded-circle" height="40" width="40" alt="">
                         <div>
                          <p class="p-0 m-0">${data.author.name}</p>
                          <p class="p-0 m-0">Published Date : ${data.author.published_date}</p>
                      </div>
                 </div>
                 <div>
                 <p>Total views : ${data.total_view} M</p>
                 </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    
                    
  `;
    showDetailsMOdals.appendChild(creatDiv)
}

const todaypick =()=>{
    const todays_pick = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true)
    const catagoryName = document.getElementById('catagory-name').innerText;
    showGetNews(todays_pick , catagoryName)
}
const trending = () =>{
    const trending_items = fetchData.filter(singleData => singleData.others_info.is_trending === true)
    const catagoryName = document.getElementById('catagory-name').innerText;
    showGetNews(trending_items , catagoryName)
}


allNewsCatagoris()


// others_info
// : 
// is_todays_pick
// : 
// false
// is_trending
// : 
// true



// author
// :
// img
// :
// name
// :
// published_date
