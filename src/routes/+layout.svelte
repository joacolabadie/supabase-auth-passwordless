<script>
  import { invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase";
  import "../app.css";

  onMount(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<slot />
