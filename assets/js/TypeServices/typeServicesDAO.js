class TypesServicesDAO extends DAO {
    constructor() {
        super('TypeServices');
    }

     loadUserLogin(user) {
        return super.loadUserLogin(user);
    }
    signOut(){
        super.signOut();
    } 
    create(obj) {
        return this.db.collection(this.collection).add({
            active: true,
            deleted: false,
            name: obj.name
        });
    }
    update(obj) {
        return this.db.collection(this.collection).doc(obj.id).set({
            active: obj.active,
            name: obj.name
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