import axios from 'axios'
const postname =(path,send)=>{
    return axios.post(path,send)}
const getname =(path)=>{
    return axios.get(path)}
const patchname =(path)=>{
    return axios.patch(path)}
const deletename =(path)=>{
     return axios.delete(path)}
export{postname,getname,patchname,deletename}