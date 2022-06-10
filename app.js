const createbutton = document.getElementById("createbutton");
createbutton.addEventListener("click", () => {
  window.location.href = "./create.html";
});
var getPosts = () => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  firebase
    .database()
    .ref("blogs/")
    .once("value")
    .then((snapshot) => {
      let posts = document.getElementById("posts");
      let data = snapshot.val();
      Object.values(data).forEach((postdata) => {
        if (pattern.test(postdata.postdesc)) {
          posts.innerHTML = `<div class="post">
            <div class="info">
                <strong>${postdata.fullname}</strong>
                <a href="${postdata.postdesc}" target="_blank">${postdata.postdesc}</a>
            </div>
            <img src="${postdata.image}" id="postimg" alt="${postdata.fullname} pictures" />
            </div>${posts.innerHTML}`;
        }
        posts.innerHTML = `<div class="post">
            <div class="info">
                <strong>${postdata.fullname}</strong>
                <p>${postdata.postdesc}</p>
            </div>
            <img src="${postdata.image}" id="postimg" alt="${postdata.fullname} pictures" />
            </div>${posts.innerHTML}`;
        let image = document.getElementById("postimg");
        image.addEventListener("click", () => {
          download(`${postdata.image}`);
        });
      });
    });
};

window.onload = () => {
  this.getPosts();
};
