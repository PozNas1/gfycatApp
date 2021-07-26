import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { GifObj, GifData } from '../model/interfaces';

Vue.use(Vuex)

function isGifData(obj: unknown): obj is GifData {
  return typeof obj === "object" 
    && obj != null
    && ["tags"].every(i => i in obj)
}

const store = new Vuex.Store<GifObj[]>({
    state: [],
    mutations: {
        getGifs (state, gifs) {
            state.splice(0, state.length, ...gifs );
        }
    },
    actions: {
        async getGifs({ commit }, ): Promise<void>{ 
            const data = await axios.get('https://api.gfycat.com/v1/reactions/populated')
            if (isGifData(data.data)) {
                const gifInfo = data.data.tags.map((tag: any):GifObj => {
                    return {link: tag.gfycats[0].gif100px, 
                                id: tag.gfycats[0].tags}
                });
                commit('getGifs', gifInfo);
            } else {
                throw console.error('Type of data is not valid');
            }
        }
    }
})

export default store