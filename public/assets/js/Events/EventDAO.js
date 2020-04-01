class EventDAO extends DAO {
    constructor() {
        super('Events');
    }

     loadUserLogin(user) {
        return super.loadUserLogin(user);
    }
    signOut(){
        return super.signOut();
    } 
    create(obj) {
        return this.db.collection(this.collection).add({
            //uid: uid,
            Lat: obj.Lat,
            Lng: obj.Lng,
            address: obj.address,
            description: obj.description,
            imageUrl: obj.imageUrl,
            name: obj.name,
            email: obj.email,
            phone: obj.phone,
            //objOwner: obj.objOwner,
            fees1: obj.fees1,
            fees2: obj.fees2,
            fees3: obj.fees3,
            active: true,
            deleted: false,
        });
    }
    update(obj) {
        return this.db.collection(this.collection).doc(obj.id).set({
            Lat: obj.Lat,
            Lng: obj.Lng,
            address: obj.address,
            description: obj.description,
            imageUrl: obj.imageUrl,
            name: obj.name,
            email: obj.email,
            phone: obj.phone,
            //objOwner: obj.objOwner,
            fees1: obj.fees1,
            fees2: obj.fees2,
            fees3: obj.fees3,
            active: obj.active
        }, { merge: true });
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