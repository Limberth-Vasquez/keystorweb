class Authentication {
  constructor() {
    this.auth = firebase.auth();
  }

  autheticaticateWithEmailAndPass(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then(result => {
      console.log(result);
      if (result.user.emailVerified) {
        window.location.replace("index.html");
      } else {
        this.auth.signOut();
      }
    })
  }

  createEmailAccount(userName, email, pass) {
    this.auth.createUserWithEmailAndPassword(email, pass)
      .then(result => {
        result.user.updateProfile({
          displayName: userName
        })
        result.user.sendEmailVerification().catch(error => {
          console.log(error)
        })

        window.location.replace("auth-signin.html");
        // firebase.auth().signOut()

      }).catch(error => {
        console.log(error)
      })
  }
}
