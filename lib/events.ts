export interface CampaignRange {
  start: string;
  end: string;
}

export type CampaignMap = Record<string, CampaignRange[]>;
export type UpdateMap = Record<string, string[]>;
export type GameNameMap = Record<string, string>;

export function isValidCampaignRange(value: unknown): value is CampaignRange {
  return (
    typeof value === 'object' &&
    value !== null &&
    'start' in value &&
    'end' in value &&
    typeof (value as CampaignRange).start === 'string' &&
    typeof (value as CampaignRange).end === 'string'
  );
}
