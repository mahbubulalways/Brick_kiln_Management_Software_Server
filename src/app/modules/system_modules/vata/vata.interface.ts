export type TAdminVata = {
    vata: {
        // Basic Information
        vataId: string;
        nameEnglish: string;
        nameBangla: string;
        address: string;
        subdomain: string
        susbscriptionPlanId: string;
        // Owner Information
        ownerName: string;
        ownerPhoneNumber: string;

        // Challan Information
        challansPhoneNumber: string;
        nextPaymentDate: string;
    };

    // Admin User Information
    owner: {
        name: string;
        username: string;
        password: string;
    };
};