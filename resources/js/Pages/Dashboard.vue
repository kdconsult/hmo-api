<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';

const company = usePage().props.auth.user.company;
const trans = usePage().props.trans;

console.log(company);
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>

                    <div v-if="!company">
                        <span>{{ trans['create-company-text'] }}</span>
                        <button type="button" dusk="create-company">{{ trans['create-company-button'] }}</button>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
