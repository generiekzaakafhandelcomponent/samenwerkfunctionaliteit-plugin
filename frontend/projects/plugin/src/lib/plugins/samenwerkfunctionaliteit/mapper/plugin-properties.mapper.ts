import { SwfPluginPropertiesResponseDto } from '../dto/swf-plugin-properties.dto';
import { SwfPluginProperties } from '../interface/sfw-properties.interface';

export function mapPluginPropertiesResponseDtoToModel(
  dto: SwfPluginPropertiesResponseDto,
): SwfPluginProperties {
  return {
    baseUrl: dto.baseUrl,
    oinNummer: dto.oinNummer,
    backupUploadsToDocumentenApi: parseStringToBoolean(
      dto.backupUploadsToDocumentenApi,
    ),
  };
}

const parseStringToBoolean = (value: string) => {
  const parsedValue = JSON.parse(value);
  if (typeof parsedValue === 'boolean') {
    return parsedValue;
  }
  throw new Error(`Invalid boolean string: ${value}`);
};
