import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    // TODO: hash password 
    // It is important to hash passwords to protect user credentials in case of a database breach. 
    // Storing plain-text passwords allows anyone with database access to steal accounts.
    // Use bcrypt.compare(password, hashedPasswordFromDb) here.

    const payload = { email: user.email, sub: 1 }; // Normally 'sub' is user ID
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
