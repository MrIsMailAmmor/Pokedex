<template>
  <div>
    <input
      :type="inputType"
      :id="name"
      :value="name"
      class="ml-4"
      @change="$emit('update:modelValue', [...modelValue, name])"
    />
    <label :for="name" class="ml-4 text-base">{{ name }} </label>
  </div>
</template>
<script setup lang="ts">
defineProps(["inputType", "name", "checked", "modelValue"]);
defineEmits(["update:modelValue"]);
</script>
<style lang=""></style>
