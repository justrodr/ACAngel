(function () {

  // var firebaseConfig = {
  //   apiKey: "Secret",
  //   authDomain: "Secret",
  //   databaseURL: "Secret",
  //   projectId: "Secret",
  //   storageBucket: "Secret",
  //   messagingSenderId: "Secret",
  //   appId: "Secret",
  //   measurementId: "Secret"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  btnLogin.addEventListener('click', e => {

    console.log("Login button pressed");
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  })

  btnSignUp.addEventListener('click', e => {

    console.log("Sign Up button pressed");
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign in
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(e => {
      console.log(e.uid);
      firebase.database().ref('users/' + e.uid).set({
        uid: e.uid,
        email: email
      });
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("Logged in as" + firebaseUser.uid);
      //redirect to main dashboard
      window.location = "dashboard.html";
    } else {
      console.log('not logged in');
    }
  })

}());