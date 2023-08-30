import express from "express"
import { deleteUser,me, getAllUser, updateUser, userLogin, userRegistration, updateUserStatus } from "../controllers/pageControllers.js"
import { tokenVerify } from "../middlewares/TokenVerify.js"


const router = express.Router()
router.route("/login").post(userLogin)
router.route("/").post(userRegistration).get(getAllUser)

router.route("/").get(getAllUser)
router.route("/me").get(tokenVerify,me)
router.route("/:id").put(updateUser).delete(deleteUser).patch(updateUserStatus)


export default router