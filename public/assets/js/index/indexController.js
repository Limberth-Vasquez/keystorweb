$(() => {
    //START
    const _index = new IndexDAO();
    var _isUserAuthenticated = false;
    var _isEditing = false;
    isUserAuthenticated();
    //START
    /*****************************************************************************************************/
    $(document).on("click", ".btnLogout", function (event) {
        logOut();
    });

    function logOut() {
        _index.signOut().then(() => {
            window.location.replace("../index.html");
        });
        //window.location.replace("auth-signin.html");
    }
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
                getCountWarehouses();
                getCountClients();
                getCountOwners();
                getRecentClients();
                getRecentRequests();
            } else {
                // No user is signed in.
                _isUserAuthenticated = false;
                printWarningAlert(' Error you must be authenticated.');
                //document.getElementById("closeModal").click();

                logOut();
                window.location.replace("../auth-signin.html");
            }
            console.log(user);
        });
    }
    /*****************************************************************************************************/
    function getCountWarehouses() {
        _index.getCountWarehouses().onSnapshot(querySnapshot => {
            document.getElementById("warehousesCount").innerHTML = querySnapshot.size;
        });
    }
    /*****************************************************************************************************/
    function getCountClients() {
        _index.getClients().onSnapshot(querySnapshot => {
            document.getElementById("clientsCount").innerHTML = querySnapshot.size;
        });
    }
    /*****************************************************************************************************/
    function getCountOwners() {
        _index.getCountOwners().onSnapshot(querySnapshot => {
            document.getElementById("ownerCount").innerHTML = querySnapshot.size;
        });
    }
    /*****************************************************************************************************/
    function getRecentClients() {
        _index.getClients().onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(result => {
                    $('#recentClients').empty();
                    querySnapshot.forEach(row => {
                        let rowHtml = getRecentClientsTemplate(
                            row.id,
                            row.data().name,
                            row.data().lastName,
                            row.data().email,
                            row.data().phoneNumber,
                            row.data().creationDate,
                            row.data().keystorApproved
                        );
                        $('#recentClients').append(rowHtml)
                    });
                });
            }
        });
    }
    /*****************************************************************************************************/
    function getClienteRequestById(row) {
        _index.getClientById(row.data().userId).then(resultClient => {
            if (resultClient.exists) {
                var doc = resultClient.data();
                var clientName = doc.name + ' ' + doc.lastName;
                var clientEmail = doc.email;
                var clientPhone = doc.phoneNumber;

                getWarehouseRequestById(row, clientName, clientEmail, clientPhone);
            }
        }).catch(err => {
            console.log('Error retrieving cliente: ', err.message);
        });
    }
    /*****************************************************************************************************/
    function getWarehouseRequestById(row, clientName, clientEmail, clientPhone) {
        _index.getWarehouseById(row.data().warehouseId).then(resultWH => {
            if (resultWH.exists) {
                var doc = resultWH.data();
                var WarehouseName2 = doc.name;
                var WarehouseEmail = doc.contactEmail;
                var WarehousePhone = doc.phone;

                let rowHtml = getRecentRequestsTemplate(
                    row.id,
                    row.data().endDate,
                    row.data().startDate,
                    row.data().status,
                    clientName,//row.data().userId,
                    clientEmail,
                    clientPhone,
                    row.data().warehouseId,
                    row.data().warehouseName,
                    WarehouseName2,
                    WarehouseEmail,
                    WarehousePhone
                );
                $('#recentRequests').append(rowHtml)
            }
        }).catch(err => {
            console.log('Error retrieving warehouse: ', err.message);
        });
    }
    /*****************************************************************************************************/
    function getRecentRequests() {

        _index.getRequests().onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                $('#recentRequests').empty();
                querySnapshot.forEach(row => {
                    //console.log(querySnapshot.size);
                    getClienteRequestById(row)
                });
            }
        });
    }
    /*****************************************************************************************************/
    function getRecentRequestsTemplate(id, endDate, startDate, status, clientName, clientEmail, clientPhone, warehouseId, warehouseName, WarehouseName2, WarehouseEmail, WarehousePhone) {


        return `<tr class="unread">
                    <td><img class="rounded-circle" style="width:40px;"
                            src="../assets/images/user/avatar-2.jpg"
                            alt="activity-user"></td>
                    <td>
                        <h6 class="mb-1">${clientName}</h6>
                        <p class="m-0"><i class="feather icon-mail"></i></span> ${clientEmail}</p>
                        <p class="m-0"><i class="feather icon-phone"></i></span>  ${clientPhone}</p>
                    </td>
                    <td>
                        <h6 class="text-muted"><i class="fas fa-calendar  "></i>
                        ${'From: ' + startDate + ' To: ' + endDate}
                        </h6>
                        
                        ${
            status == 1 ? `<h6 class="text-muted"><i class="fas fa-check text-c-green "></i> APPROVED</h6>` :
                status == 0 ? `<h6 class="text-muted"><i class="fas fa-times text-c-red "></i> REJECTED</h6>` :
                    `<h6 class="text-muted"><i class="fas fa-hourglass-end text-c-yellow "></i> PENDING</h6>`
            }
                        
                    </td>
                    <td>
                        <h6 class="mb-1">${WarehouseName2}</h6>
                        <p class="m-0"><i class="feather icon-mail"></i></span> ${WarehouseEmail}</p>
                        <p class="m-0"><i class="feather icon-phone"></i></span>  ${WarehousePhone}</p>
                    </td>
                    <td>
                        ${
            status != 1 && status != 0 ? `
                                <a href="#!" class="label theme-bg2 text-white f-12 rejectRequestBtn" data-id="${id}">Reject</a>
                                <a href="#!" class="label theme-bg text-white f-12 approveRequestBtn" data-id="${id}">Approve</a>
                            `: ``
            }
                    </td>
                </tr>`;
    }
    /*****************************************************************************************************/
    function getRecentClientsTemplate(id, name, lastName, email, phoneNumber, creationDate, keystorApproved) {
        return `<tr class="unread">
                    <td><img class="rounded-circle" style="width:40px;"
                            src="../assets/images/user/avatar-2.jpg"
                            alt="activity-user"></td>
                    <td>
                        <h6 class="mb-1">${name + ' ' + lastName}</h6>
                        <p class="m-0"><i class="feather icon-mail"></i></span> ${email}</p>
                        <p class="m-0"><i class="feather icon-phone"></i></span>  ${phoneNumber}</p>
                    </td>
                    <td>
                        <h6 class="text-muted"><i class="fas fa-circle text-c-green f-10 m-r-15"></i>
                            ${creationDate}                            
                        </h6>                        
                        ${
            keystorApproved == true ? `<h6 class="text-muted"><i class="fas fa-check text-c-green "></i> APPROVED</h6>` :
                keystorApproved == false ? `<h6 class="text-muted"><i class="fas fa-times text-c-red "></i> REJECTED</h6>` :
                    `<h6 class="text-muted"><i class="fas fa-hourglass-end text-c-yellow "></i> PENDING</h6>`
            }
                    </td>
                    <td>
                        <a href="#!" class="label theme-bg2 text-white f-12 rejectClientBtn" data-id="${id}">Reject</a>
                        <a href="#!" class="label theme-bg text-white f-12 approveClientBtn" data-id="${id}">Approve</a>
                    </td>
                </tr>`;
    }
    /*****************************************************************************************************/
    //${(creationDate.toDate()).toDateString()}


    /*****************************************************************************************************/
    $(document).on("click", ".rejectRequestBtn", function (event) {
        var id = $(this).data("id");
        //alert('rejectRequestBtn ' + id);
        _index.rejectRequest(id).then(result => {
            //printSuccessAlert('Document updated successfully!');
            console.log('rejectRequestBtn updated successfully!', id);
        }).catch(error => {
            //printDangerAlert('Error updating document: ' + error.message);
            console.error('Error updating rejectRequestBtn: ', error);
        });
    });
    /*****************************************************************************************************/
    $(document).on("click", ".approveRequestBtn", function (event) {
        var id = $(this).data("id");
        //alert('approveRequestBtn ' + id);
        _index.approveRequest(id).then(result => {
            //printSuccessAlert('Document updated successfully!');
            console.log('approveRequestBtn updated successfully!', id);
        }).catch(error => {
            //printDangerAlert('Error updating document: ' + error.message);
            console.error('Error updating approveRequestBtn: ', error);
        });
    });
    /*****************************************************************************************************/
    $(document).on("click", ".rejectClientBtn", function (event) {
        var id = $(this).data("id");
        _index.rejectClient(id).then(result => {
            console.log('rejectClientBtn updated successfully!', id);
        }).catch(error => {
            console.error('Error updating rejectClientBtn: ', error);
        });
    });
    /*****************************************************************************************************/
    $(document).on("click", ".approveClientBtn", function (event) {
        var id = $(this).data("id");
        _index.approveClient(id).then(result => {
            console.log('approveClientBtn updated successfully!', id);
        }).catch(error => {
            console.error('Error updating approveClientBtn: ', error);
        });
    });
    /*****************************************************************************************************/
});