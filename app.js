(function () {

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("Logged in as " + firebaseUser.uid);
      window.location = "dashboard.html";
    } else {
      console.log('not logged in');
    }
  })

}());