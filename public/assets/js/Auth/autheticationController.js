$(() => {
    successAlert = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        //'<strong>Success!</strong> User created successfully.'
        '<strong>Success!</strong> ';
    dangerAlert = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Danger!</strong> ';
    warningAlert = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Warning!</strong> ';
    //'<strong>Warning!</strong> To create the Warehouse you must be authenticated.';
    const auth = new Authentication();
    $("#btnSignUp").click(() => {

        const userName = $("#txtUserNameReg").val();
        const email = $("#txtEmailReg").val();
        const password = $("#txtPasswordReg").val();

        auth.createEmailAccount(userName, email, password);
    })

    $("#btnLoginEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();

        auth.autheticaticateWithEmailAndPass(email, password);
    });

});