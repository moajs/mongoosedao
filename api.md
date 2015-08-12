# API

## create

    Meeting.create({"username":"sss","password":"password"},function(err, user){
      
    });

## delete

    Meeting.delete({"username":"fixture-user"},function(err){

    });


## deleteAll

    Meeting.deleteAll(function(err){

    });

## getById

    Meeting.getById(user._id, function(err, new_user){

    });
    
## getAll = all

    Meeting.getAll(function(err, users){
      
    });
    
    
equal
    
    Meeting.all(function(err, users){
      
    });
    
equal

    Meeting.query({}, function(err, users){
      
    });

## one = findOne

    Meeting.one({"username":"sss","password":"password"},function(err, user){
      if(err){
        console.dir(err);
      }
    });
## query = getByQuery

    Meeting.query({}, function(err, users){
      if(err){
        console.dir(err);
      }
      
      // console.dir(users);
      assert.equal(users.length > 0, true);
      done();
    });
## all = getAll = find({})

    Meeting.all(function(err, users){
      if(err){
        console.dir(err);
      }
      
      // console.dir(users);
      assert.equal(users.length > 0, true);
      done();
    });

## updateById

      Meeting.updateById(new_user._id, {
        username: 'updated_user'
      }, function(err, result){
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
      
        done();
      });

## updateOne

      Meeting.updateOne({_id:new_user._id}, {
        username: 'updated_user'
      }, function(err, result){
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
      
        done();
      });


## update

way 1: 3 params

      Meeting.update({'_id': new_user._id}, {
        username: 'updated_user2'
      }, function(err2, result){
        console.dir(err2)
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
        
        done();
      });
      
way 2: 4 params

      Meeting.update({'_id': new_user._id}, {
        username: 'updated_user3'
      }, {multi: false}, function(err2, result){
        console.dir(err2)
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
        
        done();
      });
      
## pagination

### latest = top = first = n

获取指定前20条数

      Top.top(function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 20, true);
        done();
      });
      
获取指定前xx条数
  
      Top.top(30 ,function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 30, true);
        done();
      });
      
根据查询条件获取指定前xx条数
  
      Top.top(30, {}, function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 30, true);
        done();
      });
      
更改pagesize

      Top.pagesize = 25;
      Top.top(function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 25, true);
        done();
      });
      
### pageByLastId

根据id直接返回，长度看Top.pagesize 

    Top.pageByLastId(one._id, function(err, new_tops){
      
根据id直接返回，长度看第二个参数，下面的例子是50

    Top.pageByLastId(one._id, 50, function(err, new_tops){

根据id直接返回，长度看第二个参数，下面的例子是50，不带带有排序条件

    Top.pageByLastId(one._id, 100, {"username" : "fixture-user-41"}, function(err, new_tops){
      
根据id直接返回，长度看第二个参数，下面的例子是50，带有排序条件，created_at是升序

    Top.pageByLastId(one._id, 100, {"username" : "fixture-user-41"}, {created_at:'asc'}, function(err, new_tops){

## count

查询全部总数

    User.count(cb)

按条件查询总数

    User.count({},cb)