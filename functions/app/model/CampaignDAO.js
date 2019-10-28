const Database = require('../middleware/database/Database');

class CampaignDAO extends Database {

    constructor(){
        super('customers');
        this.query = '';
        this.table = this.database.conn.database();
    }

    selectCampaign(id){
        let ref = 'customers/1/campaings';
        let data = this.table.ref(ref).once('value').then((snapshot) => {
            return snapshot.val();
        });

        return data;
    }


}

module.exports = CampaignDAO;