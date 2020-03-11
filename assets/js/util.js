
    successAlert =
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Success!</strong> ';
    dangerAlert =
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Danger!</strong> ';
    warningAlert =
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Danger!</strong> ';
    /*****************************************************************************************************/
    function printSuccessAlert(msg) {
        document.getElementById("successAlert").innerHTML = (successAlert + msg);
        document.getElementById("successAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("successAlert").style.display = 'none';
        }, 4000);
    }
    function printDangerAlert(msg) {
        document.getElementById("dangerAlert").innerHTML = (dangerAlert + msg);
        document.getElementById("dangerAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("dangerAlert").style.display = 'none';
        }, 4000);
    }
    function printWarningAlert(msg) {
        document.getElementById("warningAlert").innerHTML = (warningAlert + msg);
        document.getElementById("warningAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("warningAlert").style.display = 'none';
        }, 4000);
    }
    /*****************************************************************************************************/