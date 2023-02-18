<?php

namespace App\Traits;

use DateTimeInterface;
use Laravel\Sanctum\HasApiTokens as BaseApiTokens;
use Laravel\Sanctum\NewAccessToken;
use ReallySimpleJWT\Token;

trait HasApiTokens
{
    use BaseApiTokens;

    /**
     * Create a new personal access token for the user.
     *
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function createToken(string $name, array $abilities = ['*'], DateTimeInterface $expiresAt = null)
    {
        $id = $this->getKey();
        $customClaims = [
            'active' => $this->active,
            'x-hasura-allowed-roles' => [$this->role],
            'x-hasura-company-id' => $this->companyId,
            'x-hasura-default-role' => $this->role,
            'x-hasura-user-id' => $id,
            'x-hasura-locale' => 'bg', // @todo make it dynamic
        ];

        $customClaims[$this->role] = true;
        $payload = [
            'admin' => $this->role === 'admin',
            'aud' => env('SITE_URL'),
            'auth_time' => time(),
            'email' => $this->email,
            'exp' => $expiresAt,
            'https://hasura.io/jwt/claims' => $customClaims,
            'iat' => time(),
            'iss' => 'self',
            'name' => "{$this->firstName} {($this->middleName ? substr($this->middleName, 0, 1).'.' : '')} {$this->lastName}",
            'sub' => $id,
            'user_id' => $id,
            'companyType' => $this->company->type,
            'uses_supto' => $this->company->usesSupto,
        ];

        $secret = env('JWT_SECRET');

        $plainTextToken = Token::customPayload($payload, $secret);

        $token = $this->tokens()->create([
            'name' => $name,
            'token' => $plainTextToken,
            'abilities' => $abilities,
            'expires_at' => $expiresAt,
        ]);

        return new NewAccessToken($token, $plainTextToken);
    }
}
