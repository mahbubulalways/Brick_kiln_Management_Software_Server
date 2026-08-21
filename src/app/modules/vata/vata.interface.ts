export type TVata = {
    vata: {
        // Basic Information
        vataId: string;
        nameEnglish: string;
        nameBangla: string;
        address: string;
        subdomain:string

        // Owner Information
        ownerName: string;
        ownerPhoneNumber: string;

        // Challan Information
        challansPhoneNumber: string;

        // Payment / Software Information
        smsRate: string;
        softwareFee: string;
        nextPaymentDate: string;
    };

    // Admin User Information
    owner: {
        name: string;
        username: string;
        password: string;
    };
};