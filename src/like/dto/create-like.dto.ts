export class CreateLikeDto {
    userId: number;           // ID de l'utilisateur qui aime
    type: string;             // Type : 'publication' ou 'comment'
    itemId: number;           // ID de la publication ou du commentaire aimé
  }
  