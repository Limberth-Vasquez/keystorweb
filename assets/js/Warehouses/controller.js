const successAlert =
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Success!</strong> Warehouse created successfully.'
const dangerAlert =
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.';
const warningAlert =
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>Danger!</strong> To create the Warehouse you must be authenticated.';

$("#saveWarehouse").click(() => {
    const user = firebase.auth().currentUser

    if (user == null) {
        //Materialize.toast(`Para crear el Warehouse debes estar autenticado`, 4000)
        document.getElementById("warningAlert").style.display = 'block';
        document.getElementById("warningAlert").innerHTML = warningAlert;
        document.getElementById("closeModal").click();
        return
    }
    const description = $('#description').val();
    const name = $('#name').val();
    const Latitud = $('#Latitud').val();
    const Longitud = $('#Longitud').val();
    const Address = $('#Address').val();
    const imgUrl = $('#imgUrl').val();

    const warehouse = new Warehouse();
    warehouse.create(
        name,
        description,
        Latitud,
        Longitud,
        Address,
        imgUrl).then(resp => {

            document.getElementById("successAlert").style.display = 'block';
            document.getElementById("successAlert").innerHTML = successAlert;
            document.getElementById("closeModal").click();

        }).catch(err => {

            document.getElementById("dangerAlert").style.display = 'block';
            document.getElementById("dangerAlert").innerHTML = dangerAlert;
            //Materialize.toast(`Error => ${err}`, 4000)
        });
});
$(() => {

    // document.getElementById("successAlert").style.display = 'block';
    // document.getElementById("successAlert").innerHTML = successAlert;
})
/* $('#btnRegistroPost').click(() => {
    const post = new Post()
    const user = firebase.auth().currentUser

    if (user == null) {
        Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
        return
    }

    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const videoLink = $('#linkVideoNewPost').val()
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null' ? null : sessionStorage.getItem('imgNewPost')

    post.crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
    ).then(resp => {
        Materialize.toast(`Post creado correctamente`, 4000)

    }).catch(err => {
        Materialize.toast(`Error => ${err}`, 4000)
    })
}) */