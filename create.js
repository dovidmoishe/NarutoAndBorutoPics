let post__form = document.getElementById("post__form");
post__form.addEventListener("submit", (event) => {
  event.preventDefault();
  upload();
});
let image = document.getElementById("image");
let imagename = document.getElementById('imagename');
image.addEventListener("change", () => {
  document.getElementById("image").classList.add("uploaded");
  imagename.innerText = image.files[0].name;
});
function upload() {
  
  
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let image = document.getElementById("image").files[0];
  let fullname = fname + " " + lname;
  let postdesc = document.getElementById("description").value;
  if(postdesc.trim() == "") {
    postdesc = "No description"
  }
  var storageRef = firebase
    .storage()
    .ref()
    .child("images/" + image.name);
  var uploadTask = storageRef.put(image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      alert("error while uploading image..." + error.message);
    }
  );
  firebase
    .storage()
    .ref("images/" + image.name)
    .getDownloadURL()
    .then((url) => {
      let postdata = {
        fullname: fullname,
        image: url,
        postdesc: postdesc,
      };
      firebase
        .database()
        .ref("blogs/")
        .push()
        .set(postdata)
        .then(() => {
          alert("created post sucesfully");
          setTimeout(() => {
            window.location.href = "./";
          }, 2000);
        })
        .catch((err) => {
          alert(err.message);
        });
    });
}
