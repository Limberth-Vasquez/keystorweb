$(() => {
    $("#btnSignUp").click(() => {

        const userName = $("#txtUserNameReg").val();
        const email = $("#txtEmailReg").val();
        const password = $("#txtPasswordReg").val();

        const auth = new Authentication()
        auth.createEmailAccount(userName, email, password)

    })

    $("#btnLoginEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();

        const auth = new Authentication()
        auth.autheticaticateWithEmailAndPass(email, password)
    });

});