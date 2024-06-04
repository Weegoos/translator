<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
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
        </q-toolbar>
      </q-header>
  </q-layout>
</template>

<script>
export default {

}
</script >

<style>

</style>