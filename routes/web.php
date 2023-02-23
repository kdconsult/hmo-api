<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/vies', function () {
    $soap = new SoapClient('http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl');

    /** Full response with requestIdentifier */
    $response = $soap->checkVatApprox([
        'countryCode' => 'BG',
        'vatNumber' => '205255868',
        'requesterCountryCode' => 'BG',
        'requesterVatNumber' => '205255868'
    ]);

    /** Short response without requestIdentifier */

    // $response = $soap->checkVat([
    //     'countryCode' => 'BG',
    //     'vatNumber' => '205255868'
    // ]);

    dd(json_decode(json_encode($response), true));
})->name('vies');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified', 'has-company'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/create-company', [DashboardController::class, 'createCompany'])->name('create-company');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
