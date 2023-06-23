const express = require("express");
const user = require("../../controlers/users");
const { authSchema, updateSubscriptionSchema } = require("../../schemas");
const { authenticate, upload } = require("../../middlewares");
const { validateBody } = require("../../decorators");

const router = express.Router();

router.post("/register", validateBody(authSchema), user.signup);

router.post("/login", validateBody(authSchema), user.signin);

router.get("/current", authenticate, user.current);

router.post("/logout", authenticate, user.logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  user.updateSubscritionType
);

router.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  user.updateUserAvatar
);

module.exports = { router };
