(function() {
    console.log("dashboard")

  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log("Logged in as" + firebaseUser.uid);
        //redirect to main dashboard
      } else {
        console.log('not logged in');
      }
  })

}());