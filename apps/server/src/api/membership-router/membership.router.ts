import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth.middleware.js";
import MembershipController from "../../controllers/memberships/memberships.controller.js";

const MembershipRouter =  Router();

const membershipInstance = new MembershipController();

MembershipRouter.get('/fetch-membership-plans', membershipInstance.fetchMembershipPlans);


MembershipRouter.use(authMiddleware);
MembershipRouter.get('/fetch-user-membership', membershipInstance.fetchUserMembership);
MembershipRouter.post('/subscribe-to-membership', membershipInstance.subscribeToMembership);
MembershipRouter.post('/cancel-membership', membershipInstance.cancelMembership);
MembershipRouter.post('/create-membership-order', membershipInstance.createMembershipOrder);
MembershipRouter.post('/verify-membership-order', membershipInstance.verifyMembershipOrder);
MembershipRouter.post('/is-already-subscribed', membershipInstance.isAlreadySubscribed);

export default MembershipRouter;