export interface Room {
  key: string;
  name: string;
  members: { [member: string]: string }[];
  messages: string[];
}
