const removeActiveButtons = () => {
  const activeButtons = document.getElementsByClassName('active');
  for (let button of activeButtons) {
    button.classList.remove('active');
  }
};

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  const container = document.getElementById('details-container');
  const modal = document.getElementById('video_details');

  container.innerHTML = '';
  const videoDetails = document.createElement('div');

  videoDetails.innerHTML = `
  <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
   
  </div>
</div>
  `;
  container.appendChild(videoDetails);
  modal.showModal();
};

function loadCategories() {
  // 1----------------- fetch categories -----------------
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //2----------------- convert response to json -----------------
    .then((res) => res.json())
    //3-send data to displayCategories function
    .then((data) => {
      displayCategories(data.categories);
    });
}

function loadVideos(text = '') {
  removeActiveButtons();
  const allbtn = document.getElementById('all-btn');
  allbtn.classList.add('active');
  // 1----------------- fetch videos -----------------
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${text}`
  )
    //2----------------- convert response to json -----------------
    .then((res) => res.json())
    //3-send data to displayVideos function
    .then((data) => displayVideos(data.videos));
}

const loadVideosByCategory = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveButtons();
      const clickButton = document.getElementById(`btn-${categoryId}`);
      clickButton.classList.add('active');
      displayVideos(data.category);
    });
};
/* {
  "category_id": "1001",
  "video_id": "aaaa",
  "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
  "title": "Shape of You",
  "authors": [
  {
  "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
  "profile_name": "Olivia Mitchell",
  "verified": ""
  }
  ],
  "others": {
  "views": "100K",
  "posted_date": "16278"
  },
  "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
  }, */
// {
//   "category_id": "1001",
//   "category": "Music"
// }

function displayCategories(categories) {
  //get the categories container
  const categoriesContainer = document.getElementById('catagory-container');
  //loop through the categories
  for (let cat of categories) {
    // create a div element
    const catagoryDiv = document.createElement('div');
    catagoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadVideosByCategory(${cat.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white ">${cat.category}</button>
    `;
    //append each category to the categories container
    categoriesContainer.appendChild(catagoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
  if (videos.length === 0) {
    videoContainer.innerHTML = `<div class="my-55 items-center col-span-full flex flex-col text-center gap-10">
        <img class="w-[250px]" src="./assets/Icon.png" alt="" />
        <h1 class="text-2xl font-bold">
          Oops!! Sorry, There is no<br />
          content here
        </h1>
      </div>`;
    return;
  }
  videos.forEach((video) => {
    // Create a div element
    const videoDiv = document.createElement('div');
    videoDiv.innerHTML = `
        <div class="card bg-base-100">
        <figure class="w-full h-50 relative">
          <img class="w-full h-[180px] object-cover" src="${
            video.thumbnail
          } alt="Shoes" />
          <span
            class=" absolute bottom-5 right-1 text-sm text-white bg-black opacity-[50%] px-2 rounded"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="font-bold">
              ${video.title}
            </h2>
            <p class="text-sm text-gray-400 flex">
              ${video.authors[0].profile_name}

            ${
              video.authors[0].verified
                ? `<img
              class="w-5 h-5"
              src="./assets/icons8-verified-48.png"
              alt=""
              srcset=""
            />`
                : ''
            }
             
            </p>
            <p class=" text-gray-400 flex">
            ${video.others.views} views
            </p>
          </div>
        </div>
        <button id="details-${video.video_id}" onclick="loadVideoDetails('${
      video.video_id
    }')" class="btn btn-block">Details</button>
      </div>

    `;
    videoContainer.appendChild(videoDiv);
  });
};
document.getElementById('search-input').addEventListener('keyup', function (e) {
  const input = e.target.value;
  // console.log(input);
  
    loadVideos(input);
  
});
loadCategories();
