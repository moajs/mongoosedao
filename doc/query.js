exports.list = function (req, res, next) {
  var user_id = req.session.current_user._id;
  console.log(user_id);
  
  console.log(req.method + ' /products => list, query: ' + JSON.stringify(req.query));
  
  Product.query({user_id: user_id},function(err, products){
    console.log(products);
    res.render('products/index', {
      products : products
    })
  });
};