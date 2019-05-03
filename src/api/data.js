import axios from '@/libs/api.request'

export const getSellerData = () => {
    return axios.request({
        url: 'seller',
        method: 'get'
    })
}