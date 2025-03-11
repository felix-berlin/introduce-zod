import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email({ message: "Invalid email address" }),
      terms: z.preprocess(
        (val) => val === "on",
        z.boolean().refine((val) => val === true, {
          message: "You must agree to the terms",
        })
      ),
    }),
    handler: async ({ email, terms }) => {
      // Here you can handle the real data, e.g., save to a database or send an email
      try {
        // Simulate server-side processing
        console.log("Email:", email);
        console.log("Terms accepted:", terms);

        // Return success response
        return { success: true };
      } catch (error) {
        // Handle any errors that occur during processing
        return {
          error: {
            message: "An error occurred while processing your request.",
          },
        };
      }
    },
  }),
};
