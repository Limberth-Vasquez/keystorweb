class EventDAO extends DAO {
    constructor() {
        super('Events');
    }

     loadUserLogin(user) {
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
            name: warehouse.name,
            email: warehouse.email,
            phone: warehouse.phone,
            warehouseOwner: warehouse.warehouseOwner,
            timeOpen: warehouse.timeOpen,
            timeClose: warehouse.timeClose,
            capacityPerPallet: warehouse.capacityPerPallet,
            capacityPerSpace: warehouse.capacityPerSpace,
            fees1: warehouse.fees1,
            fees2: warehouse.fees2,
            fees3: warehouse.fees3,
            country: warehouse.country,
            active: true,
            deleted: false,
        });
    }
    update(warehouse) {
        return this.db.collection(this.collection).doc(warehouse.id).set({
            Lat: warehouse.Lat,
            Lng: warehouse.Lng,
            address: warehouse.address,
            description: warehouse.description,
            imageUrl: warehouse.imageUrl,
            name: warehouse.name,
            email: warehouse.email,
            phone: warehouse.phone,
            warehouseOwner: warehouse.warehouseOwner,
            timeOpen: warehouse.timeOpen,
            timeClose: warehouse.timeClose,
            capacityPerPallet: warehouse.capacityPerPallet,
            capacityPerSpace: warehouse.capacityPerSpace,
            fees1: warehouse.fees1,
            fees2: warehouse.fees2,
            fees3: warehouse.fees3,
            country: warehouse.country,
            active: warehouse.active
        });
    }
    deactivate(id){
        return super.deactivate(id);
    }
    delete(id) {
        return super.delete(id);
    }
    getById(id) {
        return super.getById(id);
    }
    getAll() {
        return super.getAll();
    } 
}