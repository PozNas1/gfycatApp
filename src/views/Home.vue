<template>
  <div class="home">
    <Gifs :gifs="gifInfo"/>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import { GifObj, GifData } from '../model/interfaces';
import Gifs from '../components/Gifs.vue';

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
                        id: tag.gfycats[0].tags}
          });
        } else {
          throw console.error('Type of data is not valid');
        }
      })
      .catch(err => console.log(err));
  }
}
</script>
