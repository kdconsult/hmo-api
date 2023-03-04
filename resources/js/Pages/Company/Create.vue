<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextArea from '@/Components/TextArea.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, useForm } from '@inertiajs/vue3';

const trans = usePage().props.trans;
const locales = usePage().props.locales;

const form = useForm({
  address: { bg: null, en: null },
  name: { bg: null, en: null },
  mol: { bg: null, en: null },
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
  <Head :title="trans['head-title']" />
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ trans['head-title'] }}
      </h2>
    </template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="mx-auto bg-white p-10">
            <form @submit.prevent="submit">
              <div class="flex">
                <div v-for="locale in locales" :key="locale" class="first:mr-4">
                  <InputLabel
                    :for="`name.${locale}`"
                    :value="`Name ${locale.toUpperCase()}`"
                  />
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
                <InputLabel
                  :for="`address.${locale}`"
                  :value="`Address ${locale.toUpperCase()}`"
                />
                <TextArea
                  :id="`address.${locale}`"
                  type="text"
                  class="mt-1 block w-full"
                  v-model="form.address[locale]"
                  required
                />
              </div>
              <div class="mt-4 flex">
                <PrimaryButton
                  class="ml-auto"
                  :class="{ 'opacity-25': form.processing }"
                  :disabled="form.processing"
                  dusk="company-create-button"
                >
                  {{ trans['create-company-button-text'] }}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
