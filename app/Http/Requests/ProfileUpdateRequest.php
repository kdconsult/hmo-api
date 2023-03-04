<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['array'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];

        if ($this->user()->isDirty('email')) {
            $rules['email'][] = 'required';
        }

        foreach (config('app.allowed_locales') as $locale) {
            $rules["name.{$locale}"] = ['required', 'string', 'max:255'];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'name.bg.required' => 'Името е задължително',
        ];
    }
}
