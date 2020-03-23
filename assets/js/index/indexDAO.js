class IndexDAO extends DAO{
    constructor() {
        super('Index');
    }
    signOut(){
        return super.signOut();
    } 
    loadUserLogin(user) {
        return super.loadUserLogin(user);
    }    
}
