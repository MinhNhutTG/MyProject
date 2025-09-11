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

    req.flash("Thêm quyền thành công!")

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
    req.flash("Cập nhật quyền thành công!")
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

module.exports.delete = async (req,res)=>{
  
    const id = req.params.id;
    await Role.updateOne({_id:id},{
        deleted: true,
        deleteAt: new Date().toLocaleString()});
    req.flash("Xóa quyền thành công!")
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


module.exports.permission =  async (req,res)=>{
 
    let find = {
        deleted:false,
    }
    const record = await Role.find(find);
    res.render("./admin/pages/roles/permission.pug",{
        record:record
    })
}

module.exports.permissionPatch = async (req,res)=>{

    const permission = JSON.parse(req.body.permission)
    
    for (const item of permission){
        await Role.updateOne({_id:item.id},{permission: item.permission})
    }

    req.flash("Cập nhật phân quyền thành công!");

    res.redirect(`${systemConfig.prefixAdmin}/roles`)

}