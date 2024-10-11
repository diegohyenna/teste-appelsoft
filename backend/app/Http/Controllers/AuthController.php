<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = request(['email', 'password']);

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => "O campo 'Email' deve ser preenchido",
            'email.email' => "O campo 'Email' deve ser um email válido",
            'password.required' => "O campo 'Senha' deve ser preenchido",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['status' => 'not-found', 'message' => 'Email e senha errados!'], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Login realizado com sucesso',
            'token' => $token,
        ], 200);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(User $user)
    {
        Auth::logout();
        $user->tokens()->delete();
        return response()->json(['status' => 'success', 'message' => 'deslogado com sucesso'], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return response()->json(['token' => Auth::refresh()]);
    }
}
