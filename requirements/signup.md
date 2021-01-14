# Inscrever-se

> ## Caso de sucesso

1. Recebe uma requisição do tipo **POST** na rota **/api/signup**
2. ✅ Valida dados obrigatórios **name**, **email**, **password**, **password_confirmation**, **account_role** e **avatar**
3. ✅ Valida que **password** e **password_confirmation** são iguais
4. ✅ Valida que o campo **email** é um e-mail válido
5. ✅ Valida que o campo **avatar** é uma imagem válida
6. ✅ **Valida** se já existe um usuário com o **email** fornecido
7. ✅ **Valida** se já existe **account_role**
8. ✅ **Salva** imagem do avatar
8. ✅ Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
9. ✅ **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptografada
10. ✅ **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptografada
11. ⛔️ **Envia um email** informando cadastro realizado com sucesso aguardar liberação
12. ✅ Retorna **204**

> ## Exceções

1. ✅ Retorna erro **400** se name, email, password ou password_confirmation não forem fornecidos pelo client
2. ✅ Retorna erro **400** se password e password_confirmation não forem iguais
3. ✅ Retorna erro **400** se o campo email for um e-mail inválido
4. ✅ Retorna erro **403** se o email fornecido já estiver em uso
5. ✅ Retorna erro **403** se o account_role fornecido já estiver em uso
6. ✅ Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
7. ✅ Retorna erro **500** se der erro ao tentar criar a conta do usuário
