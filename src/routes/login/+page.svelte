<script>
  import { enhance } from "$app/forms";

  /** @type {import('./$types').ActionData} */
  export let form;

  let loading = false;
</script>

<div
  class="flex h-screen w-full items-center justify-center p-4 text-sm font-medium text-gray-800"
>
  <div class="w-full max-w-lg">
    <div class="mb-6">
      <div class="mb-2 text-base">TextmateAI</div>
      <h1 class="text-2xl">Log in or create an account</h1>
    </div>
    <form method="POST" use:enhance class="mb-6 flex flex-col space-y-4">
      <button
        formaction="?/login&provider=google"
        class="flex items-center justify-center rounded-md border-2 border-gray-200 p-2 shadow-sm transition-all hover:rounded-3xl hover:bg-gray-50"
        ><svg
          width="800px"
          height="800px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]"
          ><path
            fill="#4285F4"
            d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
          /><path
            fill="#34A853"
            d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
          /><path
            fill="#FBBC04"
            d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
          /><path
            fill="#EA4335"
            d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
          /></svg
        >Continue with Google</button
      >
      <button
        formaction="?/login&provider=twitter"
        class="flex items-center justify-center rounded-md border-2 border-gray-200 p-2 shadow-sm transition-all hover:rounded-3xl hover:bg-gray-50"
        ><svg
          width="800px"
          height="800px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]"
          ><path
            fill="#1D9BF0"
            d="M13.567 5.144c.008.123.008.247.008.371 0 3.796-2.889 8.173-8.172 8.173v-.002A8.131 8.131 0 011 12.398a5.768 5.768 0 004.25-1.19 2.876 2.876 0 01-2.683-1.995c.431.083.875.066 1.297-.05A2.873 2.873 0 011.56 6.348v-.036c.4.222.847.345 1.304.36a2.876 2.876 0 01-.89-3.836 8.152 8.152 0 005.92 3 2.874 2.874 0 014.895-2.619 5.763 5.763 0 001.824-.697 2.883 2.883 0 01-1.262 1.588A5.712 5.712 0 0015 3.656a5.834 5.834 0 01-1.433 1.488z"
          /></svg
        >Continue with Twitter</button
      >
      <button
        formaction="?/login&provider=github"
        class="flex items-center justify-center rounded-md border-2 border-gray-200 p-2 shadow-sm transition-all hover:rounded-3xl hover:bg-gray-50"
        ><svg
          width="800px"
          height="800px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]"
          ><path
            fill="#161514"
            fill-rule="evenodd"
            d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z"
            clip-rule="evenodd"
          /></svg
        >Continue with Github</button
      >
    </form>
    <div class="mb-4 flex items-center justify-between space-x-4">
      <div class="flex-1 border-b-2 border-gray-200" />
      <span class="text-gray-400">Or sign in with your email</span>
      <div class="flex-1 border-b-2 border-gray-200" />
    </div>
    <form
      method="POST"
      action="?/login"
      use:enhance={() => {
        loading = true;

        return async ({ update }) => {
          loading = false;

          await update();
        };
      }}
      class="space-y-4"
    >
      <div class="flex flex-col">
        <label for="email" class="mb-2">Email</label>
        <input
          type="text"
          name="email"
          placeholder="name@example.com"
          class="rounded-md border-2 border-gray-200 p-2 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-gray-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        class="w-full rounded-md border-2 border-gray-200 p-2 shadow-sm transition-all hover:rounded-3xl hover:bg-gray-50 disabled:cursor-not-allowed"
        >{loading ? "Loading..." : "Continue with Email"}</button
      >
    </form>
    {#if form?.success}
      <div class="mt-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] fill-green-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>Email sent! Please check your inbox.</p>
      </div>
    {/if}
    {#if form?.error}
      <div class="mt-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] fill-red-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {#if form.error.email}
          <p>{form.error.email[0]}</p>
        {:else}
          <p>{form.error}</p>
        {/if}
      </div>
    {/if}
  </div>
</div>
