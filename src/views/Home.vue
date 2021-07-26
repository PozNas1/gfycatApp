<template>
  <div class="home">
    <Gifs :gifs="gifInfo"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GifObj } from '../model/interfaces';
import Gifs from '../components/Gifs.vue';
import store from '../store';

@Component({
  name: 'Home',
  components: {
    Gifs,
  },
})
export default class Home extends Vue {

  gifInfo: GifObj[] = [];

  mounted(): void {
    this.$store.dispatch('getGifs');
    this.gifInfo = this.$store.state;
  }
}
</script>
