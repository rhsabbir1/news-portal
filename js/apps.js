const allNewsCatagoris = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayAllcatagorics(data.data.news_category))
}

const displayAllcatagorics = (data) => {
    const catagoryContainer = document.getElementById('catagory-container');
    data.forEach(catagory => {
        catagoryContainer.innerHTML += `
        <a class="text-decoration-none fs-5" href="">${catagory.category_name} </a>
        `;
    });
}

allNewsCatagoris()

