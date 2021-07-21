<template>
  <v-app class="inspire">
    <v-app-bar
      app
      shrink-on-scroll
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Gifs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="(gif, index) in gifs"
            :key="index"
            cols="4"
          >
            <v-card height="250" width="370">
              <!-- <div> {{gif.link}}</div> -->
              <img :src="gif.link" alt="Can't load" height="250" width="370">
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {GifObj} from '../App.vue';

@Component
export default class Gifs extends Vue {
  @Prop() private msg!: string;
  @Prop({ type: Array, default: [], required: true })
  private gifs!: GifObj[];
}
</script>


