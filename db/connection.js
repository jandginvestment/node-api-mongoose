var mysql = require('mysql');

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'too',
    multipleStatements:true,
    testt:this
});

var self =module.exports ={
    connect: function connect(){

    },
    executeSelect:function executeSelect(sql,cb){
   console.log('connection established'); 
   conn.query(sql,(error,rows)=>{
            if(error) {cb(error,null);
                return
            }
            cb(error,rows[0])
        })
    },

    executeDML:function add(sql,param,cb){
        conn.query(sql,param,(error,result)=>{
            if(error) {
                 cb(error,null);
                 return;
            };
            cb(error,result)
        })
    }
}