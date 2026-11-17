import { z } from "zod";
import { en } from "@/messages/en";

const v = en.enquiry.validation;
const MAX_GUESTS = 20;
const MAX_MESSAGE_LENGTH = 1200;

export const enquirySchema = z
  .object({
    name: z.string().trim().min(1, v.nameRequired).max(120),
    email: z.string().trim().email(v.emailInvalid).max(200),
    checkIn: z.string().min(1, v.checkInRequired),
    checkOut: z.string().min(1, v.checkOutRequired),
    guests: z.coerce.number().int().min(1, v.guestsRange).max(MAX_GUESTS, v.guestsRange),
    message: z.string().trim().max(MAX_MESSAGE_LENGTH, v.messageMax).optional().default(""),
    website: z.string().max(0).optional().default(""),
  })
  .refine((d) => !d.checkIn || !d.checkOut || d.checkOut > d.checkIn, {
    path: ["checkOut"],
    message: v.checkOutAfter,
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

export interface EnquiryResponse {
  readonly ok: boolean;
  readonly code?: "validation" | "not_configured" | "rate_limited" | "server";
}
