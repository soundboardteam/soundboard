profile:
{
    _id: string
    displayName: string
    fullName: string
    phoneNumber: string
    email: string
    userRoles: Role[]
    paymentInformation?: Payment{}
    verifiedAccount?: boolean
    data: some kind of analytics data object to keep track
    linkedAccounts: AuthTokens[] // potentially dictionary
}

client: { // separate db
    _clientId: string
    profileId: string
    paymentInformation?: Payment{}
    ratings: Rating{}
    jobs: Job[]
    previousClients: ids[] // previous vendors not clients
}

freelancer: // separate db
{
    _freelancerId: string
    profileId: string
    paymentInformation?: Payment{}
    ratings: Rating{}
    bio: Bio{}
    jobs: Job[]
    previousClients: ids[]
}

rating:
{
    _id: string
    userId: id 
    role: enum (freelancer, client)
    date: Date,
    ratingValue: number (1-5)
    description: null | string
    associatedJob: JobId
}

bio:
{
    _id: string
    roleId: string
    socials: string[]
    description: string 
}

job: 
{
    _id: string
    jobInfo: JobInfo{}
    paymentFee: number
    paymentFrequency: enum
    status: enum (pending, active, completed)
    bids: Bid[]
    postedDate: Date
    activeDate: null | Date
    completedDate: null | Date
    chosenFreelancer: null | freelancerId 
}

jobInfo: {
    title: string
    description: string
    genre: enum 
    dueDate: Date
    urgentStatus: boolean 
}

bid:
{
    _id: string
    freelancer: freelancerId
    price: number
    date: Date
}

