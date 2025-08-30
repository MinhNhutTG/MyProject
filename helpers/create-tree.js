 function CreateTree(records, parent_id = "") {
        const tree = []; // ✅ tạo mảng cục bộ cho mỗi lần gọi
        records.forEach((item) => {
            if (String(item.parent_id) === String(parent_id)) {
                const newItem = { ...item._doc }; // ✅ copy object tránh reference
                const children = CreateTree(records, item._id); // ✅ truyền đúng records
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
}

module.exports.tree = (records,parent_id = "")=>{
    const tree = CreateTree(records,parent_id="");
    return tree;
}