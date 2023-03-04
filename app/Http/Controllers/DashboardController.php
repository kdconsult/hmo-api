<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Index Method
     *
     * Shows the dashboard if has company
     *
     **/
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'errors' => session()->has('errors') ? session()->get('errors')->getBag('default')->getMessages() : (object) [__('companies.no_company')],
        ]);
    }

    // public function createCompany()
    // {
    //     return Inertia::render('CreateCompany', [
    //         'locales' => config('app.allowed_locales')
    //     ]);
    // }
}
