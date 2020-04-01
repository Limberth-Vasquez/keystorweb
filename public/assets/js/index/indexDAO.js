class IndexDAO extends DAO {
    constructor() {
        super('Index');
    }
    signOut() {
        return super.signOut();
    }
    loadUserLogin(user) {
        return super.loadUserLogin(user);
    }
    getCountWarehouses() {
        return this.db.collection('Warehouses').where("deleted", "==", false);
    }
    getClients() {
        return this.db.collection('userClients').where("deleted", "==", false);//.where("keystorApproved", "==", false);
    }
    getRequests() {
        return this.db.collection('requests');//.where("deleted", "==", false);
    }
    getCountOwners() {
        return this.db.collection('Owners').where("deleted", "==", false);
    }
    getClientById(id){
        return this.db.collection('userClients').doc(id).get();
    }
    getOwnerById(id){
        return this.db.collection('Owners').doc(id).get();
    }
    getWarehouseById(id){
        return this.db.collection('Warehouses').doc(id).get();
    }
    rejectRequest(id){
        return this.db.collection('requests').doc(id).set({
            status: 0
        }, { merge: true });
    }
    approveRequest(id){
        return this.db.collection('requests').doc(id).set({
            status: 1
        }, { merge: true });
    }
    rejectClient(id){
        return this.db.collection('userClients').doc(id).set({
            active: false,
            keystorApproved: false
        }, { merge: true });
    }
    approveClient(id){
        return this.db.collection('userClients').doc(id).set({
            active: true,
            keystorApproved: true
        }, { merge: true });
    }
}
