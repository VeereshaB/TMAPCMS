const constantRoleList = [
    "Super Admin",
    "Admin",
    "Manager",
    "Founder",
    "Project Manager",
    "Client",
    "Team Lead",
    "Team Member"
];

const defaultOrganization = {
    organizationName: "Map System private ltd.",
    branchName: 'South end Circle',
    isMainBranch: true,
    email: 'admin@gmail.com',
    phone: '70250000',
    address: 'Upchkar chamber',
    state: "Karnataka",
    city: 'Bangalure',
    zip: '585221',
    country: "India",
    activated: true,
    subscribed: '',
    subscriptionId: '',
    // subscriptionStartDate: '',
    // subscriptionEndDate: '',
    docsVerified: '',
    documentsLocation: '',
    webUrl: '',
}
const defaultAdminUser = {
    userName: 'ms.admin',
    password: 'Admin123',
    isActive: true,
    createdBy: 'system',
    lastModifiedBy: 'system',
    isArchived: false,
    passordChangeRequired: false,
    organizationId: 1,
    firstName: "Veeresh",
    middleName: 'b',
    lastName: 'L',
    status: true,
    image: '',
    webUrl: '',
    // lastLoggedinDate: ''
};

module.exports = { constantRoleList, defaultAdminUser, defaultOrganization };
