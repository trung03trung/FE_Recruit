export class Users{
    active: boolean;
    avatarName: string;
    birthDay: Date;
    delete: boolean;
    email: string;
    gender: string;
    homeTown: string;
    id: number;
    name: string;
    password: string;
    phoneNumber: string;
    roles: [
      {
        code: string;
        delete: true;
        description: string;
        id: number;
      }
    ];
    userName: string
}