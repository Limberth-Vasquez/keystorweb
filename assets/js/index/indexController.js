$(() => {
    //START
    const _index = new IndexDAO();
    var _isUserAuthenticated = false;
    var _isEditing = false;
    isUserAuthenticated();
    //START

    $(document).on("click", ".btnLogout", function (event) {
        _index.signOut();
        window.location.replace("../auth-signin.html");
    });
    /*****************************************************************************************************/
    function isUserAuthenticated() {
        _index.loadUserLogin(function (user) {
            if (user) {
                // User is signed in.
                if (user.photoURL != null && user.displayName != null) {
                    document.getElementById("userLoginName").innerHTML = user.photoURL + ' ' + user.displayName;
                    document.getElementById("userLoginName2").innerHTML = user.photoURL + ' ' + user.displayName;
                } else {
                    document.getElementById("userLoginName").innerHTML = '<img src="../assets/images/ic_launcher-web.png" class="circle mr-3 image-responsive" width="55px" height="55px" > ' + user.displayName;
                    document.getElementById("userLoginName2").innerHTML = '<img src="../assets/images/ic_launcher-web.png" class="img-radius" alt="User-Profile-Image"> ' + user.displayName;
                }
                _isUserAuthenticated = true;

                //printWarningAlert(' Error you must be authenticated.');
                //loadAll();
            } else {
                // No user is signed in.
                _isUserAuthenticated = false;
                printWarningAlert(' Error you must be authenticated.');
                //document.getElementById("closeModal").click();
                _index.signOut();
                window.location.replace("../auth-signin.html");
            }
            console.log(user);
        });
    }
    /*****************************************************************************************************/
});