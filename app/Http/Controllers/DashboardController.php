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
     * @return \Inertia\Response
     **/
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }

    public function createCompany()
    {
        return Inertia::render('CreateCompany', [
            'locales' => config('app.allowed_locales')
        ]);
    }
}
