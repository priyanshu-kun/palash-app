export interface RequestBody_Create {
   name: string;
   media: File;
   description: string;
   price: string;
}

export interface RequestBody_Update {
   id?: string;
   name?: string;
   media?: File;
   description?: string;
   price?: string;
}


export interface SignUpDTO {
   name: string;
   username: string;
   phoneOrEmail: string;
   dob: string;
}


export interface SignInDTO {
   phoneOrEmail: string;
}


export interface VerifyOtpDTO {
   phoneOrEmail: string;
   otp: string;
}

export interface JWTKeysConfig {
   privateKeyFile: string;
   privateKeyPassphrase: string;
   publicKeyFile: string;
}


export interface CreateBookingInput {
  userId: string;
  serviceId: string;
  date: Date;
}

export interface ICreateInBulkAvailablityInput {
   isBookable: Boolean
   dates: []
}