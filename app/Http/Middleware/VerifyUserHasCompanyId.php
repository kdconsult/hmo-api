<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyUserHasCompanyId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowed_urls = ['dashboard', 'companies/create'];
        if ($request->user()->hasCompany()) {
            return $next($request);
        }
        
        if (in_array($request->path(), $allowed_urls)) {
            return $next($request);
        }
        
        session()->flash('error', 'You need to create a company first!');
        return redirect()->route('dashboard');
    }
}
