$(() => {
    $(document).ready(function () {
    });
    //START
    const _dao = new UserDAO();
    var _isUserAuthenticated = false;
    var _isEditing = false;
    isUserAuthenticated();
    //START
    /*****************************************************************************************************/
    $(document).on("click", ".btnLogout", function (event) {
        logOut();
    });

    function logOut() {
        _dao.signOut().then(() => {
            window.location.replace("../index.html");
        });
        //window.location.replace("auth-signin.html");
    }
    /*****************************************************************************************************/
    function loadAll() {
        _dao.getAll().onSnapshot(querySnapshot => {
            if (querySnapshot.empty) {
                printWarningAlert(' Not results found.');
                $('#tbody').empty();
            } else {
                querySnapshot.forEach(result => {
                    //console.log(result.data());
                    $('#tbody').empty();
                    querySnapshot.forEach(row => {
                        //console.log(row);
                        let rowHtml = getRowTempate(
                            row.id,
                            (row.data().name + ' ' + row.data().lastName),
                            row.data().personalID,
                            row.data().email,
                            row.data().phoneNumber,
                            row.data().lat,
                            row.data().lng,
                            row.data().rolID,
                            row.data().creationDate,
                            row.data().keystorApproved,
                            row.data().active,
                        );
                        $('#tbody').append(rowHtml)
                    })
                    $('#tableComplete').DataTable();
                })
            }
        });
    }
    /*****************************************************************************************************/
    function getRowTempate(id, name, personalID, email, phoneNumber, lat, lng, rolID, creationDate, keystorApproved, active) {
        return `<tr>
                    <td>'${name}'</td>
                    <td>'${personalID}'</td>
                    <td>'${email}'</td>
                    <td>'${phoneNumber}'</td>
                    <td>'${rolID}'</td>
                    <td>'${creationDate}'</td>
                    <td>'${keystorApproved}'</td>
                    <td>'${active}'</td>
                    <td>
                        <ul class="breadcrumb" style="background: none; padding: 0px;">
                            <li class="breadcrumb-item"><a href="#" class="feather icon-edit-2 btnEditRow" title="Edit" data-id="${id}"></a></li>
                            <li class="breadcrumb-item"><a href="#" class="feather icon-trash-2 btnDeleteRow" title="Delete" data-id="${id}" data-name="${name}" data-toggle="modal" data-target="#confirm-delete"></a></li>
                        </ul>
                    </td>
                </tr>`;
    }
    /*****************************************************************************************************/
    function isUserAuthenticated() {
        _dao.loadUserLogin(function (user) {
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

                loadAll();
            } else {
                // No user is signed in.
                _isUserAuthenticated = false;
                printWarningAlert(' To create the document you must be authenticated.');
                document.getElementById("closeModal").click();
                logOut();
                window.location.replace("../auth-signin.html");
            }
            console.log(user);
        });
    }
    /*****************************************************************************************************/
    function invalidInputForm() {
        /*if ($('#active').val() == '') {
            return true;
        }*/
        if ($('#name').val() == '') {
            return true;
        }
        if ($('#lastName').val() == '') {
            return true;
        }
        /*if ($('#secondLastName').val() == '') {
            return true;
        }*/
        if ($('#personalID').val() == '') {
            return true;
        }
        if ($('#password').val() == '') {
            return true;
        }
        if ($('#email').val() == '') {
            return true;
        }
        /*if ($('#phoneNumber').val() == '') {
            return true;
        }
        if ($('#lat').val() == '') {
            return true;
        }
        if ($('#lng').val() == '') {
            return true;
        }*/
        if ($('#rolID').val() == '') {
            return true;
        }
        return false;
    }
    /*****************************************************************************************************/
    function createEmailAccount(obj) {
        _dao.createUserWithEmailAndPassword(obj.email, obj.password).then(result => {
            console.log(result);
            result.user.updateProfile({
                displayName: (obj.name + ' ' + obj.lastName + ' ' + obj.secondLastName)
            })
            result.user.sendEmailVerification().catch(error => {
                console.log(error);
                this.printDangerAlert(error.message);
                return;
            })
            _dao.create(obj).then(result2 => {
                printSuccessAlert('User created successfully.');
                document.getElementById("closeModal").click();
                console.log(`Id of User => ${result2.id}`);
            }).catch(err => {
                printDangerAlert('Error creating User: ' + err.message);
                console.log('Error creating document: ', err.message);
            })
        }).catch(error => {
            console.log(error);
            this.printDangerAlert(error.message);
        });
    }
                
    /*****************************************************************************************************/
    $("#btnConfirmSave").click(() => {
        if (_isUserAuthenticated) {
            if (!invalidInputForm()) {
                var obj = new User();
                obj.name = $('#name').val();
                obj.lastName = $('#lastName').val();
                obj.secondLastName = $('#secondLastName').val();
                obj.personalID = $('#personalID').val();
                obj.password = $('#password').val();
                obj.email = $('#email').val();
                obj.phoneNumber = $('#phoneNumber').val();
                obj.lat = $('#Latitud').val();
                obj.lng = $('#Longitud').val();
                obj.rolID = $('#rolID').val();

               
                 dateObj = new Date();
                 month = dateObj.getMonth()+1;
                 day = String(dateObj.getDate()).padStart(2, '0');
                 year = dateObj.getFullYear();
                 output = day  + '/'+ month  + '/' + year;
                //document.getElementById("creationDate").value = output;

                obj.creationDate = output;
                //obj.creationDate = $('#creationDate').val();
                //obj.keystorApproved = $('#keystorApproved').val();
                //obj.active = $('#active').val();
                createEmailAccount(obj);
                /* _dao.create(obj).then(result2 => {
                    printSuccessAlert('User created successfully.');
                    document.getElementById("closeModal").click();
                    console.log(`Id of User => ${result2.id}`);
                }).catch(err => {
                    printDangerAlert('Error creating User: ' + err.message);
                    console.log('Error creating document: ', err.message);
                }) */
            } else {
                printWarningAlert(' You must complete the required fields.');
                document.getElementById("closeModal").click();
            }
        }
    });
    /*****************************************************************************************************/
    $('#btnOpenModal').click(() => {
        $("#FormId").trigger('reset');
        $("#CreateModalLabel").css("display", "block");
        $("#EditModalLabel").css("display", "none");
        $("#btnConfirmSave").css("display", "block");
        $("#btnConfirmEdit").css("display", "none");
    });
    /*****************************************************************************************************/
    $(document).on("click", ".btnEditRow", function (event) {
        if (_isUserAuthenticated) {
            var id = $(this).data("id");
            if (id) {
                _dao.getById(id).then(result => {
                    var doc = result.data();
                    console.log(doc);

                    $('#btnConfirmEdit').attr('data-id', id);
                    $('#btnConfirmEdit').data("id", id);
                    // console.log($('#btnConfirmEdit').data("id"));
                    // console.log(id);
                    $('#btnOpenModal').click();
                    $('#name').val(doc.name);
                    $('#lastName').val(doc.lastName);
                    $('#secondLastName').val(doc.secondLastName);
                    $('#active').val(doc.active.toString());
                    $('#personalID').val(doc.personalID);
                    $('#password').val(doc.password);
                    $('#email').val(doc.email);
                    $('#phoneNumber').val(doc.phoneNumber);
                    $('#Latitud').val(doc.lat);
                    $('#Longitud').val(doc.lng);
                    $('#rolID').val(doc.rolID);
                    $('#creationDate').val(doc.creationDate);
                    //$('#keystorApproved').val(obj.keystorApproved);

                    //printSuccessAlert('Document retrieved successfully!');
                    $("#CreateModalLabel").css("display", "none");
                    $("#EditModalLabel").css("display", "block");
                    $("#btnConfirmSave").css("display", "none");
                    $("#btnConfirmEdit").css("display", "block");


                }).catch(err => {
                    printDangerAlert('Error retrieving document: ' + err.message);
                    document.getElementById("closeModal").click();
                    console.log('Error retrieving document: ', err.message);
                });
            } else {
                printDangerAlert('Error retrieving document: ID is not defined.');
                document.getElementById("closeModal").click();
            }
        }
    });

    /*****************************************************************************************************/
    $("#btnConfirmEdit").click(() => {
        if (_isUserAuthenticated) {
            var id = $('#btnConfirmEdit').data("id");
            if (id) {

                var obj = new User();
                obj.id = id;
                obj.name = $('#name').val();
                obj.lastName = $('#lastName').val();
                obj.secondLastName = $('#secondLastName').val();
                obj.personalID = $('#personalID').val();
                obj.password = $('#password').val();
                obj.email = $('#email').val();
                obj.phoneNumber = $('#phoneNumber').val();
                obj.lat = $('#Latitud').val();
                obj.lng = $('#Longitud').val();
                obj.rolID = $('#rolID').val();
                //obj.creationDate = $('#creationDate').val();
                //obj.keystorApproved = $('#keystorApproved').val();

                var isTrueSet = ($('#active').val() === 'true');
                obj.active = isTrueSet;
                //obj.active = $('#active').val();

                _dao.update(obj).then(result => {
                    printSuccessAlert('Document updated successfully!');
                    console.log('Document updated successfully!', id);
                }).catch(error => {
                    printDangerAlert('Error updating document: ' + error.message);
                    console.error('Error updating document: ', error);
                });
            } else {
                printDangerAlert('Error updating document: ID is not defined.');
            }
            document.getElementById("closeModal").click();
        }
    });
    /*****************************************************************************************************/
    $(document).on("click", ".btnDeleteRow", function (event) {
        if (_isUserAuthenticated) {
            var id = $(this).data("id");
            var name = $(this).data("name");
            $('#btnConfirmDelete').attr('data-id', id);
            $('.debug-url').html('Delete: <strong><span>' + name + '</span>?</strong>');
        }
    });
    /*****************************************************************************************************/
    $("#btnConfirmDelete").click(() => {
        if (_isUserAuthenticated) {
            var id = $('#btnConfirmDelete').data("id");
            if (id) {
                //_dao.delete(id).then(result => {
                _dao.deactivate(id).then(result => {
                    printSuccessAlert('Document successfully deleted!');
                    console.log('Document successfully deleted! ', result);
                }).catch(error => {
                    printDangerAlert('Error removing document: ' + error.message);
                    console.error('Error removing document: ', error);
                });
            } else {
                printDangerAlert('Error removing document: ID is not defined.');
            };
            document.getElementById("btnCloseDeleteModal").click();
        }
    });
    /*****************************************************************************************************/
});