<script>
  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data);
</script>

<div>Dashboard</div>
<span>{data.session.user.email}</span>
