const { default: axios } = require("axios")

const Base_URL='http://192.168.1.35:3000/api/geminiapi'
const getGemeni=(userMsg)=>axios.get(Base_URL+"?ques="+userMsg)

export default{
    getGemeni
}