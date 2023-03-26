import Vue from 'vue';
import router from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/AboutView.vue'

Vue.use(router);

export default new router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        }
    ]

})