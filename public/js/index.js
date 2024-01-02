// video player and containers
let videoPlayer = document.querySelector("#videoPlayer");
let videoList = document.querySelector("#videoList");
let videoContainer = document.querySelector(".video");
let videoTitle = document.querySelector("#videoTitle");
let videoDescription = document.querySelector("#videoDescription");

// control bar and control bar items
let controlBar = document.querySelector("#control-bar");
let pausePlayText = document.querySelector("#pausePlayText");
let soundText = document.querySelector("#soundText");
let directions = document.querySelector("#directions");
let input = document.querySelector("#enteredTime");

// control bar buttons
let rewind = document.querySelector("#rewind");
let pause = document.querySelector("#pause");
let play = document.querySelector("#play");
let volume = document.querySelector("#volume");
let noVolume = document.querySelector("#noVolume");
let fastForward = document.querySelector("#fastForward");

// variable to hold fetched data
var dataArr = [];

/* 
    On window load, fetch the data and render the list of videos
*/

const renderItems = (listItems) => {
  const url = "https://disney-assessment.s3.us-west-1.amazonaws.com";
  let itemsHtml = "";
  listItems.forEach((item, index) => {
    itemsHtml += (
      `<div class="card" data-index="${index}">
        <div class="image-container">
          <img class="static" src="${`${url}/preview-image/${item.fileId}.jpg`}" alt="${item.title}" />
          <img src="${`${url}/preview-gif/${item.fileId}.gif`}" alt="${item.title}" />
        </div>
        <div class="text-container">
          <div>${item.title}</div>
          <div>${item.duration}</div>
        </div>
      </div>`
    );
  });
  videoList.innerHTML = itemsHtml;
};

window.onload = async () => {
  try {
    let data = await fetch("/streams");
    if (data.ok) {
      dataArr = await data.json();
      renderItems(dataArr);
    } else{
      throw new Error(data.status);
    }
  } catch (error) {
    //show error message
    console.log(error);
    videoList.innerHTML = "<div class='errorMessage'>Uh oh, an error just occurred. Refresh your page and try again</div>";
  }
};

const onClick = async (e) => {
  const index = e.target.getAttribute("data-index");
  const {title, description, fileId} = dataArr[index];
  videoTitle.innerHTML = title;
  videoDescription.innerHTML = description;
  videoPlayer.src = `/video/${fileId}`;
  videoPlayer.load();
  videoPlayer.play();
  // if directions are still on screen, remove them
  if (directions.className === "directions"){
    directions.classList.toggle("hide");
    videoPlayer.classList.toggle("hide");
    controlBar.classList.toggle("hide");
  }
  // make sure to show pause button
  if (pause.className === "hide"){
    play.classList.toggle("hide");
    pause.classList.toggle("hide");
  }
};
// click listener for video list cards
videoList.addEventListener("click", async (e) => {
  if (e.target.hasAttribute("data-index")){
    await onClick(e);
  }
});

/* 
    Video Player Interaction
*/
// update pause/play buttons for clicking video directly
videoPlayer.addEventListener("click", () =>  {
  play.classList.toggle("hide");
  pause.classList.toggle("hide");
});

// show/hide video player controls on hover
["mouseover","mouseout"].forEach((type) => {
  videoContainer.addEventListener(type, () =>  {
    controlBar.classList.toggle("show");
  });
});

// fastForward/rewind button onclick
[rewind, fastForward].forEach((el) => {
  el.addEventListener("click", () => {
    if (el.id === "rewind"){
      videoPlayer.currentTime -= 10;
    } else {
      videoPlayer.currentTime += 10;
    }
  });
});

// pause/play button onclick
[pause, play].forEach((el) => {
  el.addEventListener("click", () => {
    if (el.id === "pause") {
      pausePlayText.innerHTML = "Play Video";
      videoPlayer.pause();
    } else {
      pausePlayText.innerHTML = "Pause Video";
      videoPlayer.play();
    }
    play.classList.toggle("hide");
    pause.classList.toggle("hide");
  });
});

// volume/noVolume button onclick
[volume, noVolume].forEach((el) => {
  el.addEventListener("click", () => {
    if (el.id === "noVolume") {
      soundText.innerHTML = "Unmute";
      videoPlayer.muted = true;
    } else {
      soundText.innerHTML = "Mute";
      videoPlayer.muted = false;
    }
    volume.classList.toggle("hide");
    noVolume.classList.toggle("hide");
  });
});

// video position input - on enter press
input.addEventListener( "keyup", (el) => {
  if (el.keyCode == 13) {
    const duration = videoPlayer.duration;
    const val = Number(el.target.value);
    input.value = "";
    // if value is greater than duration, exit
    if (val > duration){
      return; 
    }
    videoPlayer.currentTime = val;
  }
});
