import instance from './instance';

export function getTree () {
    return instance.get(`/title/menus`)
}
export function getFirstLevelDetail (id) {
    return instance.get(`/docs/secondaryMenu/${id}`)
}
export function getSecondLevelDetail (id) {
    return instance.get(`/docs/findDocumentByTwoId/${id}`)
}
export function adjustFirstLevelCluster (id, number) {
    return instance.get(`/docs/findDocumentByTwoId/${id}/${number}`)
}
export function getDocumentDetail (id) {
    return instance.get(`/docs/findDocumentDetail/${id}`)
}

