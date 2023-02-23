<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class PostRegistrationTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * Test that successful registrated user has to create a company
     *  
     * When a user is successfully registered, he has to create a company
     * 
     **/
    public function test_user_with_no_company_has_to_greate_one()
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {

            $browser->loginAs($user->id)
                ->visit('/dashboard')
                ->assertSee('Create a company')
                ->assertSee('You have to create a company to start using the application');
        });
    }
}
