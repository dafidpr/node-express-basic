module.exports = {
    index:function(req, res){
        const data = {
            content: "home/index",
            title: "Home",
        }
       res.render('components/main', data)
    }
}