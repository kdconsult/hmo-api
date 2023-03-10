<?php

namespace App\Traits;

namespace App\Traits;

use Illuminate\Support\Facades\App;
use Spatie\Translatable\HasTranslations as BaseHasTranslations;

trait HasTranslations
{
    use BaseHasTranslations;

    public function toArray($convert = true)
    {
        $attributes = parent::toArray();

        if ($convert) {
            foreach ($this->getTranslatableAttributes() as $field) {
                $attributes[$field] = $this->getTranslation($field, App::getLocale());
            }
        }

        return $attributes;
    }
}
