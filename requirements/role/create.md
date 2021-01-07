# Criar função

> ## Caso de sucesso

1. Recebe uma requisição do tipo **POST** na rota **/api/roles**
2. ⛔️ Valida se a requisição foi feita por um usuario logado
3. ⛔️ Valida se a requisição foi feita por um admin
4. ✅ Valida dado obrigatório **description**
5. ✅ **Valida** se já existe uma funcao com a descrição fornecida
6. ✅ **Cria** uma funcao
7. ✅ Retorna **204**

> ## Exceções

1. ⛔️ Retorna erro **401** caso não contenha o token de autenticação
1. ⛔️ Retorna erro **403** se o usuário não for **admin**
1. ✅ Retorna erro **400** se description não for fornecido
1. ✅ Retorna erro **500** se der erro ao tentar criar a função
