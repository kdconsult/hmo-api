<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextArea from '@/Components/TextArea.vue';
import TextInput from '@/Components/TextInput.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import {Head, usePage, useForm} from '@inertiajs/vue3';

const trans = usePage().props.trans;
const locales = usePage().props.locales;

const form = useForm({
    address: {bg: null, en: null},
    name: {bg: null, en: null},
    mol: {bg: null, en: null},
    email: null,    
    phone: null,
});

const submit = () => {
    form.post(route('company.store'), {
        onFinish: () => form.reset('password'),
    });
};

</script>

<template>
  <GuestLayout>
    <Head :title="trans['head-title']" />
    <form @submit.prevent="submit">
      <div class="flex">
        <div v-for="locale in locales" :key="locale" class="first:mr-4">
          <InputLabel :for="`name.${locale}`" :value="`Name ${locale.toUpperCase()}`" />
          <TextInput
              :id="`name.${locale}`"
              type="text"
              class="mt-1 block w-full"
              v-model="form.name[locale]"
              required
              :autofocus="locale === 'bg'"
              />
        </div>
      </div>

      <div v-for="locale in locales" :key="locale">
        <InputLabel :for="`address.${locale}`" :value="`Address ${locale.toUpperCase()}`" />
        <TextArea
            :id="`address.${locale}`"
            type="text"
            class="mt-1 block w-full"
            v-model="form.address[locale]"
            required
            />
      </div>
      <div class="mt-4 flex">
        <PrimaryButton class="ml-auto" :class="{ 'opacity-25': form.processing }" :disabled="form.processing" dusk="company-create-button">
          {{ trans['create-company-button-text'] }}
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>