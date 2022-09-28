const config = require("../../config.json")
const axios = require('axios')

module.exports = async id => {
            try {
                const request = await axios.get(`https://discord.com/api/v8/oauth2/authorize?client_id=${id}&scope=bot`, {
                        headers: {
                                Authorization: config.userToken
                            }
                        })

                    return {
                        application: request.data.application,
                        bot: request.data.bot
                    }
                } catch {
                        return false
                    }
                }