
let currentQuery = "business"
let currentPage = 1;
const fetchNews = async (page, q) => {
  console.log(`Fetching news for ${q}, page number ${page}...`);
  var url = 'https://newsapi.org/v2/everything?' +
    'q=' + q +
    '&from=2023-12-19&' +
    'pageSize=15&' +
    'page=' + page +
    '&sortBy=popularity&' +
    'apiKey=c7b45bff52a24695993efb7128a690ed';

  var req = new Request(url);

  let a = await fetch(req)
  let response = await a.json()


  let str = ""
  resultCount.innerHTML = response.totalResults

  for (let item of response.articles) {
    str = str + `<div class="card my-4 mx-4" style="width: 21rem;">
        <img height="160" src="${item.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title.slice(0, 26)}</h5>
          <p class="card-text">${item.description.slice(0, 123)}</p>
          <a href="${item.url}" target="_blank" class="btn btn-primary">Read Article..</a>
        </div>
      </div>`
  }
  document.querySelector(".content").innerHTML = str
}

fetchNews(1, currentQuery)
search.addEventListener("click", (e) => {
  e.preventDefault()
  let query = searchInput.value
  currentQuery = query
  fetchNews(1, query)
})

prev.addEventListener("click", (e) => {
  e.preventDefault()
  if (currentPage > 1) {
    currentPage = currentPage - 1
    fetchNews(currentPage, currentQuery)
  }
})

next.addEventListener("click", (e) => {
  e.preventDefault()
  currentPage = currentPage + 1
  let query = searchInput.value
  fetchNews(currentPage, currentQuery)
})

