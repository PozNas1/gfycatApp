<template>
  <div class="search">
    <v-card-text>
      <v-autocomplete
        :search-input.sync="searchInput"
        color="white"
        hide-no-data
        hide-selected
        label="Gif"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <Gifs :gifs="searchInput | getFilteredGifs(this.gifInfo)"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Gifs from '../components/Gifs.vue';
import { GifObj, GifData } from '../model/interfaces';
import axios from 'axios';

@Component({
  name: 'Search',
  components: {
    Gifs,
  },
  filters: {
    getFilteredGifs(value: string, gifs: GifObj[]): GifObj[] {
      return gifs.filter((gif: GifObj) => {
        return gif.id.includes(value);
      });
    }
  },
})
export default class Search extends Vue {

  searchInput = '';


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

