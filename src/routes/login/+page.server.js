import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { validateData } from "$lib/utils/validateData";

const OAUTH_PROVIDERS = ["google", "github"];

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address" }),
});

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const { session } = await getSupabase(event);

  if (session) {
    throw redirect(303, "/");
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  login: async (event) => {
    const { session, supabaseClient } = await getSupabase(event);

    if (session) {
      throw redirect(303, "/");
    }

    const provider = event.url.searchParams.get("provider");

    if (provider) {
      if (!OAUTH_PROVIDERS.includes(provider)) {
        return fail(400, {
          error: "Provider not supported.",
        });
      }

      const { data, error: err } = await supabaseClient.auth.signInWithOAuth({
        provider,
      });

      if (err) {
        return fail(400, {
          error: "Something went wrong logging you in.",
        });
      }

      throw redirect(303, data.url);
    }

    const { formData, errors } = await validateData(
      await event.request.formData(),
      loginSchema
    );

    if (errors) {
      return fail(400, {
        error: errors.fieldErrors,
      });
    }

    const { error: err } = await supabaseClient.auth.signInWithOtp({
      email: formData.email,
    });

    if (err) {
      if (
        err instanceof AuthApiError &&
        err.status >= 400 &&
        err.status < 500
      ) {
        console.log(err);
        return fail(err.status, {
          error: err.message,
        });
      }

      return fail(500, {
        error: "Server error. Please try again later.",
      });
    }

    return { success: true };
  },
};
