export type User = {
        _id?: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    };

export type UserWithoutPassword = Omit<User, "password">;
