class Authentication{

    autheticaticateWithEmailAndPass(){

    }

    createEmailAccount(userName, email, pass){
        firebase.auth().createUserWithNameAndPassword(email, pass)
        .then(result =>{
            result.user.updateprofile({
                displayName: userName
            })
            result.user.sendEmailVerification().catch(error =>{
                console.log(error)
            })

            firebase.auth().signOut()

        }).catch(error =>{
            console.log(error)
        })

        
    }
}