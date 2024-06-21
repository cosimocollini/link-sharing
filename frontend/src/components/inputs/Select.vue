<template>
    <div>
        <label :for="id">{{ label }}</label>
        <v-select :id="id" :options="options" v-model="selected" :reduce="reduce" :searchable="false"
            :clearable="false">
        </v-select>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import vSelect from "vue-select";
    import 'vue-select/dist/vue-select.css';

    const props = defineProps<{
        label: string;
        options: Array<{ label: string; value: any }>;
        id: string;
        modelValue: any;
    }>();

    const selected = ref(props.modelValue);

    const reduce = (option: { label: string; value: any }) => option.value;

    const emit = defineEmits(['update:modelValue']);

    watch(selected, (newValue) => {
        emit('update:modelValue', newValue);
    });
</script>