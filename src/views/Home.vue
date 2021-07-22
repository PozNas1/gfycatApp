<template>
  <div class="home">
    <Gifs :gifs="gifInfo"/>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import Gifs from '../components/Gifs.vue';
export interface GifObj {
  link: string;
  id: string;
}
export interface GifData {
  tags: GifObj[];
}
@Component({
  name: 'Home',
  components: {
    Gifs,
  },
})
export default class Home extends Vue {
  gifInfo: GifObj[] = [];
  mounted(): void {
    this.getGifs();
  }
  isGifData(obj: unknown): obj is GifData {
    return typeof obj === "object" 
      && obj != null
      && ["tags"].every(i => i in obj)
  }
  async getGifs(): Promise<void>{ 
    await axios.get('https://api.gfycat.com/v1/reactions/populated')
      .then(data => {
        if (this.isGifData(data.data)) {
          this.gifInfo = data.data.tags.map((tag: any):GifObj => {
            return {link: tag.gfycats[0].gif100px, 
                        id: tag.tagText}
          });
          console.log(this.gifInfo)
        } else {
          throw console.error('Type of data is not valid');
        }
        
      })
      .catch(err => console.log(err));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -10px;
}
</style>
