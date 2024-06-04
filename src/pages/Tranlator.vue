<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <q-page-container>
      <div class="row  q-pt-md">
        <div class="col">
          <p class="text-center">Русский язык</p>
        </div>
        <div class="col">
          <p class="text-center">Английский язык</p>
        </div>
        <q-separator />
      </div>
      <q-page class="q-pa-md translatorQPage" :class="[$q.screen.width < 1200 ? 'column' : 'row']">
      <div class="qPageLeft" :class="[$q.screen.width < 1200 ? 'col-4' : 'col']">
        <q-input
          type="textarea"
          borderless
          counter
          v-model="text" 
          maxlength="800"
          placeholder="Начните писать текст..."
          :input-style="{ resize: 'none' }"
          dense
        >
        <template v-slot:append v-if="isText">
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>
      </q-input>
      </div>
      <div class="qPageRight" :class="[$q.screen.width < 1200 ? 'col-4' : 'col']">
        <q-input
          type="textarea"
          borderless
          :input-style="{ resize: 'none' }"
        />
      </div>
      
    </q-page>
  </q-page-container>
  </div>
  
</template>

<script>
import { ref } from 'vue';

export default {
  setup () {
    const text = ref('')
    const isText = ref(false);

    const handleButtonClick = () => {
      console.log(text.value.length);
    };

    return {
      text,
      isText,
      handleButtonClick,
    };
  }
}
</script>

<style>
.translatorQPage div{
  height: 150px;
  padding-left: 2px;
  resize: none;
}

.qPageLeft{
  border: solid #EFEFF0 1px;
}

.qPageRight{
  background-color: #EAEAEF;
}
</style>