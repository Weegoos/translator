<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout 
    view="hhh Lpr fff"
    container
    style="height: 60px;"
    class="shadow-2 rounded-borders "
  >
    <q-header reveal class="text-black q-pt-sm" :class="$q.dark.isActive ? 'bg-secondary' : 'bg-transparent'">
      <q-toolbar>
        <q-btn icon="menu" flat />
        <q-toolbar-title>Translator</q-toolbar-title>
        <q-select filled v-model="selectedValue" :options="options" @update:model-value="logSelectedValue"/>
      </q-toolbar>
    </q-header>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
export default {
  setup() {
    const selectedValue = ref('en');
    const options = ['ru', 'en', 'kk', 'trk'];
    const {locale} = useI18n({useScope: 'global'})

    const logSelectedValue = (newValue) => {
      locale.value = newValue
      localStorage.setItem('lang', locale.value)
    };

    return {
      selectedValue,
      options,
      logSelectedValue,
    };
  },
};
</script>



<style>
</style>
