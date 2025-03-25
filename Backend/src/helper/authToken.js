import { User } from "../models/user.model.js"

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const refreshToken = user.generateRefreshToken()

        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        return resizeBy.status(500).json({
            message: "somthing went erong while generating tokens"
        })
    }
}
