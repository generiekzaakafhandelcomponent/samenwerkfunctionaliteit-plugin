import {
  BerichtenOverzichtResponse,
  BerichtResponse,
} from '../dto/berichten.dto';
import { PostBerichtResponseDto } from '../dto/post-bericht-response.dto';
import { Bericht, Message } from '../models/bericht.model';

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

export function mapBerichtenOverzichtResponseToMessages(
  dto: BerichtenOverzichtResponse | undefined,
): Message[] {
  if (!dto?._embedded?.berichten) return [];

  return dto?._embedded?.berichten.map(
    (bericht): Message => mapBerichtToMessage(bericht),
  );
}

export function mapBerichtenOverzichtResponseToBerichten(
  dto: BerichtenOverzichtResponse | undefined,
): Bericht[] {
  if (!dto?._embedded?.berichten) return [];

  return dto?._embedded?.berichten.map(
    (bericht): Bericht => mapBerichtResponseToBericht(bericht),
  );
}

function mapBerichtToMessage(bericht: BerichtResponse): Message {
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
}

function mapBerichtResponseToBericht(bericht: BerichtResponse): Bericht {
  return {
    berichtId: bericht.berichtId,
    creatieDatumTijd: bericht.creatieDatumTijd,
    inhoud: bericht.inhoud,
    ontvanger: bericht.ontvanger,
    ontvangerNaam: bericht.ontvangerNaam,
    samenwerkingId: bericht.samenwerkingId,
    zender: bericht.zender,
    zenderNaam: bericht.zenderNaam,
    actieverzoekId: bericht.actieverzoekId,
  };
}
