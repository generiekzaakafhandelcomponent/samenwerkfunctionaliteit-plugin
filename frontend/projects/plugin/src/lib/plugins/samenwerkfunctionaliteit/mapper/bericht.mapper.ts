import { PostBerichtResponseDto } from "../dto/post-bericht-response.dto";
import { Bericht } from "../models/bericht.model";

export function mapPostBerichtResponseDtoToBericht(dto: PostBerichtResponseDto): Bericht {
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
