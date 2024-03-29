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
    signOut() {
        return super.signOut();
    }
    create(warehouse) {
        return this.db.collection(this.collection).add({
            //uid: uid,
            Lat: parseFloat(warehouse.Lat),
            Lng: parseFloat(warehouse.Lng),
            address: warehouse.address,
            description: warehouse.description,
            imageUrl: warehouse.imageUrl,
            name: warehouse.name,
            contactEmail: warehouse.contactEmail,
            phone: warehouse.phone,
            warehouseOwner: warehouse.warehouseOwner,
            timeOpen: warehouse.timeOpen,
            timeClose: warehouse.timeClose,
            capacityPerPallet: warehouse.capacityPerPallet,
            capacityPerSpace: warehouse.capacityPerSpace,
            fees1: parseFloat(warehouse.fees1),
            fees2: parseFloat(warehouse.fees2),
            fees3: parseFloat(warehouse.fees3),
            //country: warehouse.country,
            active: true,
            deleted: false,
        });
    }
    update(warehouse) {
        return this.db.collection(this.collection).doc(warehouse.id).set({            
            Lat: parseFloat(warehouse.Lat),
            Lng: parseFloat(warehouse.Lng),
            address: warehouse.address,
            description: warehouse.description,
            imageUrl: warehouse.imageUrl,
            name: warehouse.name,
            contactEmail: warehouse.contactEmail,
            phone: warehouse.phone,
            warehouseOwner: warehouse.warehouseOwner,
            timeOpen: warehouse.timeOpen,
            timeClose: warehouse.timeClose,
            capacityPerPallet: warehouse.capacityPerPallet,
            capacityPerSpace: warehouse.capacityPerSpace,
            fees1: parseFloat(warehouse.fees1),
            fees2: parseFloat(warehouse.fees2),
            fees3: parseFloat(warehouse.fees3),
            //country: warehouse.country,
            active: warehouse.active
        }, { merge: true });
    }
    deactivate(id) {
        return super.deactivate(id);
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