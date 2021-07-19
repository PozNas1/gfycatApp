import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false;

axios.get('https://api.gfycat.com/v1/reactions/populated', { tagName: "trending" })
    .then(data => {
        new Vue({
            vuetify,
            render: h => h({...App, data: () => { return { links: data.data.tags } } }),
        }).$mount('#app');
    })
    .catch(err => console.log(err));