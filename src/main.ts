import Vue from 'vue'
import App from './App.vue'
import * as q from '@qramana/qramana'

var num_of_zero_state = 0;
var num_of_one_state = 0;

for (let i = 0; i < 100; i++) {
    const q1 = new q.Qubit({ value: "|0>" });
    const q2 = new q.Qubit({ value: "|0>" });
    q1.h();
    q2.cnot(q1);

    if (q2.measure() === 0) {
        num_of_zero_state += 1;
        console.log(q1.measure() === 0)
    } else {
        num_of_one_state += 1;
    }
}
console.log(`The probability to get 0 state is ${ num_of_zero_state / 100 }`);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
