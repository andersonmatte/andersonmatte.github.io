# Configuração do Formulário de Contato (Web3Forms)

Para o formulário de contato funcionar, você precisa obter um **access key** gratuito do Web3Forms.

## Passo a passo

1. Acesse **https://web3forms.com**
2. Digite seu email (ex: andersonmatte_18@hotmail.com)
3. Clique em "Create Access Key"
4. Você receberá o access key por email
5. Abra o arquivo `index.html` e substitua `SEU_ACCESS_KEY_AQUI` pelo seu access key na linha:

```html
<input type="hidden" name="access_key" value="SEU_ACCESS_KEY_AQUI">
```

Exemplo:
```html
<input type="hidden" name="access_key" value="abc123-def456-ghi789">
```

Após isso, os emails serão enviados para o endereço que você cadastrou no Web3Forms.
