<template>
    <component :is="iconComponent" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps<{
    name: string;
}>();

const iconComponent = computed(() => {
    return defineAsyncComponent(() =>
        import(`../assets/icons/${props.name}.svg`)
    );
});
</script>