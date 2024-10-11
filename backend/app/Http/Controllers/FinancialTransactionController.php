<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FinancialTransactionController extends Controller
{
    /**
     * List all financial transactions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'tipo' => 'sometimes|in:Entrada,Saída',
            'ordenarPor' => 'sometimes|in:data,valor',
            'direcao' => 'sometimes|in:asc,desc',
        ], [
            'tipo.in' => 'O campo tipo deve ser "Entrada" ou "Saída".',
            'ordenarPor.in' => 'O campo ordenarPor deve ser "data" ou "valor".',
            'direcao.in' => 'O campo direcao deve ser "asc" (crescente) ou "desc" (decrescente).'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $type = $request->input('tipo');
        $ordenation = $request->input('ordenarPor', 'data');
        $direction = $request->input('direcao', 'desc');

        $query = Transaction::query();

        if (!empty($type)) {
            $query->where('tipo', $type);
        }

        $query->orderBy($ordenation, $direction);

        $transactions = $query->paginate(5);
        return response()->json($transactions);
    }

    /**
     * Create a new financial transaction.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'tipo' => 'required|in:Entrada,Saída',
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric|min:0',
            'data' => 'required|date',
        ], [
            'tipo.required' => "O campo 'Tipo' deve ser preenchido",
            'tipo.in' => "O campo 'Tipo' deve ser 'Entrada' ou 'Saída",
            'descricao.required' => "O campo 'Descricão' deve ser preenchido",
            'descricao.string' => "O campo 'Descricão' deve ser uma string",
            'descricao.max' => "O campo 'Descricão' deve ter no maximo 255 caracteres",
            'valor.required' => "O campo 'Valor' deve ser preenchido",
            'valor.numeric' => "O campo 'Valor' deve ser um valor numerico",
            'valor.min' => "O campo 'Valor' deve ser maior ou igual a 0",
            'data.required' => "O campo 'Data' deve ser preenchido",
            'data.date' => "O campo 'Data' deve ser uma data",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $transaction = Transaction::create($request->all());
            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Transação criada com sucesso', 'data' =>  $transaction], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Não foi possível criar a transação'], 400);
        }
    }

    /**
     * Show the specified resource.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Transação não encontrada'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Transação encontrada',
            'data' =>  $transaction
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Transação não encontrada'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'tipo' => 'in:Entrada,Saída',
            'descricao' => 'string|max:255',
            'valor' => 'numeric|min:0',
            'data' => 'date',
        ], [
            'tipo.in' => "O campo 'Tipo' deve ser 'Entrada' ou 'Saída",
            'descricao.string' => "O campo 'Descricão' deve ser uma string",
            'descricao.max' => "O campo 'Descricão' deve ter no maximo 255 caracteres",
            'valor.numeric' => "O campo 'Valor' deve ser um valor numerico",
            'valor.min' => "O campo 'Valor' deve ser maior ou igual a 0",
            'data.date' => "O campo 'Data' deve ser uma data",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $transaction->update($request->all());
            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Transação atualizada com sucesso', 'data' =>  $transaction], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Não foi possível atualizar a transação'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Transação não encontrada'
            ], 404);
        }

        DB::beginTransaction();
        try {
            $transaction->delete();
            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Transação deletada com sucesso'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Não foi possível deletar a transação'], 400);
        }
    }
    /**
     * @return JsonResponse
     */
    public function resume(): JsonResponse
    {
        $input = (float) Transaction::where('tipo', 'Entrada')->sum('valor');
        $output = (float) Transaction::where('tipo', 'Saída')->sum('valor');
        $balance = $input - $output;

        return response()->json([
            'status' => 'success',
            'message' => 'Resumo de transações',
            'data' => [
                'total_entradas' => $input,
                'total_saidas' => $output,
                'saldo' => $balance
            ]
        ]);
    }
}
