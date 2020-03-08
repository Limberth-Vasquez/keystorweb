class Warehouse {
    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.firestore();

        this.loadUserLogin();
    }

    loadUserLogin() {
        this.auth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log(user);
                if(user.photoURL){
                    document.getElementById("userLoginName").innerHTML = user.photoURL + ' ' +   user.displayName;
                }else{
                    document.getElementById("userLoginName").innerHTML = '<img src="../assets/images/ic_launcher-web.png" class="circle mr-3 image-responsive" width="55px" height="55px" > ' +  user.displayName;
                }
            } else {
                // No user is signed in.
                console.log(user);
                this.auth.signOut();
                window.location.replace("index.html");
            }
        });
    }
    printSuccessAlert(msg) {
        document.getElementById("successAlert").innerHTML = (successAlert + msg);
        document.getElementById("successAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("successAlert").style.display = 'none';
        }, 4000);
    }
    printDangerAlert(msg) {
        document.getElementById("dangerAlert").innerHTML = (dangerAlert + msg);
        document.getElementById("dangerAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("dangerAlert").style.display = 'none';
        }, 4000);
    }
    printWarningAlert(msg) {
        document.getElementById("warningAlert").innerHTML = (warningAlert + msg);
        document.getElementById("warningAlert").style.display = 'block';
        setTimeout(function () {
            document.getElementById("warningAlert").style.display = 'none';
        }, 4000);
    }

    create(name, description, Latitud, Longitud, Address, imgUrl) {
        return this.db.collection('Warehouses').add({
            //uid: uid,
            Lat: Latitud,
            Lng: Longitud,
            address: Address,
            description: description,
            imageUrl: imgUrl,
            name: name
        }).then(refDoc => {
            console.log(`Id del post => ${refDoc.id}`)
        }).catch(error => {
            console.error(`Error creando el post => ${error}`)
        })
    }

    getAll(){
        this.db.collection('Warehouses').onSnapshot(querySnapshot => {
           //console.log(querySnapshot);
            querySnapshot.forEach(warehouse => {
                //console.log(warehouse);
                //console.log(warehouse.data());
                $('#Warehouses').empty();
                if(querySnapshot.empty){                    
                    //$('#Warehouses').append(this.obtenerTemplatePostVacio())
                }else{                    
                    querySnapshot.forEach(row => {
                      let rowHtml = this.getWarehouseTempate(
                          row.id,
                          row.data().name,
                          row.data().Lat,
                          row.data().Lng,
                          row.data().address,
                          row.data().imageUrl,
                          row.data().description
                      );
                      $('#Warehouses').append(rowHtml)
                })
            }
            })
        })
    }
    
    getWarehouseTempate(id,name, latitude,longitude,address, imageUrl,descripcion){
        return `<tr>
                    <td>'${name}'</td>
                    <td>'${latitude}'</td>
                    <td>'${longitude}'</td>
                    <td>'${address}'</td>
                    <!--<td>'${imageUrl}'</td>-->
                    <td>'${descripcion}'</td>
                    <td>
                        <ul class="breadcrumb" style="background: none;">
                            <li class="breadcrumb-item"><a href="#" class="feather icon-edit-2 editRow" title="Edit" data-id="${id}"></a></li>
                            <li class="breadcrumb-item"><a href="#" class="feather icon-trash-2 DeleteRow" title="Delete" data-id="${id}"></a></li>
                        </ul>
                    </td>
                </tr>`;
    }
    consultarTodosPost() {
        this.db.collection('Warehouses').onSnapshot(querySnapshot => {
            console.log(querySnapshot);
            $('#Warehouses').empty()
            if (querySnapshot.empty) {
                $('#Warehouses').append(this.obtenerTemplatePostVacio())
            } else {
                querySnapshot.forEach(post => {
                    let postHtml = this.obtenerPostTemplate(
                        post.data().autor,
                        post.data().titulo,
                        post.data().descripcion,
                        post.data().videoLink,
                        post.data().imagenLink,
                        Utilidad.obtenerFecha(post.data().fecha.toDate())
                    )
                    $('#Warehouses').append(postHtml)
                })
            }
        })
    }

    consultarPostxUsuario(emailUser) {
        this.db
            .collection('Warehouses')
            .where('autor', '==', emailUser)
            .onSnapshot(querySnapshot => {
                $('#Warehouses').empty()
                if (querySnapshot.empty) {
                    $('#Warehouses').append(this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        let postHtml = this.obtenerPostTemplate(
                            post.data().autor,
                            post.data().titulo,
                            post.data().descripcion,
                            post.data().videoLink,
                            post.data().imagenLink,
                            Utilidad.obtenerFecha(post.data().fecha.toDate())
                        )
                        $('#Warehouses').append(postHtml)
                    })
                }
            })
    }

    subirImagenPost(file, uid) { }

    obtenerTemplatePostVacio() {
        return `<article class="post">
        <div class="post-titulo">
            <h5>Crea el primer Post a la comunidad</h5>
        </div>
        <div class="post-calificacion">
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-vacia" href="*"></a>
        </div>
        <div class="post-video">
            <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
                frameborder="0"></iframe>
            </figure>
        </div>
        <div class="post-videolink">
            Video
        </div>
        <div class="post-descripcion">
            <p>Crea el primer Post a la comunidad</p>
        </div>
        <div class="post-footer container">         
        </div>
    </article>`
    }

    obtenerPostTemplate(
        autor,
        titulo,
        descripcion,
        videoLink,
        imagenLink,
        fecha
    ) {
        if (imagenLink) {
            return `<article class="post">
              <div class="post-titulo">
                  <h5>${titulo}</h5>
              </div>
              <div class="post-calificacion">
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-vacia" href="*"></a>
              </div>
              <div class="post-video">                
                  <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                      alt="Imagen Video">     
              </div>
              <div class="post-videolink">
                  <a href="${videoLink}" target="blank">Ver Video</a>                            
              </div>
              <div class="post-descripcion">
                  <p>${descripcion}</p>
              </div>
              <div class="post-footer container">
                  <div class="row">
                      <div class="col m6">
                          Fecha: ${fecha}
                      </div>
                      <div class="col m6">
                          Autor: ${autor}
                      </div>        
                  </div>
              </div>
          </article>`
        }

        return `<article class="post">
                  <div class="post-titulo">
                      <h5>${titulo}</h5>
                  </div>
                  <div class="post-calificacion">
                      <a class="post-estrellita-llena" href="*"></a>
                      <a class="post-estrellita-llena" href="*"></a>
                      <a class="post-estrellita-llena" href="*"></a>
                      <a class="post-estrellita-llena" href="*"></a>
                      <a class="post-estrellita-vacia" href="*"></a>
                  </div>
                  <div class="post-video">
                      <iframe type="text/html" width="500" height="385" src='${videoLink}'
                          frameborder="0"></iframe>
                      </figure>
                  </div>
                  <div class="post-videolink">
                      Video
                  </div>
                  <div class="post-descripcion">
                      <p>${descripcion}</p>
                  </div>
                  <div class="post-footer container">
                      <div class="row">
                          <div class="col m6">
                              Fecha: ${fecha}
                          </div>
                          <div class="col m6">
                              Autor: ${autor}
                          </div>        
                      </div>
                  </div>
              </article>`
    }
}