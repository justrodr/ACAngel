(function () {

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

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(e => {
      console.log("create user")
      console.log(e.uid);
      firebase.database().ref('users/' + e.uid).set({
        uid: e.uid,
        email: email
      }).then(e => {
        console.log("user data set");
        console.log(e);
        window.location = "dashboard.html";
      })
    }).catch(function (error) {
      // Handle Errors here.
      console.log("error in creating user " + error)
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("Logged in as " + firebaseUser.uid);
    } else {
      console.log('not logged in');
    }
  })

}());