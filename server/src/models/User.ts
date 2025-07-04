import bcrypt from 'bcryptjs';
import { User } from '../types';

// In-memory user database (replace with real database in production)
const users: User[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'manager@demo.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'manager',
    name: 'Manager User',
    createdAt: new Date(),
  },
  {
    id: '3',
    email: 'staff@demo.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'staff',
    name: 'Staff User',
    createdAt: new Date(),
  },
];

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    return users.find(user => user.email === email) || null;
  }

  static async findById(id: string): Promise<User | null> {
    return users.find(user => user.id === id) || null;
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return users.map(({ password, ...user }) => user);
  }

  static async getUsersByRole(role: string): Promise<Omit<User, 'password'>[]> {
    return users
      .filter(user => user.role === role)
      .map(({ password, ...user }) => user);
  }
}
