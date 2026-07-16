/* =========================
Global Variables
========================= */

// api response array
let users = [];
let posts = [];
let comments = [];
let first5users = [];

let isLoading = false;
let counterForLoadMore = 10;

/* =========================
DOM Elements
========================= */

// document elements

// loading

const showLoading = document.querySelector("#showLoading");
// table

const tableBody = document.querySelector("#tableBody");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
// user profile modal

const userPostsModalParent = document.querySelector(".user-posts-modal-overlay");

const userProfileName = document.querySelector("#userProfileName");
const userProfileUsername = document.querySelector("#userProfileUsername");
const userProfileEmail = document.querySelector("#userProfileEmail");
const userProfilePhone = document.querySelector("#userProfilePhone");
const userProfilePosts = document.querySelector("#userProfilePosts");
const postTitle = document.querySelector(".post-title");
const postBody = document.querySelector(".post-body");
// user post comments modal

const userPostCommentParent = document.querySelector(".user-post-comment-modal-overlay");

const postCommentsUl = document.querySelector("#postCommentsUl");
const userCommentName = document.querySelector(".user-comment-name");
const userCommentEmail = document.querySelector(".user-comment-email");
const userComment = document.querySelector(".user-comment");

/* =========================
Event Listeners
========================= */

userPostsModalParent.addEventListener("click", (event) => {
  if (event.target === userPostsModalParent) {
    userPostsModalParent.style.display = "none";
  }
});

userPostCommentParent.addEventListener("click", (event) => {
  if (event.target === userPostCommentParent) {
    userPostCommentParent.style.display = "none";
  }
});

loadMoreBtn.addEventListener("click", () => {
  getMoreUsers();
});

/* =========================
API
========================= */

const getFetchData = async (urlAddress) => {
  if (isLoading) return;

  try {
    isLoading = true;

    showLoading.style.display = "flex";

    const response = await fetch(urlAddress);

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(`HTTP ${response.status}: data not found!`);
        case 500:
          throw new Error(`HTTP ${response.status}: internal server error!`);
        case 503:
          throw new Error(
            `HTTP ${response.status}: service unavailable. try again later!`,
          );
        default:
          throw new Error(`HTTP ${response.status}: Something went wrong!`);
      }
    }

    const dataJson = await response.json();

    return dataJson;

  } catch (error) {
    if (!navigator.onLine) {
      alert("Please check your internet connection!");
      return;
    }
    if (error instanceof TypeError) {
      alert("A network error occurred!");
      return;
    }
    alert(error.message);
  } finally {
    isLoading = false;
    showLoading.style.display = "none";
  }
}

const getUsers = async () => {
  let apiUsersResponse = await getFetchData("https://jsonplaceholder.typicode.com/users");
  users.push(...apiUsersResponse);
}
const getPosts = async () => {
  let apiPostsResponse = await getFetchData("https://jsonplaceholder.typicode.com/posts");
  posts = apiPostsResponse;
}
const getComments = async () => {
  let apiCommentsResponse = await getFetchData("https://jsonplaceholder.typicode.com/comments");
  comments = apiCommentsResponse;
}

/* =========================
Functions
========================= */

function getFirst5Users(array) {
  let first5Users = array.filter((element) => {
    return element.id <= 5;
  });
  loadMoreBtn.style.display = "block";
  return first5Users;
}

function getMoreUsers() {
  let moreUsers = users.filter((element) => {
    return element.id <= counterForLoadMore;
  });

  counterForLoadMore += 5;
  showUsers(moreUsers);
}



async function run() {
  await getUsers()
  showUsers(getFirst5Users(users));
}
run();

/* =========================
Render Functions
========================= */

function showUsers(array) {
  if (counterForLoadMore > users.length) {
    loadMoreBtn.style.display = "none";
  }
  tableBody.innerHTML = "";

  let userTableStructure = "";
  array.forEach((element) => {
    userTableStructure += `<tr title="click to see user profile" data-user-id="${element.id}" class="user-table-row">
    <td>${element.name}</td>
    <td>${element.address.city}</td>
    </tr>`;
  });

  tableBody.innerHTML = userTableStructure;

  tableBody.addEventListener("click", (event) => {
    const row = event.target.closest(".user-table-row");

    if (!row) return;

    showPosts(row.dataset.userId);
  });
}

async function showPosts(userId) {
  await getPosts();
  userPostsModalParent.style.display = "flex";

  const user = users.find(user => user.id === Number(userId));

  userProfileName.textContent = user.name;
  userProfileUsername.innerHTML = `<img src="icons/at-icon.png" /> ${user.username}`;
  userProfileEmail.innerHTML = `<img src="icons/email-icon.png" /> ${user.email}`;
  userProfilePhone.innerHTML = `<img src="icons/phone-icon.png" /> ${user.phone}`;


  userProfilePosts.innerHTML = "";
  let newPostTitleStructure = "";

  let userPosts = posts.filter((object) => {
    return object.userId == userId;
  });

  userPosts.forEach((element) => {
    newPostTitleStructure += `<li class="user-profile-post-title" title="click to read post" data-post-id="${element.id}">
    <p href="#" class="post-title-profile-paragraph">${element.title}</p>
    </li>`;
  });

  userProfilePosts.innerHTML = newPostTitleStructure;

  userProfilePosts.addEventListener("click", (event) => {
    const row = event.target.closest(".user-profile-post-title");
    if (!row) return;
    showComments(row.dataset.postId);
  });
}
async function showComments(postId) {
  await getComments();
  userPostCommentParent.style.display = "flex";

  const post = posts.find(post => post.id === Number(postId));

  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  postCommentsUl.innerHTML = "";
  let newCommentStructure = "";

  let postComments = comments.filter((object) => {
    return object.postId == postId;
  });

  postComments.forEach((element) => {
    newCommentStructure += `<li>
      <div class="user-comment-profile-info">
        <p class="user-comment-name">${element.name}</p>
        <p class="user-comment-email"><img src="icons/email-icon.png" /> ${element.email}</p>
      </div>
      <p class="user-comment">${element.body}</p>
    </li>`;
  });

  postCommentsUl.innerHTML = newCommentStructure;
}
