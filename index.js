
function MongooseDao (Model){
    /*if(typeof Model === 'undefined' || Model == null)
        throw new Error('Model can not be null.');
*/
    this.model = Model;
}

MongooseDao.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
MongooseDao.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};
 
MongooseDao.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};

MongooseDao.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};
 

MongooseDao.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);
 
        return callback(null, model);
    });
};
/*
MongooseDao.prototype.getAllModelByOption = function (opt, callback) {
    MongooseDao.getModelByQuery({},{},opt, callback);
};*/
 

MongooseDao.prototype.delete = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
MongooseDao.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
module.exports = MongooseDao;