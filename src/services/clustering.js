import instance from './instance';

export function getTree (id) {
    return instance.get(`/title/menus/${id}`)
}
export function getFirstLevelDetail (id) {
    return instance.get(`/docs/secondaryMenu/${id}`)
}
export function getSecondLevelDetail (id) {
    return instance.get(`/docs/findDocumentByTwoId/${id}`)
}
export function adjustFirstLevelCluster (id, number) {
    return instance.get(`/docs/dynamicAdjustCluster/${id}/${number}`)
}
export function getDocumentDetail (id) {
    return instance.get(`/docs/findDocumentDetail/${id}`)
}
export function getStatistics(id) {
    return instance.get(`/admin/statistics/${id}`)
}
export function adminChartDisplay(i) {
    return instance.get(`/admin/chartDisplay/${i}`)
}
export function findComment(id) {
    return instance.get(`/docs/findComment/${id}`)
}
export function insertComment(id,comment) {
    return instance.post(`/docs/insertComment/${id}/${comment}`)
}
export function findAllContents(id,comment) {
    return instance.get(`/docs/findAllContents/${id}`)
}
export function findRemarkedDocs() {
    return instance.get(`/docs/findRemarkedDocument`)
}
export function delComment(id) {
    return instance.get(`/docs/delComment/${id}`)
}
export function findKeyWords(id) {
    return instance.get(`/title/categoryOne/${id}`)
}
export function updateCategory(id,twoId) {
    return instance.post(`/docs/updateCategory/${id}/${twoId}`)
}
export function updateTitleName(id,name) {
    return instance.post(`/title/updateTitleName/${id}/${name}`)
}
export function moveMulti(arr) {
    return instance.post(`/docs/moveMulti/${arr}`)
}
export function findComments(arr) {
    return instance.get(`/comment/findComments/${arr}`)
}
export function displayCategory2(id) {
    return instance.get(`/title/categoryOne2/${id}`)
}