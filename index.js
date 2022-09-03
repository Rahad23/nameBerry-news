// navbar API
const firstApi = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(req => req.json())
    .then(data => reciveData(data))
    .catch(error => { 
        console.log(error.message);
    })
}
firstApi();
// get second navbar div id

const UlsecondNave = document.getElementById('ulSecondNav');
const spenars = document.getElementById('reloder');
const reciveData = data =>{
    const getApiArray = data?.data.news_category;
    getApiArray?.forEach(element => {

        const {category_id, category_name} = element;
        const createLi = document.createElement('li');
        createLi.setAttribute("id" ,`${category_id}`)
        createLi.style.fontWeight = "500";
        createLi.style.color = "#053f82";
        createLi.style.cursor = "pointer";
        createLi.innerText = category_name;
        UlsecondNave.appendChild(createLi);

        document.getElementById(category_id).addEventListener('click', function(){
            // Add spenars
            spenars.classList.remove('d-none');
        const categoriSearch = () =>{
             fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
            .then(req => req.json(req))
            .then(data => search(data))
           };
           categoriSearch();
           const search = data =>{
             const totalData = (data?.data.length);
            // set total data html
            const setTotal = document.getElementById('total');
            setTotal.innerText = totalData;
            const totalNews = document.getElementById('totalNews');
            totalNews.classList.remove('d-none');
            const message = document.getElementById('message');
            const parentDiv = document.getElementById('parent-div');
            if(data?.status === false){
                parentDiv.innerHTML = ``;
                message.classList.remove('d-none');
                // spenar reloader
                spenars.classList.add('d-none');
            }else{
                parentDiv.innerHTML = ``;
                message.classList.add('d-none');
                
            }

            const newsArry = data?.data;
            // sorting add
            const sorting = newsArry.sort((a, b) => (a.total_view < b.total_view ? 1 : -1));
            sorting?.forEach(element =>{
                // console.log(element);
            const {author, details, image_url, others_info, rating, thumbnail_url, title, total_view, _id} = element;
            // console.log(_id);

            if(details.length >250){

            const cutString = details.slice(0, 250);
            const setlast = cutString + '.....';
                
            const createDiv = document.createElement('div');
            createDiv.classList.add('col-12');
            const bootsCard = `
            <div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${setlast}</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  <div class="row mt-3">
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        <div class="text-center">
                            <img class="mb-1" src="${author.name===null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg':author.img}" alt="" style="width: 30%; border-radius: 50%;">
                            <span class="d-block">${author.name===null ? "not found": author.name}</span>
                            <span class="d-block">4-05-2022</span>
                        </div>
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-eye mx-2" style="font-size: 18px;"></i>
                        <span style="font-weight: 700; color: #2b1e1e;">${total_view===null  ? "No view": total_view}</span>
                    </div>
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        <i class="fa-regular fa-star-half-stroke" style="margin-left: 5px; font-size: 20px; color: #515151;"></i>
                        <i class="fa-regular fa-star" style="margin-left: 5px; font-size: 20px; color: #515151;"></i>
                        <i class="fa-regular fa-star" style="margin-left: 5px; font-size: 20px; color: #515151;"></i>
                        <i class="fa-regular fa-star" style="margin-left: 5px; font-size: 20px; color: #515151;"></i>
                        <i class="fa-regular fa-star" style="margin-left: 5px; font-size: 20px; color: #515151;"></i>
                    </div>
                    <div class="col-3 d-flex justify-content-end align-items-center p-5">
                     <i  onclick="modal('${_id}')" class="fa-solid fa-right-long" style="font-size: 18px; color: #5D5FEF; cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
                createDiv.innerHTML = bootsCard;
                parentDiv.appendChild(createDiv);
                spenars.classList.add('d-none');
            }
            });
            // console.log(element);
           }
           search();
        });
        
    });

}

const modal = id =>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(req => req.json())
    .then(data => idData(data))
    .catch(error => { 
        console.log(error.message);
    })
    // console.log(id);
}

const idData = data =>{
    const getData = data?.data[0];
    console.log(getData?.category_id);
    console.log(getData?.author?.name);
    
    const getModalId = document.getElementById('modal-b');
    getModalId.innerHTML =``;
    const createDiv = document.createElement('div');
    createDiv.classList.add('d-flex');
    createDiv.classList.add('justify-content-center');
    const bCard = `
    <div class="card" style="width: 25rem;">
        <div class="p-2">
           <img src="${getData?.thumbnail_url}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">${getData?.title}</h5>
          <p class="card-text">${getData?.details}</p>
          <div class="mt-2 mb-2">
            <img src="${getData?.total_view === null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg' : getData?.author?.img}" alt="" style="width: 15%; border-radius: 50%;">
            <span>${getData?.author?.name === null ? 'not found': getData?.author?.name}</span>
            <span style="margin-left: 15px">Views: ${getData?.total_view === null ? "No view" : getData?.total_view}</span>
          </div>
        </div>
      </div>
    `;
    createDiv.innerHTML = bCard;
    getModalId.appendChild(createDiv);
};

modal( );
reciveData();


