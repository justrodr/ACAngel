(function () {
  console.log("dashboard")

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("Logged in as " + firebaseUser.uid);
      loadUserData(firebaseUser.uid);
      loadProperties(firebaseUser.uid);
    } else {
      console.log('not logged in');
      window.location = "index.html";
    }
  })

}());

function loadUserData(uid) {
  console.log("load user data")
  return firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
    var email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
    console.log("username " + email);
    console.log(snapshot.val().properties);
  });
}

function loadProperties(uid) {
  console.log("load properties");
  var tableRef = document.getElementById('propertiesTable').getElementsByTagName('tbody')[0];
  return firebase.database().ref('/users/' + uid + '/properties').once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot.val());

      // Insert a row in the table at the last row
      var newRow = tableRef.insertRow();

      // Insert a cell in the row at index 0
      var addressCell = newRow.insertCell(0);
      var tenantCell = newRow.insertCell(1);
      var viewCell = newRow.insertCell(2);
      var addSubscription = newRow.insertCell(3);

      // Append a text node to the cell
      var addressText = document.createTextNode(childSnapshot.val().address);
      var tenantText = document.createTextNode(childSnapshot.val().tenantName);

      addressCell.appendChild(addressText);
      tenantCell.appendChild(tenantText);
      addSubscription.innerHTML = "<a href='" + "AddSubscription.html" + "?propId=" + childSnapshot.key + "'> test </a>";
      viewCell.innerHTML = "<a href='" + "ViewProperty.html" + "?propId=" + childSnapshot.key + "'> test </a>";

    });
  })
}

function signOut() {
  firebase.auth().signOut().then(function () {
    window.location = "index.html";
  }).catch(function (error) {
    // An error happened.
    console.log(error)
  });
}