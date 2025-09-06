const Role = require("../../models/role.model")
const systemConfig = require("../../config/systemconfig")
module.exports.index = async (req,res)=>{
    let find = {
        deleted:false
    }
    const record = await Role.find(find);
    res.render("./admin/pages/roles/roles.pug",{
        record:record
    });
}

module.exports.create = (req,res)=>{
    res.render("./admin/pages/roles/create.pug")
}

module.exports.createPost = async (req,res)=>{
    console.log(req.body)
    
    const role = new Role(req.body);

    await role.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

module.exports.edit = async (req,res)=>{
    const id = req.params.id ;
    
    const role = await Role.findOne({_id:id},{deleted:false})

    res.render("./admin/pages/roles/edit.pug",{
        role:role
    })
}

module.exports.editPost = async (req,res)=>{
    const id = req.params.id
    await Role.updateOne({_id:id},req.body)
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

module.exports.delete = async (req,res)=>{
  
    const id = req.params.id;
    await Role.updateOne({_id:id},{
        deleted: true,
        deleteAt: new Date().toLocaleString()});
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
