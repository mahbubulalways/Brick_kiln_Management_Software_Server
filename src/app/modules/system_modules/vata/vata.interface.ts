export type TAdminVata = {
  vata: {
    // Basic Information
    vataId: string;
    nameEnglish: string;
    nameBangla: string;
    address: string;
    shortDescription: string;
    additionalAddress: string;
    subdomain: string;
    subscriptionPlanId: string;
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

export type TAdminVataUpdate = {
  address: string;
  nameBangla: string;
  nameEnglish: string;
  ownerName: string;
  challansPhoneNumber: string;
  ownerPhoneNumber: string;
  subdomain: string;
};
