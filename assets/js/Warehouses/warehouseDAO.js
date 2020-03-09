class WarehouseDAO extends DAO {
    constructor() {
        super('Warehouses');
        // this.auth = firebase.auth();
        // this.db = firebase.firestore();
        // this.collection = 'Warehouses';
    }

     loadUserLogin(user) {
        //return this.auth.onAuthStateChanged(user);
        return super.loadUserLogin(user);
    }
    signOut(){
        super.signOut();
    } 
    create(warehouse) {
        return this.db.collection(this.collection).add({
            //uid: uid,
            Lat: warehouse.Lat,
            Lng: warehouse.Lng,
            address: warehouse.address,
            description: warehouse.description,
            imageUrl: warehouse.imageUrl,
            name: warehouse.name
        });
    }
    delete(id) {
        //return this.db.collection(this.collection).doc(id).delete();
        return super.delete(id);
    }
    getById(id) {
        //return this.db.collection(this.collection).doc(id).get();
        return super.getById(id);
    }
    getAll() {
        //return this.db.collection(this.collection);
        return super.getAll();
    } 
}