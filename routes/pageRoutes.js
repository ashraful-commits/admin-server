import express from "express"
import { deleteUser,me, getAllUser, updateUser, userLogin, userRegistration, updateUserStatus, getSingleUser, userLogout } from "../controllers/pageControllers.js"
import { tokenVerify } from "../middlewares/TokenVerify.js"


const router = express.Router()
router.route("/me").get(tokenVerify,me)
router.route("/login").post(userLogin)
router.route("/").post(userRegistration).get(getAllUser)
router.route("/logout").post(userLogout)
router.route("/").get(getAllUser)
router.route("/:id").put(updateUser).delete(deleteUser).patch(updateUserStatus).get(getSingleUser)


export default router