/** Database setup for BizTime. */

const { Client } = require("pg") 
/*"test") {
  DB_URI = "postgresql:///BizTime_test";
} else {
  DB_URI = "postgresql:///BizTime";
}*/

// None of these connoect strings work: 

//DB_URI = "postgresql://karl:Bonfire500@localhost:5432/BizTime"

//DB_URI = "postgresql://karl:Bonfire500@localhost:3100/biztime"
//DB_URI = "postgresql:///biztime";
// per Jonathn

//DB_URI = "postgres:///biztime";
DB_URI = "postgres://karl:Bonfire500@localhost:5432/biztime";

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
