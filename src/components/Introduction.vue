<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br>
    <p>
      Stipendium is the best payment module on the solana blockchain.<br>
      Are you a merchand ? Please <button onclick="window.location.href='/merchand'">Log In / Register</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
