<template>
  <v-app class="inspire">
    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="(gif, index) in gifs"
            :key="index"
            cols="4"
          >
            <v-card height="250" width="370">
              <v-img :src="gif.link" height="250" width="370"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {GifObj} from '../views/Home.vue';

@Component({
  name: 'Gifs'
})
export default class Gifs extends Vue {
  @Prop({ type: Array, default: [], required: true })
  private gifs!: GifObj[];
}
</script>


