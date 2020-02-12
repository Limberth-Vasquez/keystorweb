class Authentication {

    autheticaticateWithEmailAndPass(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
              if (result.user.emailVerified) {
               
                window.location.replace("index.html");

              } else {
                
                firebase.auth().signOut()
               
              }
            })
    
    }

    createEmailAccount(userName, email, pass) {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(result =>{
            result.user.updateProfile({
                displayName: userName
            })
             result.user.sendEmailVerification().catch(error =>{
                console.log(error)
            })
            
            window.location.replace("auth-signin.html");
          // firebase.auth().signOut()

        }).catch(error =>{
            console.log(error)
        })
    }

}
