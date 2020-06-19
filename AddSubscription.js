(function () {
    console.log("dashboard")


    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log("Logged in as " + firebaseUser.uid);
            var propId = document.location.search.replace(/^.*?\=/, '');
            console.log("propId = " + propId);
            fetchPropDetails(firebaseUser.uid, propId);
            attachFunctionalityToInputs(firebaseUser.uid, propId);
        } else {
            console.log('not logged in');
            window.location = "index.html";
        }
    })

}());

function fetchPropDetails(uid, propId) {
    const addressTitle = document.getElementById('addressTitle');
    firebase.database().ref('/users/' + uid + '/properties/' + propId).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        addressTitle.innerHTML = snapshot.val().address;
    });
}

function attachFunctionalityToInputs(uid, propId) {
    console.log("attach: " + uid + " " + propId);
    const txtDimensions = document.getElementById('txtDimensions');
    const txtFrequency = document.getElementById('txtFrequency');
    const txtStartDate = document.getElementById('txtStartDate');
    const btnCreateSub = document.getElementById('btnCreateSub');

    btnCreateSub.addEventListener('click', e => {
        console.log(txtDimensions.value + " " + txtFrequency.value + " " + txtStartDate.value);
        firebase.database().ref('users/' + uid + '/properties/' + propId + '/subscription').set({
            dimensions : txtDimensions.value,
            frequency : txtFrequency.value,
            nextDeliveryDate: txtStartDate.value,
        }).then(e => {
            console.log("subscription added!");
            console.log(e);
            window.location = "dashboard.html";
        })
    })
}