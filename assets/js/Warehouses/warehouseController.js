$(() => {
    const warehouse = new Warehouse();
    const successAlert =
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Success!</strong> '
    const dangerAlert =
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Danger!</strong> ';
    const warningAlert =
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Danger!</strong> ';

    loadWarehouses();
    function loadWarehouses() {
        warehouse.getAll();
    }

    $("#saveWarehouse").click(() => {

        const user = firebase.auth().currentUser
        if (user == null) {
            printWarningAlert(' To create the Warehouse you must be authenticated.');
            // document.getElementById("warningAlert").style.display = 'block';
            // document.getElementById("warningAlert").innerHTML = warningAlert;
            document.getElementById("closeModal").click();
            return;
        }
        const description = $('#description').val();
        const name = $('#name').val();
        const Latitud = $('#Latitud').val();
        const Longitud = $('#Longitud').val();
        const Address = $('#Address').val();
        const imgUrl = $('#imgUrl').val();


        warehouse.create(
            name,
            description,
            Latitud,
            Longitud,
            Address,
            imgUrl).then(resp => {
                warehouse.printSuccessAlert(' Warehouse created successfully.');
                /* document.getElementById("successAlert").style.display = 'block';
                document.getElementById("successAlert").innerHTML = successAlert; */
                document.getElementById("closeModal").click();

            }).catch(err => {
                warehouse.printDangerAlert(err.message);
                // document.getElementById("dangerAlert").style.display = 'block';
                // document.getElementById("dangerAlert").innerHTML = dangerAlert;
                //Materialize.toast(`Error => ${err}`, 4000)
            });
    });
    $(document).on("click", ".editRow", function (event) {
        var id = $(this).data("id");
        alert('editRow' + ' id: ' + id);
    })
    $(document).on("click", ".DeleteRow", function (event) {
        var id = $(this).data("id");
        alert('DeleteRow' + ' id: ' + id);
    })
})