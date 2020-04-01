class UserDAO extends DAO {
    constructor() {
        super('userClients');
        //super('Users');
    }

    loadUserLogin(user) {
        return super.loadUserLogin(user);
    }
    signOut() {
        return super.signOut();
    }
    create(obj) {
        return this.db.collection(this.collection).add({              
            //id: obj,
            name: obj.name,
            lastName: obj.lastName,
            secondLastName: obj.secondLastName,
            personalID: obj.personalID,
            password: obj.password,
            email: obj.email,
            phone: obj.phone,
            lat: obj.lat,
            lng: obj.lng,
            rolID: obj.rolID,
            active: true,
            deleted: false
        });
    }
    update(obj) {
        return this.db.collection(this.collection).doc(obj.id).set({
            active: obj.active,            
            name: obj.name,
            lastName: obj.lastName,
            secondLastName: obj.secondLastName,
            personalID: obj.personalID,
            password: obj.password,
            email: obj.email,
            phone: obj.phone,
            lat: obj.lat,
            lng: obj.lng,
            rolID: obj.rolID
        }, { merge: true });
    }
    deactivate(id) {
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