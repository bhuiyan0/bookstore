export class User {
    id: any;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber: string;
    emailConfirmed: boolean;
    userName: string;
    firstName: string;
    lastName: string;
    doB: Date;
    gender: string;
    address: string;
    imageUrl: string;
    userType: string;

    role: string;
    roles: string[];
}

export class UserLogin {
    UserName: string;
    Password: string;
}

export class Registration {
    Id: number;
    UserName: string;
    Password: string;
    Email: string;
    Role: string;
    Gender: string;
    Phone: string;
}

export class ChangePasswordModel {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

