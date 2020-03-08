class Authentication {
  constructor() {
    this.auth = firebase.auth();
  }

  autheticaticateWithEmailAndPass(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then(result => {
      console.log(result);
      if (result.user.emailVerified) {
        setTimeout(function () {
          window.location.replace("index.html");
        }, 4000);
        this.printSuccessAlert('User authenticated successfully.');
      } else {
        this.auth.signOut();
        this.printDangerAlert('User Email is not verified.');
      }
    }).catch(error => {
      console.log(error);
      this.printDangerAlert(error.message);
    });

  }

  createEmailAccount(userName, email, pass) {
    this.auth.createUserWithEmailAndPassword(email, pass)
      .then(result => {
        console.log(result);
        result.user.updateProfile({
          displayName: userName
        })
        result.user.sendEmailVerification().catch(error => {
          console.log(error);
          this.printDangerAlert(error.message);
          return;
        })
        setTimeout(function () {
          window.location.replace("auth-signin.html");
        }, 4000);
        this.printSuccessAlert('User created successfully.');
      }).catch(error => {
        console.log(error);
        this.printDangerAlert(error.message);
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
