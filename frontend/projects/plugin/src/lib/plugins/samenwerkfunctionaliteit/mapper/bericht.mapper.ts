import { BerichtenOverzichtResponse, BerichtDto } from '../dto/berichten.dto';
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

function mapBerichtToMessage(bericht: BerichtDto): Message {
  return {
    actieverzoekId: bericht.actieverzoekId,
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

export function mapMessageToBericht(message: Message): BerichtDto {
  return {
    actieverzoekId: message.actieverzoekId,
    berichtId: message.messageId,
    creatieDatumTijd: message.createdOn.toString(),
    inhoud: message.content,
    ontvanger: message.receiver,
    ontvangerNaam: message.receiverName,
    samenwerkingId: message.samenwerkingId,
    zender: message.sender,
    zenderNaam: message.senderName,
  };
}

function mapBerichtResponseToBericht(bericht: BerichtDto): Bericht {
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
