
module.exports = (objectPagination , query)=>{
    if (query.page > 0){
        objectPagination.currentIndex = query.page;
    }
    objectPagination.totalPage = Math.ceil( objectPagination.totalProduct  / objectPagination.litmitProduct );
    objectPagination.skip = (objectPagination.currentIndex - 1) * objectPagination.litmitProduct;

    return objectPagination;
}