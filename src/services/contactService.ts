// --------------------------------------------------
// SOCCER FAN ZONE — CONTACT SERVICE (EMAILJS)
// --------------------------------------------------

import emailjs from "@emailjs/browser";

/* ==================================================
   TYPES
   ================================================== */

export type ContactFormData = {
  email: string;
  date: string;
  heading: string;
  message: string;
};

/* ==================================================
   ENV CONFIG
   ================================================== */

const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "";

const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

/* ==================================================
   SEND FUNCTION
   ================================================== */

export async function sendContactMessage(
  data: ContactFormData
): Promise<{ success: boolean }> {
  try {
    /* SAFETY CHECK */

    if (
      !SERVICE_ID ||
      !TEMPLATE_ID ||
      !PUBLIC_KEY
    ) {
      console.warn(
        "SFZ: EmailJS config missing"
      );

      return {
        success: false,
      };
    }

    /* ==================================================
       SEND EMAIL
       ================================================== */

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_email:
          data.email,

        date:
          data.date,

        heading:
          data.heading,

        message:
          data.message,
      },
      PUBLIC_KEY
    );

    return {
      success: true,
    };
  } catch (error) {
    console.warn(
      "SFZ: Contact send failed",
      error
    );

    return {
      success: false,
    };
  }
}