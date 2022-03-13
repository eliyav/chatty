import e from "express";

export interface Room {
  key: string;
  name: string;
  members: { [member: string]: string }[];
  messages: string[];
}

export interface Message {
  by: string;
  message: string;
  time: string;
}
