export interface JwtPayload {
    username: string;
    sub: number; // Correspond à l'ID utilisateur dans la base de données
  }