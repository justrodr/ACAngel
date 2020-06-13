const txtAddress = document.getElementById('txtAddress');
const txtTenantName = document.getElementById('txtTenantName');
const txtTenantPhone = document.getElementById('txtTenantPhone');
const btnAddHome = document.getElementById('btnAddHome');
console.log("Add home");

btnAddHome.addEventListener('click', e => {

  console.log("Add home button pressed");
  const address = txtAddress.value;
  const tenantName = txtTenantName.value;
  const tenantPhone = txtTenantPhone.value;
  const uid = firebase.auth().currentUser.uid;
  console.log("uid: " + uid);
  var newPostKey = firebase.database().ref().child('posts').push().key;

  firebase.database().ref('users/' + uid + '/properties/' + newPostKey).set({
    address: address,
    tenantName: tenantName,
    tenantPhone: tenantPhone
  }).then(e => {
    console.log("user data set");
    console.log(e);
    window.location = "dashboard.html";
  })

})