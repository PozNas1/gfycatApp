<template>
  <div id="app">
    <div id="nav">
      <h1> Gifs </h1>
      <router-link to="/">Popular</router-link> |
      <router-link to="/search">Search</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
