export class UserService {
  login(username: string, password: string): boolean {
    return true;
  }

  logout(): boolean {
    return true;
  }

  getProfile(userId: string): { name: string; age: number } {
    return { name: "John Doe", age: 30 };
  }
}
