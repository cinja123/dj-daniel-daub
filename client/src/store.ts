import {reactive} from 'vue';

export const store = reactive({
  visited: false,
  visitLandingPage() {
    this.visited = true;
  }
})