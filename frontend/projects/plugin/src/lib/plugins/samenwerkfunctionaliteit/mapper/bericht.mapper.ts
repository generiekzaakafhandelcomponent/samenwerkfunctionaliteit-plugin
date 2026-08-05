import { PostBerichtResponseDto } from '../dto/post-bericht-response.dto';
import { Bericht, ChatBericht } from '../models/bericht.model';
import { BerichtenOverzichtResponse } from '../dto/berichten.dto';

export function mapPostBerichtResponseDtoToBericht(
  dto: PostBerichtResponseDto,
): Bericht {
  return {
    _links: dto._links,
    actieverzoekId: dto.actieverzoekId,
    berichtId: dto.berichtId,
    creatieDatumTijd: dto.creatieDatumTijd,
    inhoud: dto.inhoud,
    ontvanger: dto.ontvanger,
    ontvangerNaam: dto.ontvangerNaam,
    samenwerkingId: dto.samenwerkingId,
    zender: dto.zender,
    zenderNaam: dto.zenderNaam,
  };
}

export function mapBerichtenOverzichtResponseToBerichten(
  dto: BerichtenOverzichtResponse,
): Bericht[] {
  return dto._embedded.berichten.map((dto): Bericht => {
    return {
      _links: dto._links,
      actieverzoekId: dto.actieverzoekId,
      berichtId: dto.berichtId,
      creatieDatumTijd: dto.creatieDatumTijd,
      inhoud: dto.inhoud,
      ontvanger: dto.ontvanger,
      ontvangerNaam: dto.ontvangerNaam,
      samenwerkingId: dto.samenwerkingId,
      zender: dto.zender,
      zenderNaam: dto.zenderNaam,
    };
  });
}

export function mapBerichtenToChatBerichten(
  berichten: Bericht[],
): ChatBericht[] {
  return berichten.map((bericht): ChatBericht => {
    return {
      messageId: bericht.berichtId,
      createdOn: new Date(bericht.creatieDatumTijd),
      content: bericht.inhoud,
      receiver: bericht.ontvanger,
      receiverName: bericht.ontvangerNaam,
      samenwerkingId: bericht.samenwerkingId,
      sender: bericht.zender,
      senderName: bericht.zenderNaam,
    };
  });
}
