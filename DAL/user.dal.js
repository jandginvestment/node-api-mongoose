var mongoose = require('mongoose');
var userModel = require('../Model/user');


class user{
    constructor(){
    }

    getAll(fun){
    var persons=userModel.find({},(error,result)=>{
       fun(error,result);
        });
    }

    add(param, fun) {
        console.log('param')
        console.log(param);

     var us = new userModel({
        name:param.name,
        passWord:param.passWord,
        admin:true
        
    });

        var result = us.save((error,result)=>{
            console.log('errror');
            console.log(error);
            console.log('result');
            console.log(result);
            fun(error,result);
        })
    }

}
module.exports  =user;