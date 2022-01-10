import { JwtService } from '@nestjs/jwt';

export default class ApiFeatch {
  static async assignJwtToken(
    userId: number,
    jwtService: JwtService,
  ): Promise<string> {
    const payload = { id: userId };
    const token = await jwtService.signAsync(payload);
    return token;
  }
}
