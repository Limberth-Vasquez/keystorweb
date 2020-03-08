class Index {
    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        
        this.loadUserLogin();
    }


    loadUserLogin() {
        this.auth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log(user);
                if(user.photoURL){
                    document.getElementById("userLoginName").innerHTML = user.photoURL + ' ' +   user.displayName;
                }else{
                    document.getElementById("userLoginName").innerHTML = '<img src="assets/images/ic_launcher-web.png" class="circle mr-3 image-responsive" width="55px" height="55px" > ' +  user.displayName;
                }
            } else {
                // No user is signed in.
                console.log(user);
                this.auth.signOut();
                window.location.replace("index.html");
            }
        });
    }

    printSuccessAlert(msg) {
        document.getElementById("successAlert").innerHTML = (successAlert + msg);
        document.getElementById("successAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("successAlert").style.display = 'none';
        }, 4000);
    }
    printDangerAlert(msg) {
        document.getElementById("dangerAlert").innerHTML = (dangerAlert + msg);
        document.getElementById("dangerAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("dangerAlert").style.display = 'none';
        }, 4000);
    }
    printWarningAlert(msg) {
        document.getElementById("warningAlert").innerHTML = (warningAlert + msg);
        document.getElementById("warningAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("warningAlert").style.display = 'none';
        }, 4000);
    }
}
