const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = ()=> axiosClient.get(('/products?populate=*'))
const getProductById = (id)=> axiosClient.get((`/products?populate=*&[filters][u_id][$eq]=${id}`))
const getProductsByCategory = (category)=> axiosClient.get(`/products?populate=*&[filters][category][$eq]=${category}`)
export default{
    getLatestProducts,
    getProductById,
    getProductsByCategory
}