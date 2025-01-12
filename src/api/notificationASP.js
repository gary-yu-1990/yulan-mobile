import { get, post, patch, put } from './httpASP'

//获取最新公告
export function getNewNotification(data, config = {}) {
    return post('/NOTIFICATION/GetNewNotification', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

export function getPageDataTable(data, config = {}) {
    return post('/NOTIFICATION/GetPageDataTable', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
