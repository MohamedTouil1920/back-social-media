// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.strategy';
import { User } from 'src/user/entities/user.entity';
import { jwtConstants } from 'src/auth/constants/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraction du token JWT de l'en-tête Authorization
      ignoreExpiration: false, // Ne pas ignorer l'expiration du token
      secretOrKey: jwtConstants.secret// Clé secrète pour la validation
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Payload JWT:', payload); // Ajout de log pour déboguer
    const { sub: userId } = payload; // On récupère l'ID utilisateur du payload JWT
    const user = this.usersService.findById(payload.sub);
    
    if (!User) {
      console.log('Utilisateur non trouvé:', payload.sub);
      throw new UnauthorizedException();
    }
    console.log('Utilisateur validé:', user);

    return user; // Si l'utilisateur existe, il est attaché à la requête (req.user)
  }
}
