<?php

namespace App\Models\Sanctum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;
use ReallySimpleJWT\Token;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    use HasFactory;
    /**
     * Find the token instance matching the given token.
     *
     * @param  string  $token
     * @return static|null
     */
    public static function findToken($token)
    {
        Log::info($token);
        // if (strpos($token, '|') === false) {
        //     return static::where('token', $token)->first();
        // }

        // [$id, $token] = explode('|', $token, 2);

        // if ($instance = static::find($id)) {
        //     return hash_equals($instance->token, hash('sha256', $token)) ? $instance : null;
        // }
        try {
            if (Token::validate($token, env('JWT_SECRET'))) {

                $payload = Token::parser($token)->getDecodedPayload();
                $payload['expires_at'] = \Carbon\Carbon::parse($payload['exp']);

                $collection = static::factory()->make($payload);
                
                Log::info($collection);

                return $collection;
                // return static::where('token', $token)->first();
            }
            throw new \Exception('Token is not valid');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return null;
        }
    }
}
