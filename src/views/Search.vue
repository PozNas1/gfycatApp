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
import { GifObj } from '../model/interfaces';

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
    this.$store.dispatch('getGifs');
    this.gifInfo = this.$store.state;
  }

}
</script>

