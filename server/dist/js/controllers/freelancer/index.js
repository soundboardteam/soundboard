"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freelancer_1 = __importDefault(require("../../models/freelancer"));
const getFreelancers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_1.default.find();
        res.status(200).json({ freelancer });
    }
    catch (error) {
        throw error;
    }
});
// const getFreelancer = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {
//             params: { phoneNumber },
//             body,
//         } = req
//         const reqPhoneNumber = req.params.phoneNumber
//         console.log('REQ PHONE', reqPhoneNumber)
//         const profile = await Profile.find({ phoneNumber: reqPhoneNumber })
//         console.log('CHECK THIS', profile)
//         res.status(200).json({ profile })
//         console.log(req.headers)
//     } catch (error) {
//         console.log('CHECK ERROR')
//         res.status(500).json({ error: 'Cannot find profile' })
//     }
// }
// const addFreelancer = async (req: Request, res: Response): Promise<void> => {
//     console.log('REQUEST BODY', req.body)
//     try {
//         const body = req.body as Pick<
//             IFreelancer,
//             'profileId' | 'ratings' | 'bio' | 'jobs' | 'previousClients'
//         >
//         const freelancer: IFreelancer = new Freelancer({
//             profileId: body.displayName,
//             fullName: body.fullName,
//             phoneNumber: body.phoneNumber,
//             email: body.email,
//             userRoles: body.userRoles,
//             verifiedAccount: body.verifiedAccount,
//             linkedAccounts: body.linkedAccounts,
//         })
//         const newFreelancer: IFreelancer = await freelancer.save()
//         const allFreelancers: IFreelancer[] = await Freelancer.find()
//         res.status(201).json({
//             message: 'Freelancer added',
//             freelancer: newFreelancer,
//             freelancers: allFreelancers,
//         })
//     } catch (error) {
//         throw error
//     }
// }
// export { getProfiles, addProfile, getProfile }
