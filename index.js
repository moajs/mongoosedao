function CommonDao (Model){
    /*if(typeof Model === 'undefined' || Model == null)
        throw new Error('Model can not be null.');
*/
    this.model = Model;
}

CommonDao.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
CommonDao.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};
 
CommonDao.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};

CommonDao.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};
 

CommonDao.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);
 
        return callback(null, model);
    });
};
/*
CommonDao.prototype.getAllModelByOption = function (opt, callback) {
    CommonDao.getModelByQuery({},{},opt, callback);
};*/
 

CommonDao.prototype.delete = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
CommonDao.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
module.exports = CommonDao;