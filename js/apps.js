const allNewsCatagoris = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayAllcatagorics(data.data.news_category))
}

const displayAllcatagorics = (data) => {

    data.forEach(catagory => {
        
    });
}

allNewsCatagoris()



// git add .
// git commmit -m"get catagories"
// git push