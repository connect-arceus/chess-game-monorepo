
export type User = {
    id: string;
    name: string;
}

export class UserManager {

    private users: {user: User; socket: WebSocket;}[]

    constructor() {
        this.users = [];
    }

    addUser(user: User, socket: WebSocket) {
        this.users.push({ user, socket })
    }
    
}